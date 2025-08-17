import axios from "axios";

const BASE_URL = "https://api.integrador.dev/api";

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10 segundos de timeout
});

customAxios.interceptors.request.use(
  (config) => {
    const getTokenFromCookie = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
          return value;
        }
      }
      return null;
    };

    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores de autenticación
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expirado o inválido. Limpiando sesión...");
      localStorage.removeItem("idUsuario");
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("userData");
      
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    
    return Promise.reject(error);
  }
);

export default customAxios;