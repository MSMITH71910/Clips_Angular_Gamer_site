# Clips - Angular Gaming Video Site

A modern Angular application for uploading, managing, and sharing gaming video clips with Firebase backend.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Features

- 🎮 Upload and manage gaming video clips
- 🔐 User authentication with Firebase Auth
- 📱 Responsive design with Tailwind CSS
- 🎬 Video processing and editing capabilities
- 🔥 Real-time data with Firestore
- ☁️ Cloud storage with Firebase Storage

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with enabled services:
  - Authentication (Email/Password)
  - Firestore Database
  - Storage

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication → Sign-in method → Email/Password
3. Create Firestore Database in test mode
4. Create Storage bucket
5. Copy `src/environments/environment.template.ts` to `src/environments/environment.ts` and `src/environments/environment.prod.ts`
6. Replace placeholder values with your Firebase configuration

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Deployment

### Netlify Deployment

This project is configured for easy deployment on Netlify:

1. **Connect your repository** to Netlify
2. **Set environment variables** in Netlify dashboard:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
3. **Deploy** - Netlify will automatically run the build process

The `prebuild` script will automatically generate the environment files using your Netlify environment variables.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
