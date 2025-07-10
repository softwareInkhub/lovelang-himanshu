#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class ThemeGenerator {
  constructor() {
    this.themes = {
      beauty: {
        colors: {
          primary: '#f59e0b',
          secondary: '#ec4899',
          accent: '#8b5cf6',
          background: '#fef7ed',
          text: '#1f2937'
        },
        fonts: {
          heading: 'Playfair Display',
          body: 'Inter'
        },
        spacing: 'relaxed'
      },
      fashion: {
        colors: {
          primary: '#1f2937',
          secondary: '#6b7280',
          accent: '#f59e0b',
          background: '#ffffff',
          text: '#111827'
        },
        fonts: {
          heading: 'Montserrat',
          body: 'Source Sans Pro'
        },
        spacing: 'tight'
      },
      food: {
        colors: {
          primary: '#dc2626',
          secondary: '#ea580c',
          accent: '#16a34a',
          background: '#fef2f2',
          text: '#1f2937'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Open Sans'
        },
        spacing: 'comfortable'
      },
      electronics: {
        colors: {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#06b6d4',
          background: '#f8fafc',
          text: '#0f172a'
        },
        fonts: {
          heading: 'Roboto',
          body: 'Inter'
        },
        spacing: 'modern'
      },
      minimal: {
        colors: {
          primary: '#000000',
          secondary: '#6b7280',
          accent: '#f3f4f6',
          background: '#ffffff',
          text: '#111827'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        spacing: 'minimal'
      }
    };
  }

  generateThemeCSS(themeType, brandConfig = {}) {
    const theme = this.themes[themeType] || this.themes.minimal;
    const colors = { ...theme.colors, ...brandConfig.colors };

    return `
/* Generated Theme: ${themeType} */
@import url('https://fonts.googleapis.com/css2?family=${theme.fonts.heading.replace(' ', '+')}:wght@300;400;600;700&family=${theme.fonts.body.replace(' ', '+')}:wght@300;400;500;600&display=swap');

:root {
  /* Brand Colors */
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --background: ${colors.background};
  --text: ${colors.text};
  
  /* Extended Color Palette */
  --primary-50: ${this.lighten(colors.primary, 95)};
  --primary-100: ${this.lighten(colors.primary, 90)};
  --primary-200: ${this.lighten(colors.primary, 80)};
  --primary-300: ${this.lighten(colors.primary, 70)};
  --primary-400: ${this.lighten(colors.primary, 60)};
  --primary-500: ${colors.primary};
  --primary-600: ${this.darken(colors.primary, 10)};
  --primary-700: ${this.darken(colors.primary, 20)};
  --primary-800: ${this.darken(colors.primary, 30)};
  --primary-900: ${this.darken(colors.primary, 40)};
  
  /* Typography */
  --font-heading: '${theme.fonts.heading}', serif;
  --font-body: '${theme.fonts.body}', sans-serif;
  
  /* Spacing Scale */
  --spacing-xs: ${this.getSpacing(theme.spacing, 'xs')};
  --spacing-sm: ${this.getSpacing(theme.spacing, 'sm')};
  --spacing-md: ${this.getSpacing(theme.spacing, 'md')};
  --spacing-lg: ${this.getSpacing(theme.spacing, 'lg')};
  --spacing-xl: ${this.getSpacing(theme.spacing, 'xl')};
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
}

/* Dark mode variations */
.dark {
  --background: ${this.darken(colors.background, 90)};
  --text: ${colors.background};
  --primary: ${this.lighten(colors.primary, 10)};
}

/* Component Overrides */
.btn-primary {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.card {
  background: var(--background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  border: 1px solid rgb(0 0 0 / 0.05);
}

.heading-1 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
}

.heading-2 {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
}

.body-text {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
}

/* Animation Presets */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Responsive Utilities */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile-first responsive breakpoints */
@media (max-width: 768px) {
  .heading-1 { font-size: 2rem; }
  .heading-2 { font-size: 1.5rem; }
  .container { padding: 0 var(--spacing-sm); }
}
`;
  }

  lighten(color, percent) {
    // Convert hex to RGB, lighten, convert back
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const amount = Math.round(2.55 * percent);
    const newR = Math.min(255, r + amount);
    const newG = Math.min(255, g + amount);
    const newB = Math.min(255, b + amount);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  darken(color, percent) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const amount = Math.round(2.55 * percent);
    const newR = Math.max(0, r - amount);
    const newG = Math.max(0, g - amount);
    const newB = Math.max(0, b - amount);
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }

  getSpacing(type, size) {
    const spacings = {
      relaxed: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem' },
      comfortable: { xs: '0.5rem', sm: '0.75rem', md: '1.25rem', lg: '1.75rem', xl: '2.5rem' },
      tight: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem' },
      minimal: { xs: '0.125rem', sm: '0.25rem', md: '0.75rem', lg: '1.25rem', xl: '1.75rem' },
      modern: { xs: '0.375rem', sm: '0.625rem', md: '1.125rem', lg: '1.625rem', xl: '2.25rem' }
    };
    
    return spacings[type][size] || spacings.comfortable[size];
  }

  generateTailwindConfig(themeType, brandConfig = {}) {
    const theme = this.themes[themeType] || this.themes.minimal;
    
    return `
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './client/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '${theme.colors.primary}',
          secondary: '${theme.colors.secondary}',
          accent: '${theme.colors.accent}',
          background: '${theme.colors.background}',
          text: '${theme.colors.text}',
        },
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        }
      },
      fontFamily: {
        heading: ['${theme.fonts.heading}', 'serif'],
        body: ['${theme.fonts.body}', 'sans-serif'],
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;
`;
  }

  async generateThemeFiles(outputDir, themeType, brandConfig = {}) {
    // Create theme directory
    const themeDir = path.join(outputDir, 'styles', 'themes');
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }

    // Generate theme CSS
    const themeCSS = this.generateThemeCSS(themeType, brandConfig);
    fs.writeFileSync(path.join(themeDir, `${themeType}.css`), themeCSS);

    // Generate Tailwind config
    const tailwindConfig = this.generateTailwindConfig(themeType, brandConfig);
    fs.writeFileSync(path.join(outputDir, 'tailwind.config.ts'), tailwindConfig);

    // Generate theme manifest
    const themeManifest = {
      name: themeType,
      version: '1.0.0',
      description: `${themeType} theme for e-commerce template`,
      colors: this.themes[themeType].colors,
      fonts: this.themes[themeType].fonts,
      spacing: this.themes[themeType].spacing,
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(themeDir, 'manifest.json'),
      JSON.stringify(themeManifest, null, 2)
    );

    console.log(`✅ Theme '${themeType}' generated successfully!`);
    console.log(`📁 Files created in: ${themeDir}`);
  }
}

module.exports = ThemeGenerator;

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const themeType = args[0] || 'minimal';
  const outputDir = args[1] || './';

  const generator = new ThemeGenerator();
  generator.generateThemeFiles(outputDir, themeType)
    .then(() => {
      console.log('🎨 Theme generation complete!');
    })
    .catch(err => {
      console.error('❌ Error:', err.message);
      process.exit(1);
    });
}