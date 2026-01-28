# 📦Smart Warehouse and  Inventory Management System (MERN Stack)

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

Aditya Shivam Rastogi / HITK

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting

---

## 📞 Support

For support, email adityarastogi929@gmail.com or create an issue in the repository.

---

**Happy Coding! 🎉**
