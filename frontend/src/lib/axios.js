import axios from 'axios';

// Determine backend URL - use environment variable or fallback
const getBackendURL = () => {
  // In production, use the environment variable (should be Render URL)
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  
  // Development fallback
  const isDevelopment = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
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
console.log("🔧 Axios Configuration:", {
  "REACT_APP_BACKEND_URL": process.env.REACT_APP_BACKEND_URL,
  "Using URL": backendURL,
  "API Base URL": `${backendURL}/api`
});

const axiosInstance = axios.create({
    baseURL: `${backendURL}/api`,
    withCredentials: true,
  });

// Add request interceptor to include token in headers (fallback for production)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage on unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login
      if (window.location.pathname !== '/LoginPage') {
        window.location.href = '/LoginPage';
      }
    }
    return Promise.reject(error);
  }
);
  
export default axiosInstance