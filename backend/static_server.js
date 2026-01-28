const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

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

// API
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

// delete resource by id (file-based)
app.delete('/api/resources/:id', (req, res)=>{
  const id = req.params.id;
  let arr = readResources();
  const before = arr.length;
  arr = arr.filter(it=>String(it.id) !== String(id));
  if(arr.length === before) return res.status(404).json({ message: 'Not found' });
  writeResources(arr);
  res.json({ ok: true });
});

// Fallback middleware: serve index.html for client-side routes (no path-to-regexp usage)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const filePath = path.join(staticPath, decodeURI(req.path));
  // if request targets a file (has a dot) or file exists, let static middleware handle it
  if (req.path.includes('.') || fs.existsSync(filePath)) return next();
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, ()=> console.log(`Static server running on port ${PORT}`));
