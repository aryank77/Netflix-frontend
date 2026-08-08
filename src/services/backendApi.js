import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://netflix-backend-bkz0.onrender.com/api",
});

backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default backendApi;