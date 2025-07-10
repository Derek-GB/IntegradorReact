import axios from "axios";

const login = async (correo, contrasena) => {
  try {
    const res = await axios.post("https://apiintegrador-production-8ef8.up.railway.app/api/auth/login", {
      correo,
      contrasena,
    });

    const { token } = res.data;
    if (!token){
      throw new Error("No se recibió un token de autenticación");
    } else {
    localStorage.setItem("token", token); // ahora se usará en todas las peticiones
    }
  } catch (err) {
    console.error("Error al iniciar sesión", err.message);
    throw err;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export default { login, logout };