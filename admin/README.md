# LoveLang Admin Panel

This is a standalone admin panel for the LoveLang e-commerce platform. It's completely separate from the main website and provides administrative functionality for managing the business.

## Features

- **Dashboard Overview**: Key metrics and statistics
- **Product Management**: Add, edit, and manage products
- **Order Management**: View and process customer orders
- **User Management**: Manage customer accounts and permissions
- **Real-time Data**: Connects to the same backend API as the main site

## Installation & Setup

1. **Standalone Deployment**: The admin panel is a single HTML file that can be deployed separately
2. **Security**: Can be hosted on a different domain/subdomain for better security
3. **Access Control**: Only admin users with proper credentials can access

## File Structure

```
admin/
├── index.html          # Main admin panel interface
├── README.md          # This documentation
└── assets/            # Static assets (if needed)
```

## Usage

1. Open `index.html` in a web browser
2. The panel will automatically connect to your backend API
3. Navigate between tabs to access different admin functions

## Security Considerations

- Host on a separate domain (e.g., admin.lovelang.com)
- Use HTTPS for all admin operations
- Implement IP whitelisting if needed
- Regular security audits

## API Integration

The admin panel connects to these API endpoints:

- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/orders` - Order management
- `GET /api/admin/products` - Product management
- `GET /api/admin/users` - User management

## Deployment Options

1. **Separate Server**: Host on a different server entirely
2. **Subdomain**: Use admin.yourdomain.com
3. **Protected Directory**: Use /admin with server-level protection
4. **CDN**: Deploy as static files with API proxy