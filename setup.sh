#!/bin/bash

echo "🚀 QuickBlog API Setup"
echo "======================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Make CLI executable
chmod +x bin/quickblog.js

# Link globally (optional)
echo "🔗 Linking globally..."
npm link

echo "✅ Setup complete!"
echo ""
echo "Usage:"
echo "  quickblog --help        # Show all commands"
echo "  quickblog login         # Login to your account"
echo "  quickblog list          # List all blogs"
echo "  quickblog create        # Create new blog"
echo ""
echo "Example workflow:"
echo "  quickblog login"
echo "  quickblog create --file sample-post.md"
echo "  quickblog list --my"
