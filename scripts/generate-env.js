#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create environments directory if it doesn't exist
const envDir = path.join(__dirname, '..', 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Check if required environment variables are set
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n📋 Please set these environment variables or create a .env file with your Firebase configuration.');
  console.error('   You can copy .env.example to .env and fill in your values.');
  process.exit(1);
}

// Generate environment.ts
const environmentContent = `export const environment = {
  production: false,
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.FIREBASE_APP_ID}"
  }
};`;

// Generate environment.prod.ts
const environmentProdContent = `export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.FIREBASE_APP_ID}"
  }
};`;

// Write the files
fs.writeFileSync(path.join(envDir, 'environment.ts'), environmentContent);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), environmentProdContent);

console.log('✅ Environment files generated successfully with Firebase configuration!');
console.log('🔐 All sensitive data is now loaded from environment variables.');