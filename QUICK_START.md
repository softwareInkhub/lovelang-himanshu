# 🚀 Quick Start Guide (Windows)

## ✅ Server is Running!

Your LangShop2 server is now running successfully!

### 🌐 Access the Application

Open your browser and go to:

**Primary URL**: http://localhost:5000

**Alternative**: http://127.0.0.1:5000

---

## 📋 Current Status

✅ **Windows Compatibility** - Fixed with `cross-env`  
✅ **Server Running** - Port 5000 on 127.0.0.1  
⚠️ **Authentication** - Disabled for local development  
⚠️ **Database** - Running without database (features that need DB won't work)  

---

## ⚠️ Known Limitations

### Features That Work:
- ✅ Home page / Product browsing
- ✅ Product detail pages
- ✅ Shopping cart (stored in browser)
- ✅ Product collections
- ✅ Page builder
- ✅ Static content

### Features That DON'T Work (Need Database):
- ❌ User authentication/login
- ❌ Saving user data
- ❌ Order history
- ❌ User profiles

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal

---

## 🔄 To Restart

```powershell
npm run dev
```

---

## 🗄️ To Enable Full Features (With Database)

### Option 1: Free Cloud Database (Recommended)

1. **Sign up for Neon** (Free PostgreSQL): https://neon.tech

2. **Get your connection string**:
   - Create a new project
   - Copy the connection string
   - Format: `postgresql://user:pass@host/database`

3. **Update your `.env` file**:
   ```env
   DATABASE_URL=your-neon-connection-string-here
   ```

4. **Run database migrations**:
   ```powershell
   npm run db:push
   ```

5. **Restart the server**:
   ```powershell
   npm run dev
   ```

### Option 2: Local PostgreSQL

1. **Install PostgreSQL** on Windows
2. **Create database**: `CREATE DATABASE langshop;`
3. **Update `.env`** with your local connection string
4. **Run migrations**: `npm run db:push`
5. **Restart**: `npm run dev`

---

## 🐛 Troubleshooting

### "Port 5000 already in use"
Stop any other application using port 5000, or kill the process:
```powershell
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

### "Cannot GET /"
Wait 10-15 seconds for Vite to compile, then refresh the browser.

### "Module not found" errors
Clean install:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Page shows blank/white screen
Check browser console (F12) for errors. Vite might still be compiling.

---

## 🎨 Page Builder

Access the page builder at: http://localhost:5000/builder

You can create custom sections and export templates!

---

## 📱 Test on Mobile (Same Network)

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address"

2. On your phone browser, go to:
   ```
   http://YOUR_IP_ADDRESS:5000
   ```

---

## ✨ You're All Set!

The server is running in **development mode** with:
- Hot reload enabled
- Authentication bypassed for local testing
- Memory-based sessions (no database required)

Enjoy building! 🎉

