# LoveLang E-commerce Platform

A modern, full-stack e-commerce platform specializing in fruit-powered, science-backed hair care products. Built with React, TypeScript, and Express.js.

## 🌟 Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse premium hair care products organized by hair concerns
- **Smart Categorization**: Products organized by fruit collections (Mango, Peach, Avocado)
- **Dynamic Pricing**: Size-based pricing with quantity calculations
- **Shopping Cart**: Persistent cart with size selection and quantity management
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Complete order flow with user authentication

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Modern Components**: Built with shadcn/ui and Radix UI primitives
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

### 🔐 Authentication
- **User Management**: Complete authentication system with Replit Auth
- **Protected Routes**: Secure checkout process requiring login
- **Session Management**: Persistent user sessions with PostgreSQL storage

### 📱 Mobile Optimization
- **Touch-Friendly**: Optimized for mobile interactions
- **Horizontal Scrolling**: Smooth scrolling sections on mobile
- **Responsive Images**: Optimized image loading and display

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **Wouter** for client-side routing
- **Zustand** for state management
- **TanStack Query** for data fetching
- **Framer Motion** for animations
- **React Hook Form** for form handling

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Session-based authentication**
- **Hot reload** development setup

### UI Components
- **shadcn/ui** component library
- **Radix UI** primitives
- **Lucide React** icons
- **Custom components** for e-commerce features

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/softwareInkhub/LangShop.git
   cd LangShop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 📦 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── replitAuth.ts      # Authentication setup
├── shared/                # Shared TypeScript types
│   └── schema.ts          # Database schema
└── attached_assets/       # Project assets and images
```

## 🎯 Key Features Implemented

### Product Management
- **Authentic LoveLang Mapping**: Avocado (damaged hair), Mango (frizzy hair), Peach (hair fall)
- **Dynamic Pricing**: Size-based pricing (250ml: ₹545, 500ml: ₹981)
- **Quantity Calculations**: Real-time total calculations with size selection
- **Product Filtering**: Category-based filtering with smooth transitions

### Shopping Cart
- **Persistent Storage**: Cart persists across browser sessions
- **Size Selection**: Support for different product sizes
- **Quantity Management**: Add, remove, and update quantities
- **Real-time Totals**: Instant price calculations

### User Experience
- **Responsive Design**: Works seamlessly on all devices
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error states
- **Toast Notifications**: User feedback for actions

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Database Migration
```bash
npm run db:push
```

The application is optimized for deployment on platforms like Replit, Vercel, or Heroku.

## 📸 Screenshots

[Add screenshots of your application here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- LoveLang brand for product inspiration
- shadcn/ui for beautiful UI components
- Replit for development platform
- All contributors and testers

## 📞 Support

For support, email support@lovelang.com or join our community discussions.

---

**Built with ❤️ for beautiful, healthy hair care**