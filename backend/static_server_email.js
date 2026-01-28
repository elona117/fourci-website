const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static site
const staticPath = path.join(__dirname, '..', 'static_site');
app.use(express.static(staticPath));

// Simple file-based JSON DB for resources
const DATA_DIR = path.join(__dirname, 'data');
const RES_FILE = path.join(DATA_DIR, 'resources.json');

function readResources(){
  try{ return JSON.parse(fs.readFileSync(RES_FILE,'utf8')); }catch(e){ return []; }
}
function writeResources(arr){
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(RES_FILE, JSON.stringify(arr, null, 2), 'utf8');
}

// Import email service
const { sendContactEmail, storeContactSubmission } = require('./utils/emailService');

// API - Resources
app.get('/api/resources', (req, res)=>{
  res.json(readResources());
});

app.post('/api/resources', (req, res)=>{
  const arr = readResources();
  const item = Object.assign({}, req.body, { id: Date.now().toString() });
  arr.push(item);
  writeResources(arr);
  res.status(201).json(item);
});

app.delete('/api/resources/:id', (req, res)=>{
  const id = req.params.id;
  let arr = readResources();
  const before = arr.length;
  arr = arr.filter(it=>String(it.id) !== String(id));
  if(arr.length === before) return res.status(404).json({ message: 'Not found' });
  writeResources(arr);
  res.json({ ok: true });
});

// API - Contact Form (Real-time Email)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, subject, message'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Store submission
    const submission = await storeContactSubmission({ name, email, subject, message });

    // Send email (async, don't wait)
    sendContactEmail({ name, email, subject, message }).catch(err => {
      console.error('Email send error:', err);
    });

    console.log('✅ Contact received from:', name);
    return res.status(200).json({
      success: true,
      message: 'Your message has been received! We\'ll respond shortly.',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process your request. Please try again later.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    server: 'Static Server with Email Support',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Static server running on port ${PORT}`);
  console.log(`📧 Email API available at http://localhost:${PORT}/api/contact`);
  console.log(`📚 Static site available at http://localhost:${PORT}`);
});
