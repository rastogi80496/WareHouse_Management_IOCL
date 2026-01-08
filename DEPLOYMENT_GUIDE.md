# 🚀 Deployment Guide - Vercel (Frontend) + Render (Backend)

This guide will help you deploy your Inventory Management System to production.

## 📋 Prerequisites

- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- MongoDB database (MongoDB Atlas recommended)

---

## 🔧 Backend Configuration (Render)

### Step 1: Environment Variables in Render

Go to your Render dashboard → Your Backend Service → Environment

Add these environment variables:

```env
PORT=10000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key

# Frontend URL (your Vercel URL)
FRONTEND_URL=https://your-app-name.vercel.app

# Allowed Origins (comma-separated)
ALLOWED_ORIGINS=https://your-app-name.vercel.app,http://localhost:3000
```

**Important Notes:**
- Replace `your-app-name.vercel.app` with your actual Vercel URL
- `ALLOWED_ORIGINS` should include both your Vercel URL and localhost (for testing)
- Use a strong `JWT_SECRET` (random string, at least 32 characters)

### Step 2: Build & Start Commands in Render

- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 3: Verify Backend is Running

After deployment, visit: `https://your-backend.onrender.com`

You should see: `🚀 Inventory Management Backend Running`

---

## 🎨 Frontend Configuration (Vercel)

### Step 1: Environment Variables in Vercel

Go to your Vercel dashboard → Your Project → Settings → Environment Variables

Add this environment variable:

```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

**Important:**
- Replace `your-backend.onrender.com` with your actual Render backend URL
- Make sure to add it for **Production**, **Preview**, and **Development** environments
- The URL should start with `https://` (not `http://`)

### Step 2: Deploy Settings in Vercel

- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### Step 3: Redeploy

After adding environment variables, you **must redeploy**:
1. Go to Deployments tab
2. Click the three dots (⋯) on the latest deployment
3. Click "Redeploy"

---

## ✅ Verification Checklist

### Backend (Render)
- [ ] Backend URL is accessible (shows "🚀 Inventory Management Backend Running")
- [ ] Environment variables are set correctly
- [ ] CORS allows your Vercel URL
- [ ] MongoDB connection is working

### Frontend (Vercel)
- [ ] `REACT_APP_BACKEND_URL` is set to your Render backend URL
- [ ] Frontend has been redeployed after setting environment variables
- [ ] Browser console shows correct backend URL in logs

### Testing
- [ ] Can access login page
- [ ] Can successfully login
- [ ] Can navigate to other pages after login
- [ ] No CORS errors in browser console
- [ ] No network errors in browser console

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to server" or Network Error

**Causes:**
1. Backend URL not set in Vercel environment variables
2. Backend not running on Render
3. CORS not configured correctly

**Solutions:**
1. Verify `REACT_APP_BACKEND_URL` in Vercel matches your Render backend URL
2. Check Render logs to ensure backend is running
3. Verify `ALLOWED_ORIGINS` in Render includes your Vercel URL
4. Redeploy frontend after changing environment variables

### Issue: "Unauthorized" or Login Fails

**Causes:**
1. Cookies not being sent (CORS issue)
2. Token not being generated correctly
3. JWT_SECRET mismatch

**Solutions:**
1. Check browser DevTools → Application → Cookies
2. Verify `withCredentials: true` is set (already in code)
3. Check Render logs for token generation errors
4. Verify `JWT_SECRET` is set in Render

### Issue: CORS Errors in Browser Console

**Causes:**
1. Backend CORS not allowing your Vercel origin
2. `ALLOWED_ORIGINS` not set correctly

**Solutions:**
1. Add your Vercel URL to `ALLOWED_ORIGINS` in Render
2. Format: `https://your-app.vercel.app,http://localhost:3000`
3. Redeploy backend after changing environment variables

### Issue: Socket.io Connection Fails

**Causes:**
1. Backend URL incorrect
2. CORS blocking WebSocket connection

**Solutions:**
1. Verify `REACT_APP_BACKEND_URL` is correct
2. Check Socket.io CORS configuration in backend
3. Check browser console for specific error messages

---

## 📝 Environment Variables Summary

### Render (Backend)
```env
PORT=10000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:3000
```

### Vercel (Frontend)
```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

## 🔄 After Making Changes

1. **Backend Changes:**
   - Update code
   - Push to GitHub
   - Render auto-deploys
   - Verify environment variables are still set

2. **Frontend Changes:**
   - Update code
   - Push to GitHub
   - Vercel auto-deploys
   - **Important:** If you change environment variables, manually redeploy

---

## 🆘 Still Having Issues?

1. Check browser console for specific error messages
2. Check Render logs for backend errors
3. Check Vercel deployment logs
4. Verify all environment variables are set correctly
5. Ensure both services are deployed and running
6. Test backend URL directly in browser
7. Test API endpoints using Postman or curl

---

## 📞 Quick Debugging Commands

### Test Backend API
```bash
curl https://your-backend.onrender.com
# Should return: 🚀 Inventory Management Backend Running
```

### Test CORS
```bash
curl -H "Origin: https://your-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-backend.onrender.com/api/auth/login
```

---

## ✨ Best Practices

1. **Never commit `.env` files** - Use environment variables in deployment platforms
2. **Use HTTPS** - Both Vercel and Render provide HTTPS by default
3. **Strong JWT Secret** - Use a long, random string for production
4. **Monitor Logs** - Regularly check Render and Vercel logs
5. **Test After Deployment** - Always test login and key features after deploying

---

Good luck with your deployment! 🚀
