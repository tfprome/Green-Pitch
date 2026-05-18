import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Use environment variable for backend URL
});

api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      let token=sessionStorage.getItem("token")
      if(token){
        sessionStorage.removeItem("token")
        window.location.href="/login";
      }
      
    }
    return Promise.reject(error);
  }
);

export default api;