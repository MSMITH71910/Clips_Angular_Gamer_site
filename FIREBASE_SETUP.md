# Firebase Setup Instructions

## 1. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (or create a new one)
3. Click on the gear icon (Project Settings)
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" and select the web icon (</>)
6. Copy the configuration object

## 2. Update Environment Configuration

Replace the placeholder values in `src/environments/environment.ts` with your actual Firebase configuration:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id"
  }
};
```

## 3. Enable Authentication

1. In Firebase Console, go to Authentication
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider

## 4. Update Firestore Security Rules

Deploy the security rules from `firestore.rules` to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

Or manually copy the rules from `firestore.rules` to your Firebase Console > Firestore Database > Rules.

## 5. Test Authentication

After completing the above steps, your registration and sign-in should work properly.

## Common Issues

- **Invalid API key**: Make sure you copied the correct API key from Firebase Console
- **Auth domain mismatch**: Ensure the authDomain matches your project ID
- **Firestore rules**: Make sure the security rules allow authenticated users to read/write