#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class TemplateGenerator {
  constructor() {
    this.projectName = '';
    this.brandName = '';
    this.primaryColor = '';
    this.templateType = '';
    this.features = [];
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  async collectUserInput() {
    console.log('🚀 Welcome to LoveLang Template Generator!');
    console.log('Let\'s create your custom e-commerce website.\n');

    this.projectName = await this.askQuestion('Enter your project name: ');
    this.brandName = await this.askQuestion('Enter your brand name: ');
    this.primaryColor = await this.askQuestion('Enter primary color (hex code, e.g., #ea580c): ');
    
    console.log('\nSelect template type:');
    console.log('1. Complete E-commerce Site');
    console.log('2. Beauty & Cosmetics');
    console.log('3. Fashion & Clothing');
    console.log('4. Food & Beverage');
    console.log('5. Electronics');
    console.log('6. Minimal Template');
    
    const templateChoice = await this.askQuestion('Choose template (1-6): ');
    this.templateType = this.getTemplateType(templateChoice);

    console.log('\nSelect features to include:');
    console.log('1. Shopping Cart');
    console.log('2. User Authentication');
    console.log('3. Wishlist');
    console.log('4. Search Functionality');
    console.log('5. Blog/Content Management');
    console.log('6. Analytics Integration');
    
    const featuresInput = await this.askQuestion('Enter feature numbers (comma-separated, e.g., 1,2,3): ');
    this.features = this.parseFeatures(featuresInput);

    rl.close();
  }

  getTemplateType(choice) {
    const types = {
      '1': 'complete',
      '2': 'beauty',
      '3': 'fashion',
      '4': 'food',
      '5': 'electronics',
      '6': 'minimal'
    };
    return types[choice] || 'complete';
  }

  parseFeatures(input) {
    const featureMap = {
      '1': 'cart',
      '2': 'auth',
      '3': 'wishlist',
      '4': 'search',
      '5': 'blog',
      '6': 'analytics'
    };
    
    return input.split(',').map(num => featureMap[num.trim()]).filter(Boolean);
  }

  async generateTemplate() {
    const targetDir = path.join(process.cwd(), this.projectName);
    
    console.log(`\n📁 Creating project directory: ${targetDir}`);
    
    // Create project directory
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy base template files
    await this.copyBaseTemplate(targetDir);
    
    // Customize configuration
    await this.customizeConfig(targetDir);
    
    // Generate components based on template type
    await this.generateComponents(targetDir);
    
    // Update package.json
    await this.updatePackageJson(targetDir);
    
    console.log('\n✅ Template generated successfully!');
    console.log(`\n📋 Next steps:`);
    console.log(`   cd ${this.projectName}`);
    console.log(`   npm install`);
    console.log(`   npm run dev`);
    console.log(`\n🎨 Customize your template:`);
    console.log(`   - Update images in assets/`);
    console.log(`   - Edit content in data/`);
    console.log(`   - Modify styles in styles/`);
  }

  async copyBaseTemplate(targetDir) {
    const sourceDir = path.join(__dirname, '../base-template');
    
    // Copy all base files
    this.copyRecursive(sourceDir, targetDir);
    
    // Copy current project structure as base
    const projectFiles = [
      'client/',
      'server/',
      'shared/',
      'package.json',
      'vite.config.ts',
      'tailwind.config.ts',
      'tsconfig.json'
    ];
    
    for (const file of projectFiles) {
      const sourcePath = path.join(process.cwd(), file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.existsSync(sourcePath)) {
        this.copyRecursive(sourcePath, targetPath);
      }
    }
  }

  copyRecursive(src, dest) {
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      for (const file of files) {
        if (file !== 'node_modules' && file !== '.git') {
          this.copyRecursive(path.join(src, file), path.join(dest, file));
        }
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  async customizeConfig(targetDir) {
    // Update brand configuration
    const brandConfig = {
      name: this.brandName,
      primaryColor: this.primaryColor,
      templateType: this.templateType,
      features: this.features,
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(targetDir, 'config/brand.json'),
      JSON.stringify(brandConfig, null, 2)
    );

    // Update environment variables template
    const envTemplate = `
# Database
DATABASE_URL=your_database_url_here

# Authentication
AUTH_SECRET=your_auth_secret_here

# API Keys (add as needed)
STRIPE_SECRET_KEY=your_stripe_key_here
TWILIO_ACCOUNT_SID=your_twilio_sid_here

# Brand Configuration
VITE_BRAND_NAME=${this.brandName}
VITE_PRIMARY_COLOR=${this.primaryColor}
`;

    fs.writeFileSync(path.join(targetDir, '.env.example'), envTemplate);
  }

  async generateComponents(targetDir) {
    // Generate template-specific components
    const componentTemplates = {
      'beauty': this.generateBeautyComponents,
      'fashion': this.generateFashionComponents,
      'food': this.generateFoodComponents,
      'electronics': this.generateElectronicsComponents,
      'minimal': this.generateMinimalComponents
    };

    if (componentTemplates[this.templateType]) {
      await componentTemplates[this.templateType].call(this, targetDir);
    }
  }

  generateBeautyComponents(targetDir) {
    // Beauty-specific customizations
    const beautyData = {
      categories: ['Skincare', 'Haircare', 'Makeup', 'Fragrances'],
      colors: {
        primary: '#f59e0b',
        secondary: '#ec4899',
        accent: '#8b5cf6'
      }
    };
    
    fs.writeFileSync(
      path.join(targetDir, 'data/beauty-config.json'),
      JSON.stringify(beautyData, null, 2)
    );
  }

  generateFashionComponents(targetDir) {
    // Fashion-specific customizations
    const fashionData = {
      categories: ['Women', 'Men', 'Kids', 'Accessories'],
      colors: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#f59e0b'
      }
    };
    
    fs.writeFileSync(
      path.join(targetDir, 'data/fashion-config.json'),
      JSON.stringify(fashionData, null, 2)
    );
  }

  // Add more template-specific generators...

  async updatePackageJson(targetDir) {
    const packageJsonPath = path.join(targetDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    packageJson.name = this.projectName;
    packageJson.description = `${this.brandName} e-commerce website`;
    packageJson.version = '1.0.0';
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  async run() {
    try {
      await this.collectUserInput();
      await this.generateTemplate();
    } catch (error) {
      console.error('❌ Error generating template:', error.message);
      process.exit(1);
    }
  }
}

// Run the generator
const generator = new TemplateGenerator();
generator.run();