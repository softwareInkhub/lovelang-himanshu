# LoveLang E-commerce Platform

## Overview

LoveLang is a modern e-commerce platform specializing in fruit-powered, science-backed hair care products. The application features a comprehensive product catalog, shopping cart functionality, and a complete checkout process. It's built as a full-stack web application with a React frontend and Express backend, designed to showcase premium hair care products with an emphasis on natural ingredients and scientific backing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: Zustand for cart management with persistence
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and animations
- **Build Tool**: Vite for development and production builds
- **Data Fetching**: TanStack Query for API state management

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (configured for PostgreSQL)
- **Session Management**: PostgreSQL session store
- **Development**: Hot reload with Vite integration
- **Build**: esbuild for production bundling

## Key Components

### Product Management
- Static product data stored in JSON files for development
- Product catalog with categories (Frizzy Hair, Hair Fall, Damaged Hair)
- Product detail pages with image galleries, ratings, and reviews
- Search and filtering capabilities

### Shopping Cart
- Persistent cart state using Zustand with localStorage
- Side drawer cart interface
- Quantity management and item removal
- Real-time total calculation

### User Interface
- Responsive design with mobile-first approach
- Modern component library (shadcn/ui) with Radix UI primitives
- Dark mode support (configured but not actively used)
- Accessibility-focused components

### Content Management
- Static content for testimonials and product information
- Image optimization and lazy loading
- SEO-optimized pages with proper meta tags

## Data Flow

### Client-Side Flow
1. User browses products on the home page
2. Product data is loaded from static JSON files
3. Cart interactions are managed through Zustand store
4. State persists across browser sessions
5. Checkout process collects user information
6. Order confirmation displayed after successful submission

### Server-Side Flow
1. Express server handles API routes (currently minimal)
2. Database operations use Drizzle ORM with PostgreSQL
3. Session management for user authentication (prepared but not implemented)
4. Static file serving for production builds

## External Dependencies

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI for accessible component primitives
- Framer Motion for animations
- Lucide React for icons
- shadcn/ui for pre-built components

### State Management and Data
- Zustand for client-side state management
- TanStack Query for server state management
- React Hook Form for form handling
- Zod for schema validation

### Development Tools
- TypeScript for type safety
- Vite for development and building
- PostCSS for CSS processing
- ESLint and Prettier (configured)

## Deployment Strategy

### Development
- Vite dev server for frontend development
- Express server with hot reload
- Database migrations using Drizzle Kit
- Environment variables for database configuration

### Production
- Vite builds static assets to `dist/public`
- Express server bundles to `dist/index.js`
- Database deployment to Neon PostgreSQL
- Static asset serving through Express

### Build Process
1. Frontend builds with Vite (React → static files)
2. Backend builds with esbuild (TypeScript → JavaScript)
3. Database schema pushed using Drizzle Kit
4. Single deployment artifact with both frontend and backend

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and a focus on user experience with smooth animations and responsive design.

## Recent Changes: Latest modifications with dates

### January 10, 2025 - Authentic LoveLang Image Integration & Dynamic Banner
- **Image Management System**: Created centralized image URL management in `/client/src/data/image-urls.ts`
- **Authentic Product Images**: Integrated 30+ high-quality LoveLang product images across all components
- **Dynamic Banner Carousel**: NEW - Created moveable banner with 3 stunning LoveLang hero images
  - "skinification of hair care" banner with auto-play/pause functionality
  - "powered by fruit, backed by science" promotional banner
  - "your hair's love language" brand messaging banner
  - Smooth slide transitions with navigation controls and progress bar
- **Product Categories**: Updated with real collection thumbnails (Mango, Peach, Avocado)
- **Featured Collections**: Redesigned to horizontal layout for better user experience
- **Brand Badges**: Added quality certification badges (FDCA, Vegan, Cruelty-Free, Vitamin Infused)
- **Product Showcase**: New component featuring the 4:5 aspect ratio premium product images
- **Product Highlights**: Additional section showcasing the specific high-quality images provided
- **Testimonials**: Updated with real customer photos from LoveLang
- **Before/After**: Enhanced with authentic product comparison images
- **Best Sellers**: Products now use real LoveLang product photography
- **Performance**: Implemented responsive image optimization with dynamic sizing
- **Horizontal Scrolling**: Added mobile/tablet horizontal scrolling for key sections (Choose Your Love Language, Featured Collections, Best Sellers, Key Ingredients, Testimonials)
- **Enhanced responsive design with mobile-first approach while preserving desktop layouts
- **Documentation**: Created comprehensive image usage guide in README-IMAGES.md

### January 10, 2025 - User Authentication System Implementation
- **Database Integration**: Implemented PostgreSQL database with Drizzle ORM for user and session management
- **Replit Auth Integration**: Added complete OpenID Connect authentication using Replit as auth provider
- **Protected Checkout**: Users must be logged in to complete purchases - checkout redirects to login if unauthenticated
- **Authentication UI Components**: 
  - Login button with redirect to Replit auth
  - User profile dropdown with avatar, user info, and logout functionality
  - Authentication state management throughout the app
- **Cart Protection**: Cart drawer shows login requirement for unauthenticated users
- **Database Schema**: Users and sessions tables with proper indexing and relationships
- **Security**: Session-based authentication with PostgreSQL session store and proper token refresh
- **User Experience**: Form pre-filling with authenticated user data, loading states, and error handling

### January 10, 2025 - Floating Action Buttons & Wishlist System
- **Floating Actions**: Created beautiful floating action buttons with expandable cart and wishlist access
  - Gradient background with smooth animations and hover effects
  - Cart and wishlist buttons with item count badges
  - Smooth expand/collapse animations with staggered reveals
- **Wishlist Management**: Complete wishlist system with persistent storage
  - Heart buttons on product cards to add/remove from wishlist
  - Wishlist drawer with full product management
  - Add single items or all items to cart from wishlist
  - Real-time count updates and visual feedback
- **Enhanced UX**: Floating buttons provide quick access to cart and wishlist from any page
  - Always visible and easily accessible
  - Clean animations and professional design
  - Toast notifications for user feedback