import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});


// ===============================
// Attach JWT Token Automatically
// ===============================

API.interceptors.request.use(
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


// ===============================
// Handle Unauthorized Responses
// ===============================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {

      // Remove invalid auth data

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;