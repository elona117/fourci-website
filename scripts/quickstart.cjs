#!/usr/bin/env node
/**
 * FOURCi Quick Start Script
 * Usage: npm run quickstart
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const checks = [];

function log(msg, type = 'info') {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warn: '⚠️',
    error: '❌'
  };
  console.log(`${icons[type]} ${msg}`);
}

async function runCheck(name, cmd, cwd = '.') {
  return new Promise((resolve) => {
    const proc = spawn(cmd, { shell: true, cwd, stdio: 'pipe' });
    let stdout = '';
    proc.stdout.on('data', d => stdout += d);
    proc.on('close', code => {
      const passed = code === 0;
      checks.push({ name, passed, stdout });
      log(name, passed ? 'success' : 'error');
      resolve(passed);
    });
  });
}

(async () => {
  console.log('\n🚀 FOURCi Pre-Deployment Checklist\n');

  // Check node_modules
  log('Checking dependencies...', 'info');
  if (!fs.existsSync('node_modules')) {
    log('Installing root dependencies...', 'warn');
    await runCheck('npm install', 'npm install', '.');
  } else {
    log('Root dependencies found', 'success');
  }

  if (!fs.existsSync('backend/node_modules')) {
    log('Installing backend dependencies...', 'warn');
    await runCheck('npm install backend', 'npm install', 'backend');
  } else {
    log('Backend dependencies found', 'success');
  }

  // Build checks
  log('\nBuilding React app...', 'info');
  await runCheck('npm run build', 'npm run build', '.');

  // Verify files
  log('\nVerifying deployment files...', 'info');
  const requiredFiles = [
    'dist/index.html',
    'dist/assets',
    'backend/server.js',
    'backend/static_server.js',
    'backend/smoke_test.js',
    'vercel.json',
    'DEPLOYMENT.md'
  ];

  requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    log(file, exists ? 'success' : 'error');
  });

  // Env checks
  log('\nEnvironment variables...', 'info');
  const envExists = fs.existsSync('.env.local');
  const backendEnvExists = fs.existsSync('backend/.env');
  
  if (!envExists) {
    log('.env.local missing - please create with GEMINI_API_KEY', 'warn');
  } else {
    log('.env.local found', 'success');
  }

  if (!backendEnvExists) {
    log('backend/.env missing - please create with MONGODB_URI', 'warn');
  } else {
    log('backend/.env found', 'success');
  }

  // Summary
  console.log('\n📋 Summary:');
  console.log(`Total checks: ${checks.length}`);
  console.log(`Passed: ${checks.filter(c => c.passed).length}`);
  console.log(`Failed: ${checks.filter(c => !c.passed).length}`);

  console.log('\n🎯 Next Steps:');
  console.log('1. Ensure .env.local has GEMINI_API_KEY');
  console.log('2. Ensure backend/.env has MONGODB_URI');
  console.log('3. Test locally: npm run dev (in one terminal) + cd backend && npm run dev (another)');
  console.log('4. Run smoke tests: cd backend && node smoke_test.js');
  console.log('5. Deploy: git push origin master (Vercel auto-deploys)');

  console.log('\n📚 Documentation:');
  console.log('- Full guide: DEPLOYMENT.md');
  console.log('- Static fallback: README-STATIC.md');
  console.log('- Main README: README.md\n');
})();
