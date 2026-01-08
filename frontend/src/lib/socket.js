import { io } from "socket.io-client";

const fallbackURL = "http://localhost:4000";
// Force port 4000 - React caches env vars, so we ensure correct port
let backendURL = process.env.REACT_APP_BACKEND_URL || fallbackURL;

// Safety check: if somehow port 5000 is set, override it to 4000
if (backendURL.includes(':5000')) {
  console.warn("⚠️ Detected port 5000, forcing to 4000. Please restart your React dev server!");
  backendURL = backendURL.replace(':5000', ':4000');
}

// Debug: Log the backend URL being used
console.log("🔧 Socket Configuration:", {
  "REACT_APP_BACKEND_URL": process.env.REACT_APP_BACKEND_URL,
  "Using URL": backendURL,
  "Fallback": fallbackURL
});

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
