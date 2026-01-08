import { io } from "socket.io-client";

const fallbackURL = "http://localhost:4000";
const backendURL = process.env.REACT_APP_BACKEND_URL || fallbackURL;

const socket = io(backendURL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

// Handle connection errors gracefully
socket.on("connect_error", (error) => {
  console.warn("Socket connection error:", error.message);
  console.warn("Backend URL:", backendURL);
  console.warn("Make sure the backend server is running on", backendURL);
});

socket.on("connect", () => {
  console.log("Socket connected successfully to:", backendURL);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected:", reason);
});

export default socket;
