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
    apiKey: "${process.env.FIREBASE_API_KEY || 'AIzaSyCVpBJFS0KK0InmU8KiQ6lC6a35A9s2ERU'}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'clips-db-6e5bb.firebaseapp.com'}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || 'clips-db-6e5bb'}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'clips-db-6e5bb.firebasestorage.app'}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || '854666951775'}",
    appId: "${process.env.FIREBASE_APP_ID || '1:854666951775:web:f00476daf71cca09e72fea'}"
  }
};`;

// Generate environment.prod.ts
const environmentProdContent = `export const environment = {
  production: true,
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY || 'AIzaSyCVpBJFS0KK0InmU8KiQ6lC6a35A9s2ERU'}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'clips-db-6e5bb.firebaseapp.com'}",
    projectId: "${process.env.FIREBASE_PROJECT_ID || 'clips-db-6e5bb'}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'clips-db-6e5bb.firebasestorage.app'}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || '854666951775'}",
    appId: "${process.env.FIREBASE_APP_ID || '1:854666951775:web:f00476daf71cca09e72fea'}"
  }
};`;

// Write the files
fs.writeFileSync(path.join(envDir, 'environment.ts'), environmentContent);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), environmentProdContent);

console.log('Environment files generated successfully with Firebase configuration!');