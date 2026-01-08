import axios from 'axios';

const fallbackURL = "http://localhost:4000";
// Force port 4000 - React caches env vars, so we ensure correct port
let backendURL = process.env.REACT_APP_BACKEND_URL || fallbackURL;

// Safety check: if somehow port 5000 is set, override it to 4000
if (backendURL.includes(':5000')) {
  console.warn("⚠️ Detected port 5000, forcing to 4000. Please restart your React dev server!");
  backendURL = backendURL.replace(':5000', ':4000');
}

// Debug: Log the backend URL being used
console.log("🔧 Axios Configuration:", {
  "REACT_APP_BACKEND_URL": process.env.REACT_APP_BACKEND_URL,
  "Using URL": backendURL,
  "API Base URL": `${backendURL}/api`
});

const axiosInstance = axios.create({
    baseURL: `${backendURL}/api`,
    withCredentials: true,
  });
  
export default axiosInstance