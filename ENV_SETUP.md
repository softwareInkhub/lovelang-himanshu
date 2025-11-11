# Environment Setup Guide

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration (REQUIRED)
# PostgreSQL connection string
# Example: postgresql://username:password@host:port/database
DATABASE_URL=postgresql://user:password@localhost:5432/langshop

# Session Configuration (REQUIRED)
# Secret key for session encryption
# Generate a random string: openssl rand -base64 32
SESSION_SECRET=your-super-secret-session-key-change-this

# Replit Authentication (REQUIRED for Replit deployment)
# Note: These are automatically provided by Replit environment
REPLIT_DOMAINS=your-replit-domain.repl.co
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc

# Development Settings
NODE_ENV=development
```

## Setup Instructions

### For Replit Deployment (Recommended)

1. Fork/Import this project to Replit
2. The following environment variables will be automatically set:
   - `REPLIT_DOMAINS`
   - `REPL_ID`
3. Add the following secrets in Replit Secrets:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `SESSION_SECRET` - Generate with `openssl rand -base64 32`

4. Run database migrations:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### For Local Development (Windows)

⚠️ **Important**: This project uses Replit-specific authentication which will not work in local development without modifications.

#### Option 1: Mock Authentication (Recommended for local dev)

You'll need to modify the authentication system to work locally. Consider:
- Using a local authentication strategy (passport-local)
- Disabling authentication for development
- Using environment variable flags to switch between Replit Auth and local auth

#### Option 2: Skip Authentication Routes

1. Comment out authentication requirements in `server/replitAuth.ts`
2. Set placeholder environment variables:
   ```env
   REPLIT_DOMAINS=localhost:5000
   REPL_ID=local-dev
   ```

### Database Setup

1. **Install PostgreSQL** locally or use a cloud service like:
   - [Neon](https://neon.tech) (Recommended - serverless PostgreSQL)
   - [Supabase](https://supabase.com)
   - Local PostgreSQL installation

2. **Create a database**:
   ```sql
   CREATE DATABASE langshop;
   ```

3. **Get your connection string**:
   ```
   postgresql://username:password@host:port/langshop
   ```

4. **Add to `.env` file**:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/langshop
   ```

5. **Run migrations**:
   ```bash
   npm run db:push
   ```

## Known Issues

### Windows PowerShell Compatibility ✅ FIXED
- **Issue**: `NODE_ENV` environment variable syntax doesn't work on Windows
- **Solution**: Updated to use `cross-env` package

### Authentication Issues ⚠️
- **Issue**: Replit-specific OAuth authentication won't work outside Replit
- **Impact**: Cannot authenticate users locally
- **Workaround**: 
  1. Comment out authentication middleware for local development
  2. Or implement fallback local authentication strategy

### Missing Environment Variables
- **Issue**: Project crashes if environment variables are not set
- **Solution**: Create `.env` file with all required variables (see template above)

## Troubleshooting

### "Environment variable REPLIT_DOMAINS not provided"
- You're running outside of Replit
- Add placeholder values to `.env` or modify `server/replitAuth.ts` to handle local development

### "DATABASE_URL must be set"
- Create a `.env` file with your database connection string
- Ensure PostgreSQL is running and accessible

### "'NODE_ENV' is not recognized as an internal or external command"
- This should be fixed now with `cross-env`
- If still occurring, ensure `cross-env` is installed: `npm install cross-env --save-dev`

### "Sessions table does not exist"
- Run database migrations: `npm run db:push`
- Ensure DATABASE_URL is correct

## Security Notes

⚠️ **Never commit the `.env` file to version control!**

The `.gitignore` file has been updated to exclude:
- `.env`
- `.env.local`
- `.env.*.local`

Always keep your `DATABASE_URL` and `SESSION_SECRET` private.

