#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🔐 Enabling Firebase Authentication');
console.log('===================================');

// Check if Firebase CLI can enable auth
exec('firebase auth:export --help', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ Firebase CLI auth commands not available');
    console.log('');
    console.log('🔧 MANUAL SETUP REQUIRED:');
    console.log('1. Go to: https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/providers');
    console.log('   (Replace YOUR_PROJECT_ID with your actual Firebase project ID)');
    console.log('2. Click "Get started" if you haven\'t already');
    console.log('3. Go to "Sign-in method" tab');
    console.log('4. Click on "Email/Password"');
    console.log('5. Enable "Email/Password" (first option)');
    console.log('6. Click "Save"');
    console.log('');
    console.log('✅ After enabling, your authentication will work!');
  } else {
    console.log('✅ Firebase CLI available');
    console.log('⚠️  Note: Authentication providers must be enabled manually in Firebase Console');
    console.log('');
    console.log('🔧 Go to: https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/providers');
    console.log('   (Replace YOUR_PROJECT_ID with your actual Firebase project ID)');
    console.log('Enable Email/Password authentication');
  }
});