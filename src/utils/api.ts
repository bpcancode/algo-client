import axios from "axios";

const api = axios.create({
    baseURL: 'https://know-ur-algo.onrender.com/api/',
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(function (config) {

    const token = localStorage.getItem("token"); 
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
        localStorage.removeItem("token"); 
        window.location.href = "/login";
      }
    return Promise.reject(error);
  });

export default api;