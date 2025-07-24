#!/bin/bash

echo "🔥 Firebase Setup Script for Clips Application"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ID="clips-db-6e5bb"

echo -e "${BLUE}📋 Project ID: ${PROJECT_ID}${NC}"
echo ""

# Step 1: Login to Firebase (if not already logged in)
echo -e "${YELLOW}Step 1: Checking Firebase authentication...${NC}"
if firebase projects:list > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Already logged in to Firebase${NC}"
else
    echo -e "${YELLOW}🔐 Please login to Firebase...${NC}"
    firebase login
fi

# Step 2: Set the project
echo -e "${YELLOW}Step 2: Setting Firebase project...${NC}"
firebase use $PROJECT_ID
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Project set successfully${NC}"
else
    echo -e "${RED}❌ Failed to set project. Please check your project ID${NC}"
    exit 1
fi

# Step 3: Deploy Firestore rules
echo -e "${YELLOW}Step 3: Deploying Firestore rules...${NC}"
firebase deploy --only firestore:rules
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Firestore rules deployed successfully${NC}"
else
    echo -e "${RED}❌ Failed to deploy Firestore rules${NC}"
fi

# Step 4: Deploy Storage rules
echo -e "${YELLOW}Step 4: Deploying Storage rules...${NC}"
firebase deploy --only storage:rules
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Storage rules deployed successfully${NC}"
else
    echo -e "${RED}❌ Failed to deploy Storage rules${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Firebase setup completed!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Go to Firebase Console: https://console.firebase.google.com/project/$PROJECT_ID"
echo "2. Navigate to Authentication > Sign-in method"
echo "3. Enable Email/Password provider"
echo "4. Test your application at http://localhost:4200"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: You must enable Email/Password authentication in the Firebase Console manually${NC}"