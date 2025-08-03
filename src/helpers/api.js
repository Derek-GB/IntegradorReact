import customAxios from "./customAxios";

const handleError = (error) => {
  const apiMessage =
    error.response?.data?.message ||  // Mensaje principal del backend
    error.response?.data?.error ||    // Otro campo de error
    error.message ||                  // Mensaje genérico de Axios
    "Error desconocido";

  console.error("Detalles del error:", error.response?.data);

  throw new Error("Error al conectar con la API: " + apiMessage);
};

const defaultMethods = (endpoint) => ({
  getAll: async () => {
    try {
      const res = await customAxios.get(`/${endpoint}/all`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  getById: async (id) => {
    try {
      const res = await customAxios.get(`/${endpoint}/id/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  create: async (data) => {
    try {
      const res = await customAxios.post(`/${endpoint}`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  update: async (id, data) => {
    try {
      const res = await customAxios.put(`/${endpoint}/${id}`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  remove: async (id) => {
    try {
      const res = await customAxios.delete(`/${endpoint}/id/${id}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

const createApiMethods = (endpoint, extraMethods = {}) => {
  return {
    ...defaultMethods(endpoint),
    ...extraMethods,
  };
};

// Productos API con update personalizado (sin id en URL)
export const productosAPI = createApiMethods("productos", {
  update: async (data) => {
    try {
      const res = await customAxios.put(`/productos`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

// Familias API con consulta por identificación
export const familiasAPI = createApiMethods("familias", {
  getById: async (identificacion) => {
    try {
      const res = await customAxios.get(
        `/familias/consulta/familiaConJefe/${encodeURIComponent(identificacion)}`
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

// Albergues API con consultas específicas
export const alberguesAPI = createApiMethods("albergues", {
  getById: async (id) => {
    try {
      const res = await customAxios.get(`/albergues/consulta/id/${encodeURIComponent(id)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByNombre: async (nombre) => {
    try {
      const res = await customAxios.get(
        `/albergues/consulta/nombre/${encodeURIComponent(nombre)}`
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByDistrito: async (distrito) => {
    try {
      const res = await customAxios.get(
        `/albergues/consulta/distrito/${encodeURIComponent(distrito)}`
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByCanton: async (canton) => {
    try {
      const res = await customAxios.get(
        `/albergues/consulta/canton/${encodeURIComponent(canton)}`
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByProvincia: async (provincia) => {
    try {
      const res = await customAxios.get(
        `/albergues/consulta/provincia/${encodeURIComponent(provincia)}`
      );
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

// Otros APIs estándar sin modificaciones
export const municipalidadAPI = createApiMethods("municipalidad");
export const capacidadAlberguesAPI = createApiMethods("capacidadAlbergues");
export const ubicacionesAPI = createApiMethods("ubicaciones");
export const condicionesEspecialesAPI = createApiMethods("condicionesEspeciales");
export const referenciasAPI = createApiMethods("referencias");
export const personasAPI = createApiMethods("personas");
export const condicionesSaludAPI = createApiMethods("condicionesSalud");
export const recursosAsignadosAPI = createApiMethods("recursosAsignados");
export const caracteristicasPoblacionalesAPI = createApiMethods("caracteristicasPoblacionales");
export const firmasDigitalesAPI = createApiMethods("firmasDigitales");
export const infraestructuraAlberguesAPI = createApiMethods("infraestructuraAlbergues");
export const amenazasAPI = createApiMethods("amenazas");
export const mascotasAPI = createApiMethods("mascotas");
export const categoriaConsumiblesAPI = createApiMethods("categoriaConsumibles");

// Usuarios API con validación especial
export const usuariosAPI = createApiMethods("usuarios", {
  validarCorreo: async (correo) => {
    try {
      const res = await customAxios.post(`public/usuarios/validar/correo`, { correo });
      console.log(res);
      if (res.data.success==true) {
        return { existe: false };
      }
      return { existe: true };
    } catch (error) {
      if (error.response?.status === 400) {
        return { existe: true };
      } else if (error.response?.status === 500) {
        throw new Error("Error del servidor. Contacta al soporte.");
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error al validar el correo.");
      }
    }
  },
  updateContrasena: async (correo, nuevaContrasena) => {
    try {
      const res = await customAxios.put(`public/usuarios/contrasena`, { correo, nuevaContrasena });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});

// APIs estándar restantes
export const consumiblesAPI = createApiMethods("consumibles");
export const detallePedidoConsumiblesAPI = createApiMethods("detallePedidoConsumibles");
export const pedidoConsumiblesAPI = createApiMethods("pedidoConsumibles");
export const unidadMedidasAPI = createApiMethods("unidadMedidas");
export const ajusteInventarioAPI = createApiMethods("ajusteInventario");
