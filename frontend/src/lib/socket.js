import { io } from "socket.io-client";

const fallbackURL = "http://localhost:4000";
const backendURL = process.env.REACT_APP_BACKEND_URL || fallbackURL;

const socket = io(backendURL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

export default socket;
