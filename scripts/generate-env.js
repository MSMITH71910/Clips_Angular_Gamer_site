#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create environments directory if it doesn't exist
const envDir = path.join(__dirname, '..', 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Generate environment.ts
const environmentContent = `export const environment = {
  production: false,
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY || 'your-api-key'}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com'}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || 'your-project-id'}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com'}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || '123456789'}",
    appId: "${process.env.FIREBASE_APP_ID || 'your-app-id'}"
  }
};`;

// Generate environment.prod.ts
const environmentProdContent = `export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY || 'your-api-key'}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com'}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || 'your-project-id'}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com'}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || '123456789'}",
    appId: "${process.env.FIREBASE_APP_ID || 'your-app-id'}"
  }
};`;

// Write the files
fs.writeFileSync(path.join(envDir, 'environment.ts'), environmentContent);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), environmentProdContent);

console.log('Environment files generated successfully!');