# 🔄 How to Fix Port 5000 Connection Issue

## The Problem
Your `.env` file is set to port 4000, but React is still trying to connect to port 5000. This is because **React caches environment variables when the dev server starts**.

## ✅ Solution: Complete Restart

### Step 1: Stop the Frontend Server
1. Go to the terminal where your frontend is running
2. Press `Ctrl + C` (or `Cmd + C` on Mac) to stop it completely
3. Wait until it's fully stopped

### Step 2: Clear React Cache
```bash
cd frontend
rm -rf node_modules/.cache
rm -rf build
```

### Step 3: Restart Frontend
```bash
npm start
```

### Step 4: Hard Refresh Browser
- **Chrome/Edge**: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- **Firefox**: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- Or open DevTools → Right-click refresh button → "Empty Cache and Hard Reload"

## 🔍 Verify It's Working

After restarting, check the browser console. You should see:
```
🔧 Socket Configuration: {REACT_APP_BACKEND_URL: "http://localhost:4000", Using URL: "http://localhost:4000", ...}
🔧 Axios Configuration: {REACT_APP_BACKEND_URL: "http://localhost:4000", Using URL: "http://localhost:4000", ...}
Socket connected successfully to: http://localhost:4000
```

If you still see port 5000, the server didn't restart properly. Try:
1. Close all terminal windows
2. Open a fresh terminal
3. Navigate to the frontend folder
4. Run `npm start` again

## ⚠️ Important Notes

- **Environment variables are loaded ONLY when React starts**
- **You MUST restart the dev server** after changing `.env` file
- **Browser cache** can also cause issues - always hard refresh
- The `.env` file must be in the `/frontend` directory (same level as `package.json`)
