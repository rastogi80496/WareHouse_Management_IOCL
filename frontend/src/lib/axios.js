import axios from 'axios';

const fallbackURL = "http://localhost:4000";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL || fallbackURL}/api`,
    withCredentials: true,
  });
  
export default axiosInstance