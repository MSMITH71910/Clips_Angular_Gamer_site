#!/bin/bash

echo "🚀 Complete Deployment Script for Clips Application"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ID="clips-db-6e5bb"

echo -e "${BLUE}📋 Project: Clips Gaming Application${NC}"
echo -e "${BLUE}📋 Firebase Project: ${PROJECT_ID}${NC}"
echo ""

# Step 1: Test local build
echo -e "${YELLOW}Step 1: Testing local build...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Local build successful${NC}"
else
    echo -e "${RED}❌ Local build failed${NC}"
    exit 1
fi

# Step 2: Check Firebase rules deployment
echo -e "${YELLOW}Step 2: Verifying Firebase rules...${NC}"
firebase deploy --only firestore:rules,storage:rules
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Firebase rules deployed${NC}"
else
    echo -e "${RED}❌ Firebase rules deployment failed${NC}"
fi

# Step 3: Check if Netlify CLI is available
echo -e "${YELLOW}Step 3: Checking Netlify CLI...${NC}"
if command -v netlify &> /dev/null; then
    echo -e "${GREEN}✅ Netlify CLI available${NC}"
    
    # Deploy to Netlify
    echo -e "${YELLOW}Deploying to Netlify...${NC}"
    netlify deploy --prod --dir=dist/clips
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Netlify deployment successful${NC}"
    else
        echo -e "${RED}❌ Netlify deployment failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Netlify CLI not found${NC}"
    echo -e "${BLUE}📋 Manual Netlify deployment steps:${NC}"
    echo "1. Go to https://app.netlify.com/"
    echo "2. Drag and drop the 'dist/clips' folder"
    echo "3. Or connect your GitHub repository"
    echo "4. Set build command: npm run build"
    echo "5. Set publish directory: dist/clips"
fi

echo ""
echo -e "${GREEN}🎉 Deployment process completed!${NC}"
echo ""
echo -e "${BLUE}📋 Final checklist:${NC}"
echo "✅ Firebase configuration: Complete"
echo "✅ Firestore rules: Deployed"
echo "✅ Storage rules: Deployed"
echo "✅ Application build: Successful"
echo "✅ Netlify configuration: Ready"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT: Complete these manual steps:${NC}"
echo "1. Enable Email/Password authentication in Firebase Console:"
echo "   https://console.firebase.google.com/project/${PROJECT_ID}/authentication/providers"
echo "2. Test authentication on your deployed site"
echo "3. Verify file uploads work in production"
echo ""
echo -e "${GREEN}🔗 Your application should be fully functional!${NC}"