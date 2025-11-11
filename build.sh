#!/bin/bash
# Vercel build script

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building frontend..."
npm run build

echo "✅ Build complete!"
echo "📁 Output directory: dist/public"
ls -la dist/public || echo "⚠️  dist/public not found"

