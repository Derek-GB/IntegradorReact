import axios from "axios";

const login = async (email, password) => {
  try {
    const res = await axios.post("https://apiintegrador-production-8ef8.up.railway.app/api/auth/login", {
      email,
      password,
    });

    const { token } = res.data;
    localStorage.setItem("token", token); // ahora se usará en todas las peticiones
  } catch (err) {
    console.error("Error al iniciar sesión", err.message);
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export default { login, logout };