#!/bin/bash

# LoveLang Template Deployment Script
# This script helps you create and deploy templates based on the LoveLang e-commerce platform

set -e

echo "🚀 LoveLang Template Generator"
echo "==============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js first."
    exit 1
fi

# Default values
PROJECT_NAME=""
TEMPLATE_TYPE=""
BRAND_NAME=""
PRIMARY_COLOR=""
OUTPUT_DIR=""

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -n, --name NAME        Project name (required)"
    echo "  -t, --type TYPE        Template type: complete|beauty|fashion|food|electronics|minimal (default: complete)"
    echo "  -b, --brand BRAND      Brand name (default: same as project name)"
    echo "  -c, --color COLOR      Primary color in hex format (default: #ea580c)"
    echo "  -o, --output DIR       Output directory (default: ./PROJECT_NAME)"
    echo "  -h, --help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -n my-store -t beauty -b \"Beauty Store\" -c \"#f59e0b\""
    echo "  $0 --name fashion-shop --type fashion --brand \"Fashion Hub\""
    echo ""
    echo "Available template types:"
    echo "  complete     - Full e-commerce site with all features"
    echo "  beauty       - Beauty & cosmetics focused theme"
    echo "  fashion      - Fashion & clothing store theme"
    echo "  food         - Food & beverage store theme"
    echo "  electronics  - Electronics & tech store theme"
    echo "  minimal      - Clean, minimalist theme"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -n|--name)
            PROJECT_NAME="$2"
            shift 2
            ;;
        -t|--type)
            TEMPLATE_TYPE="$2"
            shift 2
            ;;
        -b|--brand)
            BRAND_NAME="$2"
            shift 2
            ;;
        -c|--color)
            PRIMARY_COLOR="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            echo "❌ Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Interactive mode if no project name provided
if [ -z "$PROJECT_NAME" ]; then
    echo "📋 Interactive Template Generator"
    echo ""
    read -p "Enter project name: " PROJECT_NAME
    
    if [ -z "$PROJECT_NAME" ]; then
        echo "❌ Project name is required"
        exit 1
    fi
fi

# Set defaults
TEMPLATE_TYPE=${TEMPLATE_TYPE:-"complete"}
BRAND_NAME=${BRAND_NAME:-"$PROJECT_NAME"}
PRIMARY_COLOR=${PRIMARY_COLOR:-"#ea580c"}
OUTPUT_DIR=${OUTPUT_DIR:-"./$PROJECT_NAME"}

# Validate template type
if [[ ! "$TEMPLATE_TYPE" =~ ^(complete|beauty|fashion|food|electronics|minimal)$ ]]; then
    echo "❌ Invalid template type: $TEMPLATE_TYPE"
    echo "Valid types: complete, beauty, fashion, food, electronics, minimal"
    exit 1
fi

echo ""
echo "📋 Template Configuration:"
echo "  Project Name: $PROJECT_NAME"
echo "  Template Type: $TEMPLATE_TYPE"
echo "  Brand Name: $BRAND_NAME"
echo "  Primary Color: $PRIMARY_COLOR"
echo "  Output Directory: $OUTPUT_DIR"
echo ""

# Ask for confirmation
read -p "Continue with template generation? (y/N): " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "❌ Template generation cancelled"
    exit 0
fi

echo ""
echo "🔧 Generating template..."

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Copy base project structure
echo "📁 Copying base project files..."
cp -r client/ server/ shared/ "$OUTPUT_DIR/"
cp package.json vite.config.ts tailwind.config.ts tsconfig.json postcss.config.js components.json "$OUTPUT_DIR/"

# Copy template-specific files
echo "🎨 Setting up template files..."
mkdir -p "$OUTPUT_DIR/templates"
cp -r templates/ "$OUTPUT_DIR/"

# Generate theme
echo "🎨 Generating theme for $TEMPLATE_TYPE..."
node templates/customizer/theme-generator.js "$TEMPLATE_TYPE" "$OUTPUT_DIR"

# Create brand configuration
echo "⚙️ Creating brand configuration..."
cat > "$OUTPUT_DIR/config/brand.json" << EOF
{
  "name": "$BRAND_NAME",
  "projectName": "$PROJECT_NAME",
  "primaryColor": "$PRIMARY_COLOR",
  "templateType": "$TEMPLATE_TYPE",
  "generatedAt": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "1.0.0"
}
EOF

# Create deployment instructions
echo "📋 Creating deployment instructions..."
cat > "$OUTPUT_DIR/DEPLOYMENT.md" << EOF
# $BRAND_NAME - Deployment Guide

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database and API keys
   \`\`\`

3. Set up database:
   \`\`\`bash
   npm run db:push
   \`\`\`

4. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Customization

### Change Brand Colors
Edit \`styles/themes/$TEMPLATE_TYPE.css\` and update the CSS variables.

### Update Products
Edit \`client/src/data/products.json\` with your product data.

### Modify Content
Update text and images in the components located in \`client/src/components/\`.

### Add Features
- Cart functionality: Already included
- User authentication: Already included  
- Payment processing: Add Stripe integration
- Email notifications: Add email service integration

## Deployment Options

### Replit Deployment
1. Connect your GitHub repository
2. Click the Deploy button in Replit
3. Configure environment variables
4. Deploy!

### Other Platforms
- Vercel: \`npm run build\` then deploy dist folder
- Netlify: Connect GitHub and auto-deploy
- Railway: Connect GitHub repository
- DigitalOcean App Platform: Use GitHub integration

## Support

This template is based on the LoveLang e-commerce platform.
For customization help, refer to the templates documentation.

Template Type: $TEMPLATE_TYPE
Generated: $(date)
EOF

# Create environment template
echo "🔐 Creating environment template..."
cat > "$OUTPUT_DIR/.env.example" << EOF
# Database Configuration
DATABASE_URL=your_postgresql_connection_string

# Authentication
AUTH_SECRET=your_random_secret_key_here

# Brand Configuration  
VITE_BRAND_NAME=$BRAND_NAME
VITE_PRIMARY_COLOR=$PRIMARY_COLOR
VITE_TEMPLATE_TYPE=$TEMPLATE_TYPE

# Optional: External Service API Keys
# STRIPE_SECRET_KEY=sk_test_...
# TWILIO_ACCOUNT_SID=AC...
# TWILIO_AUTH_TOKEN=...
# SENDGRID_API_KEY=SG...

# Development
NODE_ENV=development
EOF

# Create README
echo "📝 Creating README..."
cat > "$OUTPUT_DIR/README.md" << EOF
# $BRAND_NAME

A modern e-commerce platform built with React, TypeScript, and Tailwind CSS.

## Template Information
- **Template Type**: $TEMPLATE_TYPE
- **Generated**: $(date)
- **Based on**: LoveLang E-commerce Platform

## Features

✅ Modern React + TypeScript architecture  
✅ Responsive design with Tailwind CSS  
✅ Shopping cart and wishlist functionality  
✅ User authentication system  
✅ Product catalog and search  
✅ Mobile-optimized interface  
✅ Database integration (PostgreSQL)  
✅ Payment processing ready  

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Initialize database
npm run db:push

# Start development server
npm run dev
\`\`\`

## Project Structure

\`\`\`
├── client/          # React frontend
├── server/          # Express backend  
├── shared/          # Shared types and schemas
├── templates/       # Template customization files
└── config/          # Configuration files
\`\`\`

## Customization

See \`DEPLOYMENT.md\` for detailed customization instructions.

## License

This project is based on the LoveLang template system.
EOF

echo ""
echo "✅ Template generated successfully!"
echo ""
echo "📁 Your new project is ready at: $OUTPUT_DIR"
echo ""
echo "🚀 Next steps:"
echo "   cd $OUTPUT_DIR"
echo "   npm install"
echo "   cp .env.example .env"
echo "   # Edit .env with your configuration"
echo "   npm run db:push"
echo "   npm run dev"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - DEPLOYMENT.md - Deployment guide"
echo "   - templates/ - Customization files"
echo ""
echo "🎉 Happy coding!"