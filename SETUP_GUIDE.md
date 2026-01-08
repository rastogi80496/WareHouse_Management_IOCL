# Setup Guide - Fixing Connection Issues

## 🔧 Quick Fix for Port Mismatch

### Problem
- Backend defaults to port **4000**
- Frontend defaults to port **4000**
- If you see errors connecting to port **5000**, there's a configuration mismatch

### Solution

#### Option 1: Use Port 4000 (Recommended)

**Backend (.env file in `/backend` directory):**
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env file in `/frontend` directory):**
```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

#### Option 2: Use Port 5000

**Backend (.env file in `/backend` directory):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env file in `/frontend` directory):**
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 🚀 Running the Application

### 1. Start Backend
```bash
cd backend
npm install
npm start
```

You should see:
```
Server running on port 4000
Allowed Frontend: http://localhost:3000
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm start
```

The frontend will open at `http://localhost:3000`

## ✅ Verification

1. **Check Backend is Running:**
   - Open `http://localhost:4000` in browser
   - Should see: "🚀 Inventory Management Backend Running"

2. **Check Frontend Connection:**
   - Open browser console (F12)
   - Look for: "Socket connected successfully to: http://localhost:4000"
   - If you see connection errors, verify the backend is running

## 🐛 Troubleshooting

### Network Error on Login
- **Cause:** Backend server is not running
- **Fix:** Start the backend server first

### WebSocket Connection Failed
- **Cause:** Backend URL mismatch or backend not running
- **Fix:** 
  1. Check backend is running on the correct port
  2. Verify `REACT_APP_BACKEND_URL` in frontend `.env` matches backend port
  3. Restart frontend after changing `.env` file

### Port Already in Use
- **Cause:** Another process is using the port
- **Fix:** 
  ```bash
  # Find and kill process on port 4000
  lsof -ti:4000 | xargs kill -9
  
  # Or use a different port in .env
  ```

## 📝 Important Notes

- **Always restart the frontend** after changing `.env` file
- **Backend must be running** before frontend can connect
- **Port numbers must match** between backend and frontend configuration
- Socket connections will fail if backend is not accessible
