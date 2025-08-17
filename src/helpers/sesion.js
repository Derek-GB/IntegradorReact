import axios from "axios";

const login = async (correo, contrasena) => {
  try {
    
    const res = await axios.post("https://api.integrador.dev/api/auth/login", {
      correo,
      contrasena,
    }, {
      withCredentials: true 
    });

    if (!res.data.success) {
      throw new Error(res.data.error || "Error en el login");
    }

    const { token, usuario } = res.data;
    
    if (!usuario) {
      throw new Error("No se recibió información de usuario");
    }
    if (!usuario.id) {
      throw new Error("No se recibió el ID del usuario");
    }
    if (!token) {
      throw new Error("No se recibió un token de autenticación");
    }

    localStorage.setItem("idUsuario", usuario.id);
    localStorage.setItem("nombreUsuario", usuario.nombreUsuario || "");
    localStorage.setItem("userData", JSON.stringify({
      username: correo,
      nombre: usuario.nombreUsuario || correo
    }));

    return res.data;

  } catch (err) {
    console.error("Error al iniciar sesión:", err.response?.data?.error || err.message);
    throw new Error(err.response?.data?.error || err.message);
  }
};

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

const logout = async () => {
  try {
    await axios.post("https://api.integrador.dev/api/auth/logout", {}, {
      withCredentials: true 
    });
    localStorage.clear();
    console.log("Sesión cerrada correctamente");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.response?.data?.error || error.message);
    localStorage.clear();
  }
};

export default { 
  login, 
  logout, 
  getTokenFromCookie
};