import axios from "axios";
import { getAdminToken, removeAdminToken } from "../utils/local-storage";

// axios.defaults.baseURL = "https://group-project-car-rental-beckend.vercel.app/";

// axios.defaults.baseURL = "http://localhost:8888";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const adminToken = getAdminToken();
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
      config.headers.isActive = 1;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (value) => Promise.resolve(value),
  (err) => {
    if (err.response.status === 401) {
      removeAdminToken();
      window.location.assign("/login");
      return;
    }
    return Promise.reject(err);
  }
);

export default axios;
