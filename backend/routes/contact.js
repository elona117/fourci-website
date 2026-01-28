/**
 * Contact Routes - Handle form submissions with real-time email
 */

const express = require('express');
const router = express.Router();
const { sendContactEmail, storeContactSubmission } = require('../utils/emailService');

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
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

    // Emit real-time notification (if WebSocket available)
    if (global.io) {
      global.io.emit('contact:new', submission);
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been received! We\'ll respond shortly.',
      submissionId: submission.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process your request. Please try again later or email us directly.'
    });
  }
});

// GET /api/contact/submissions - Get all submissions (admin only)
router.get('/submissions', (req, res) => {
  // TODO: Add authentication/authorization
  // For now, return empty (would connect to database)
  res.json({
    submissions: [],
    total: 0
  });
});

module.exports = router;
