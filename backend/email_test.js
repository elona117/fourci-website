/**
 * Email Test Script
 * Tests the contact form email API endpoint
 */

const http = require('http');

function testEmail() {
  const testData = JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    subject: "Test Message",
    message: "This is a test message from the FOURCi contact form."
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(testData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('\n📧 Email Test Response:');
      console.log('Status:', res.statusCode);
      console.log('Body:', JSON.parse(data));
      
      if (res.statusCode === 200) {
        console.log('\n✅ Email API working!');
      } else {
        console.log('\n❌ Email API returned error');
      }
      process.exit(0);
    });
  });

  req.on('error', (error) => {
    console.error('\n❌ Error connecting to server:');
    console.error(error.message);
    console.log('\nMake sure the server is running: npm run start:static');
    process.exit(1);
  });

  console.log('📤 Sending test email to /api/contact...');
  req.write(testData);
  req.end();
}

// Run test
testEmail();
