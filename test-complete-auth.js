#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

console.log('🧪 Complete Authentication Test');
console.log('================================');

// Test 1: Check if application is running
function testApplicationRunning() {
    return new Promise((resolve) => {
        const http = require('http');
        const req = http.get('http://localhost:4200', (res) => {
            if (res.statusCode === 200) {
                console.log('✅ Application is running on localhost:4200');
                resolve(true);
            } else {
                console.log('❌ Application not responding correctly');
                resolve(false);
            }
        });
        
        req.on('error', () => {
            console.log('❌ Application is not running on localhost:4200');
            resolve(false);
        });
        
        req.setTimeout(5000, () => {
            console.log('❌ Application request timed out');
            resolve(false);
        });
    });
}

// Test 2: Check Firebase configuration
function testFirebaseConfig() {
    try {
        const envPath = './src/environments/environment.ts';
        const envContent = fs.readFileSync(envPath, 'utf8');
        
        const hasValidApiKey = envContent.includes('AIzaSyCVpBJFS0KK0InmU8KiQ6lC6a35A9s2ERU');
        const hasValidProjectId = envContent.includes('clips-db-6e5bb');
        const hasValidAuthDomain = envContent.includes('clips-db-6e5bb.firebaseapp.com');
        
        if (hasValidApiKey && hasValidProjectId && hasValidAuthDomain) {
            console.log('✅ Firebase configuration is correct');
            return true;
        } else {
            console.log('❌ Firebase configuration has issues');
            return false;
        }
    } catch (error) {
        console.log('❌ Could not read environment file');
        return false;
    }
}

// Test 3: Check if Firebase rules exist
function testFirebaseRules() {
    const firestoreRulesExist = fs.existsSync('./firestore.rules');
    const storageRulesExist = fs.existsSync('./storage.rules');
    const firebaseJsonExists = fs.existsSync('./firebase.json');
    
    if (firestoreRulesExist && storageRulesExist && firebaseJsonExists) {
        console.log('✅ Firebase rules and configuration files exist');
        return true;
    } else {
        console.log('❌ Missing Firebase configuration files');
        if (!firestoreRulesExist) console.log('  - Missing firestore.rules');
        if (!storageRulesExist) console.log('  - Missing storage.rules');
        if (!firebaseJsonExists) console.log('  - Missing firebase.json');
        return false;
    }
}

// Test 4: Check authentication service
function testAuthService() {
    try {
        const authServicePath = './src/app/services/auth.service.ts';
        const authServiceContent = fs.readFileSync(authServicePath, 'utf8');
        
        const hasCreateUser = authServiceContent.includes('createUser');
        const hasSignIn = authServiceContent.includes('signIn');
        const hasSignOut = authServiceContent.includes('signOut');
        
        if (hasCreateUser && hasSignIn && hasSignOut) {
            console.log('✅ Authentication service has all required methods');
            return true;
        } else {
            console.log('❌ Authentication service is missing methods');
            return false;
        }
    } catch (error) {
        console.log('❌ Could not read authentication service file');
        return false;
    }
}

// Test 5: Check build status
function testBuild() {
    return new Promise((resolve) => {
        const { exec } = require('child_process');
        console.log('🔨 Testing build...');
        
        exec('npm run build', { cwd: process.cwd() }, (error, stdout, stderr) => {
            if (error) {
                console.log('❌ Build failed');
                console.log('Error:', error.message);
                resolve(false);
            } else {
                console.log('✅ Build successful');
                resolve(true);
            }
        });
    });
}

// Run all tests
async function runAllTests() {
    console.log('\n🚀 Starting comprehensive tests...\n');
    
    const results = {
        appRunning: await testApplicationRunning(),
        firebaseConfig: testFirebaseConfig(),
        firebaseRules: testFirebaseRules(),
        authService: testAuthService(),
        build: await testBuild()
    };
    
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    
    Object.entries(results).forEach(([test, passed]) => {
        const status = passed ? '✅' : '❌';
        const testName = test.replace(/([A-Z])/g, ' $1').toLowerCase();
        console.log(`${status} ${testName}`);
    });
    
    const allPassed = Object.values(results).every(result => result === true);
    
    console.log('\n🎯 Overall Status:');
    if (allPassed) {
        console.log('✅ ALL TESTS PASSED - Your application is ready!');
        console.log('\n📋 Next Steps:');
        console.log('1. Run: ./setup-firebase.sh');
        console.log('2. Enable Email/Password auth in Firebase Console');
        console.log('3. Test registration and login');
        console.log('4. Deploy to Netlify');
    } else {
        console.log('❌ Some tests failed - Please fix the issues above');
    }
    
    return allPassed;
}

// Run the tests
runAllTests().catch(console.error);