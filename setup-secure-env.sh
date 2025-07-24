#!/bin/bash

echo "🔐 Setting up secure environment configuration"
echo "=============================================="

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Backing it up to .env.backup"
    cp .env .env.backup
fi

# Copy .env.example to .env
if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo ""
    echo "📋 Next steps:"
    echo "1. Edit the .env file with your actual Firebase configuration"
    echo "2. Run 'node scripts/generate-env.js' to generate environment files"
    echo "3. The API keys will now be loaded from environment variables"
    echo ""
    echo "🔒 Security improvements made:"
    echo "- Removed hardcoded API keys from scripts/generate-env.js"
    echo "- Added .env files to .gitignore"
    echo "- Environment files now require proper environment variables"
    echo ""
    echo "⚠️  IMPORTANT: Never commit .env files to version control!"
else
    echo "❌ .env.example file not found"
    exit 1
fi