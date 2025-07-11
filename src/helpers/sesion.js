import axios from "axios";

const login = async (correo, contrasena) => {
  try {
    const res = await axios.post("https://apiintegrador-production-8ef8.up.railway.app/api/auth/login", {
      correo,
      contrasena,
    });

    const { token, usuario } = res.data;
    const { id } = usuario;
    if (!usuario) {
      throw new Error("No se recibió información de usuario");
    }
    if (!id) {
      throw new Error("No se recibió el ID del usuario");
    }
    if (!token) {
      throw new Error("No se recibió un token de autenticación");
    } else {
      localStorage.setItem("token", token); // ahora se usará en todas las peticiones
      localStorage.setItem("idUsuario", id);
    }
  } catch (err) {
    console.error("Error al iniciar sesión", err.message);
    throw err;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("idUsuario");
};

export default { login, logout };