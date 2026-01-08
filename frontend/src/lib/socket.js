import { io } from "socket.io-client";

// Determine backend URL - use environment variable or fallback
const getBackendURL = () => {
  // In production, use the environment variable (should be Render URL)
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // Development fallback
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isDevelopment ? "http://localhost:4000" : "";
};

const fallbackURL = "http://localhost:4000";
let backendURL = getBackendURL() || fallbackURL;

// Safety check: if somehow port 5000 is set, override it to 4000 (only in dev)
if (backendURL.includes(':5000') && backendURL.includes('localhost')) {
  console.warn("⚠️ Detected port 5000, forcing to 4000. Please restart your React dev server!");
  backendURL = backendURL.replace(':5000', ':4000');
}

// Debug: Log the backend URL being used
console.log("🔧 Socket Configuration:", {
  "REACT_APP_BACKEND_URL": process.env.REACT_APP_BACKEND_URL,
  "Using URL": backendURL,
  "Fallback": fallbackURL
});

// Create socket with polling as primary transport (more reliable for production)
// autoConnect: false - we'll connect manually when needed
const socket = io(backendURL, {
  withCredentials: true,
  transports: ["polling", "websocket"], // Polling first for better compatibility
  autoConnect: false, // Don't auto-connect - connect when needed
  reconnection: true,
  reconnectionDelay: 2000,
  reconnectionAttempts: 3,
  timeout: 10000,
});

// Handle connection errors gracefully (non-blocking)
socket.on("connect_error", (error) => {
  console.warn("Socket connection error (non-critical):", error.message);
  // Don't show error to user - socket is optional for real-time features
});

socket.on("connect", () => {
  console.log("✅ Socket connected successfully to:", backendURL);
});

socket.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    // Server disconnected, try to reconnect
    socket.connect();
  }
  console.warn("Socket disconnected:", reason);
});

// Only connect if we're not in a critical path (lazy connection)
// This prevents blocking the app if socket fails
if (typeof window !== 'undefined') {
  // Try to connect after a short delay (non-blocking)
  setTimeout(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, 1000);
}

export default socket;
