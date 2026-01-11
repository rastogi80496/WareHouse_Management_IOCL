# 📦 Inventory Management System (MERN Stack)

A full-stack Inventory Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to manage products, track stock levels, handle sales and orders, update in real-time using WebSockets, and maintain user profiles.

---

## 🚀 Features

### ✅ Core Functionalities
- 🔄 **Real-Time Data Sync** via WebSockets (Socket.IO)
- 📦 **Product Management**: Add, edit, delete, and view products with categories and stock tracking
- 🧾 **Order Management**: Create and manage customer orders
- 💰 **Sales Tracking**: View daily/weekly/monthly sales and revenue
- 📊 **Stock Monitoring**: Low-stock alerts, live inventory levels with automatic notification cleanup
- 👤 **User Profile Pages**: Update profile info, view activity and role
- 🔐 **Authentication & Authorization**: Secure login, JWT-based auth, admin vs staff roles
- 📈 **Dashboard Analytics**: Key performance indicators (KPIs), charts, and summaries
- 🔔 **Smart Notifications**: Automatic product shortage notifications that remove when stock is replenished

---

## 🧰 Tech Stack

| Tech             | Description                       |
|------------------|-----------------------------------|
| MongoDB          | NoSQL database                    |
| Express.js       | Backend framework for Node.js     |
| React.js         | Frontend UI library               |
| Node.js          | Backend runtime                   |
| Socket.IO        | Real-time communication           |
| Mongoose         | ODM for MongoDB                   |
| Redux Toolkit    | State management on frontend      |
| Tailwind CSS     | Modern, utility-first CSS         |
| JWT              | Authentication & session management |

---

## 📦 Local Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd IOCL-main-_Notification
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000

# Cloudinary (Optional - for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

---

## 🌐 Deployment Guide

This project is designed to be deployed with:
- **Backend**: Render (Web Service)
- **Frontend**: Vercel
- **Database**: MongoDB Atlas (recommended for production)

---

## 🔷 Backend Deployment on Render

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (replace `<password>` with your actual password)
5. Add your IP address to the whitelist (or use `0.0.0.0/0` for Render)

### Step 2: Deploy Backend on Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or login with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

3. **Configure the Service**
   - **Name**: `inventory-management-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install` (or leave empty, Render will auto-detect)
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add the following environment variables in Render:
   ```
   PORT=10000
   MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   JWT_SECRET=your_very_secure_jwt_secret_key_here
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ALLOWED_ORIGINS=https://your-frontend-app.vercel.app
   NODE_ENV=production
   
   # Optional - Cloudinary
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - Wait for deployment to complete (usually 2-5 minutes)
   - Copy your backend URL (e.g., `https://inventory-management-backend.onrender.com`)

### Step 3: Important Notes for Render

- Render free tier services **spin down after 15 minutes of inactivity**
- First request after spin-down may take 30-60 seconds (cold start)
- Consider upgrading to paid tier for always-on service
- Keep your service awake using a service like [UptimeRobot](https://uptimerobot.com) if needed

---

## ▲ Frontend Deployment on Vercel

### Step 1: Prepare Frontend

1. Ensure your frontend code is pushed to GitHub

2. Update backend URL references (if needed):
   - The frontend is already configured to use `REACT_APP_BACKEND_URL` environment variable

### Step 2: Deploy on Vercel

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or login with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project Settings**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables**
   Add the following environment variable:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-app.onrender.com
   ```
   **Important**: Replace `https://your-backend-app.onrender.com` with your actual Render backend URL

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your frontend
   - Wait for deployment to complete (usually 1-3 minutes)
   - Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 3: Update Backend CORS Settings

After getting your Vercel frontend URL, update your Render backend environment variables:

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update these variables:
   ```
   FRONTEND_URL=https://your-frontend-app.vercel.app
   ALLOWED_ORIGINS=https://your-frontend-app.vercel.app
   ```
5. Save and redeploy

---

## 🔧 Post-Deployment Checklist

- [ ] Backend deployed on Render and accessible
- [ ] Frontend deployed on Vercel and accessible
- [ ] MongoDB Atlas connection working
- [ ] Environment variables set correctly
- [ ] CORS configured properly (backend allows frontend origin)
- [ ] Test authentication (login/signup)
- [ ] Test Socket.IO real-time features
- [ ] Test file uploads (if using Cloudinary)
- [ ] Monitor logs for any errors

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
PORT=4000
MONGODB_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

---

## 🔍 Troubleshooting

### Backend Issues

1. **Connection Timeout on Render**
   - Render free tier has cold starts - first request takes time
   - Check if service is running in Render dashboard

2. **MongoDB Connection Failed**
   - Verify MongoDB Atlas IP whitelist includes Render's IPs
   - Check connection string format
   - Ensure database user has correct permissions

3. **CORS Errors**
   - Verify `ALLOWED_ORIGINS` includes your frontend URL
   - Check `FRONTEND_URL` is set correctly
   - Ensure no trailing slashes in URLs

### Frontend Issues

1. **API Calls Failing**
   - Verify `REACT_APP_BACKEND_URL` is set correctly
   - Check browser console for CORS errors
   - Ensure backend is running and accessible

2. **Socket.IO Not Connecting**
   - Check backend URL is correct
   - Verify Socket.IO is enabled on backend
   - Check browser console for connection errors

3. **Build Failures on Vercel**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

---

## 🚀 Quick Deploy Commands

### Local Development
```bash
# Backend
cd backend && npm install && npm start

# Frontend (in new terminal)
cd frontend && npm install && npm start
```

### Build for Production
```bash
# Frontend
cd frontend && npm run build
```

---

## 📚 Project Structure

```
IOCL-main-_Notification/
├── backend/
│   ├── controller/        # Route controllers
│   ├── models/            # Database models
│   ├── Routers/           # Express routes
│   ├── middleware/        # Custom middleware
│   ├── libs/              # Utility libraries
│   └── server.js          # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── Components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── features/      # Redux slices
│   │   ├── lib/           # Utilities
│   │   └── store/         # Redux store
│   └── public/            # Static files
│
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Your Name / Your Organization

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting
- All open-source contributors

---

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Coding! 🎉**
