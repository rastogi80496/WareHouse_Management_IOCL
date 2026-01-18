# 📦Smart Warehouse and  Inventory Management System (MERN Stack)

A full-stack Warehouse and Inventory Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to manage products, track stock levels, handle sales and orders, update in real-time using WebSockets, and maintain user profiles.

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

-----


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

Aditya Shivam Rastogi 

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting
- All open-source contributors

---

## 📞 Support

For support, email adityarastogi929@gmail.com or create an issue in the repository.

---

**Happy Coding! 🎉**


