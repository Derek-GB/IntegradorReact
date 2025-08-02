import axios from "axios";

const login = async (correo, contrasena) => {
  try {
    const res = await axios.post("https://apiintegrador-production-8ad3.up.railway.app/api/auth/login", {
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

const logout = async () => {
  localStorage.removeItem("token");
  if (!localStorage.getItem("idUsuario")) {
    console.warn("No se encontró un usuario autenticado para cerrar sesión");
    return;
  }
  axios.post("https://apiintegrador-production-8ef8.up.railway.app/api/auth/logout", {id: localStorage.getItem("idUsuario")})
    .then((response) => {
      console.log("Sesión cerrada correctamente", response.data);
    })
    .catch((error) => {
      console.error("Error al cerrar sesión", error);
    });
  localStorage.removeItem("idUsuario");
};

export default { login, logout };