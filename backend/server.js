require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

//DATABASE CONFIG
const { MongoDBconfig } = require("./libs/mongoconfig");


//ROUTERS
const authrouter = require("./Routers/authRouther");
const productrouter = require("./Routers/ProductRouter");
const orderrouter = require("./Routers/orderRouter");
const categoryrouter = require("./Routers/categoryRouter");
const notificationrouter = require("./Routers/notificationRouters");
const activityrouter = require("./Routers/activityRouter");
const inventoryrouter = require("./Routers/inventoryRouter");
const salesrouter = require("./Routers/salesRouter");
const supplierrouter = require("./Routers/supplierrouter");
const stocktransactionrouter = require("./Routers/stocktransactionrouter");

//ENV VARIABLES
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";


//APP & SERVER
const app = express();
const server = http.createServer(app);


//SOCKET.IO CONFIG
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});


//SOCKET EVENTS
/*
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
*/
// MIDDLEWARES
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Make io available inside routes/controllers
app.set("io", io);

/* ROUTES */
app.use("/api/auth", authrouter);
app.use("/api/product", productrouter);
app.use("/api/order", orderrouter);
app.use("/api/category", categoryrouter);
app.use("/api/notification", notificationrouter);
app.use("/api/activitylogs", activityrouter(app));
app.use("/api/inventory", inventoryrouter);
app.use("/api/sales", salesrouter);
app.use("/api/supplier", supplierrouter);
app.use("/api/stocktransaction", stocktransactionrouter);

/* DEFAULT ROUTE */
app.get("/", (req, res) => {
  res.send("🚀 Inventory Management Backend Running");
});


/* START SERVER */
server.listen(PORT, async () => {
  await MongoDBconfig();
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed Frontend: ${FRONTEND_URL}`);
});

// Handle server errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please either:`);
    console.error(`   1. Kill the process using port ${PORT}`);
    console.error(`   2. Set a different PORT in your .env file`);
    console.error(`\nTo find and kill the process, run: lsof -ti:${PORT} | xargs kill -9`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

module.exports = { io, server };
