/**
 * Email Service - Handles real-time email sending
 * Supports: Gmail, Gmail App Password, or custom SMTP
 */

const nodemailer = require('nodemailer');

let transporter = null;

// Initialize email transporter
function initializeTransporter() {
  if (transporter) return transporter;

  // Gmail configuration (using App Password)
  const email = process.env.EMAIL_USER || 'davidbulus117@gmail.com';
  const password = process.env.EMAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  if (!email || !password) {
    console.warn('⚠️ Email credentials not configured. Emails will be logged to console only.');
    return null;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });

  console.log('✅ Email transporter initialized');
  return transporter;
}

// Send contact form email
async function sendContactEmail(data) {
  const { name, email, subject, message } = data;

  if (!name || !email || !subject || !message) {
    throw new Error('Missing required fields: name, email, subject, message');
  }

  const transporter = initializeTransporter();
  
  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER || 'davidbulus117@gmail.com',
    to: process.env.CONTACT_EMAIL || 'davidbulus117@gmail.com,info@fourci.org',
    replyTo: email,
    subject: `New Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669; border-bottom: 3px solid #059669; padding-bottom: 10px;">
          New Message from FOURCi Contact Form
        </h2>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>

        <div style="margin: 20px 0; line-height: 1.6;">
          <h3 style="color: #374151;">Message:</h3>
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px;">
          Reply directly to this email or use the contact dashboard at
          <a href="${process.env.ADMIN_URL || 'http://localhost:5000'}/admin" style="color: #059669;">
            ${process.env.ADMIN_URL || 'http://localhost:5000'}/admin
          </a>
        </p>
      </div>
    `,
    text: `
New Contact Form Submission:

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `
  };

  try {
    if (!transporter) {
      // Fallback: log to console if no transporter
      console.log('📧 Email (Demo Mode - not sent):', mailOptions);
      return {
        success: true,
        demo: true,
        message: 'Email logged (Demo Mode)',
        data: { name, email, subject }
      };
    }

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.messageId);
    
    return {
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully',
      data: { name, email, subject }
    };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    throw error;
  }
}

// Store contact submission for admin dashboard
async function storeContactSubmission(data) {
  const { name, email, subject, message } = data;
  
  // Store in memory (or database)
  const submission = {
    id: Date.now().toString(),
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
    status: 'received'
  };

  console.log('💾 Contact submission stored:', submission.id);
  return submission;
}

module.exports = {
  initializeTransporter,
  sendContactEmail,
  storeContactSubmission
};
