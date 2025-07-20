// Copy this file to environment.ts and environment.prod.ts
// Replace the placeholder values with your actual Firebase configuration

export const environment = {
  production: false, // Set to true for environment.prod.ts
  firebase: {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
  }
};