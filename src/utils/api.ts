import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7002/api/',
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(function (config) {

    const token = localStorage.getItem("token"); // Get token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response?.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        localStorage.removeItem("token"); // Remove invalid token
        window.location.href = "/login"; // Redirect to login page
      }
    return Promise.reject(error);
  });

export default api;