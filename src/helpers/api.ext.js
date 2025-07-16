import customAxios from "./customAxios";

const handleError = (error) => {
  throw new Error("Error al conectar con la API: " + error.message);
};

const createApiMethods = (endpoint) => ({
  getById: async (id) => {
    try {
      const res = await customAxios.get(`/${endpoint}/id/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByNombre: async (nombre) => {
    try {
      const res = await customAxios.get(`/${endpoint}/nombre/${nombre}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByDistrito: async (distrito) => {
    try {
      const res = await customAxios.get(`/${endpoint}/distrito/${distrito}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

// Generar todas las rutas de la API
export const alberguesAPIExt = createApiMethods("albergues");