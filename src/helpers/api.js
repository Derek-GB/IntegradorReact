import customAxios from "./customAxios";

const handleError = (error) => {
  const apiMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
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

export const productosAPI = createApiMethods("productos", {
  update: async (data) => {
    try {
      const res = await customAxios.put(`/productos`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByFamilia: async (codigoFamilia) => {
    try {
      const url = `/productos/consulta/ProductosPorFamilia/${encodeURIComponent(codigoFamilia)}`;
      console.log("Llamando a:", url);
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
});

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
  // Nuevo método para obtener el autonumérico por cantón
 getNextNumero: async (canton) => {
    try {
      const res = await customAxios.get(
        `/familias/requerimiento/indentificador/${encodeURIComponent(canton)}`
      );
      return res.data.identificador; 
    } catch (error) {
      handleError(error);
    }
  },
});

export const alberguesAPI = {
  ...createApiMethods("albergues"),
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
  getByColor: async (color) => {
    try {
      const url = `/albergues/consulta/color/${encodeURIComponent(color)}`;
      console.log("URL llamada:", url);
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export const personasAPI = {
  ...createApiMethods("personas"),
  getDiscapacidadPorAlbergue: async (idAlbergue) => {
    try {
      const res = await customAxios.get(`/personas/discapacidad/id/${idAlbergue}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export const condicionesEspecialesAPI = {
  ...createApiMethods("condicionesEspeciales"),
  getResumenPorAlbergue: async (idAlbergue) => {
    try {
      const res = await customAxios.get(`/condicionesEspeciales/resumen/id/${idAlbergue}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export const inventarioAPI = createApiMethods("inventario", {
  getSuministrosPorAlbergue: async (idAlbergue) => {
    try {
      const res = await customAxios.get(`/inventario/resumen/id/${idAlbergue}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
});

export const municipalidadAPI = createApiMethods("municipalidad");
export const capacidadAlberguesAPI = createApiMethods("capacidadAlbergues");
export const ubicacionesAPI = createApiMethods("ubicaciones");
export const referenciasAPI = createApiMethods("referencias");
export const condicionesSaludAPI = createApiMethods("condicionesSalud");
export const recursosAsignadosAPI = createApiMethods("recursosAsignados");
export const caracteristicasPoblacionalesAPI = createApiMethods("caracteristicasPoblacionales");
export const firmasDigitalesAPI = createApiMethods("firmasDigitales");
export const infraestructuraAlberguesAPI = createApiMethods("infraestructuraAlbergues");
export const amenazasAPI = createApiMethods("amenazas");
//export const mascotasAPI = createApiMethods("mascotas");
export const categoriaConsumiblesAPI = createApiMethods("categoriaConsumibles");
export const consumiblesAPI = createApiMethods("consumibles");
export const detallePedidoConsumiblesAPI = createApiMethods("detallePedidoConsumibles");
export const pedidoConsumiblesAPI = createApiMethods("pedidoConsumibles");
export const unidadMedidasAPI = createApiMethods("unidadMedidas");
export const ajusteInventarioAPI = createApiMethods("ajusteInventario");

export const usuariosAPI = createApiMethods("usuarios", {
  validarCorreo: async (correo) => {
    try {
      const res = await customAxios.post(`public/usuarios/validar/correo`, { correo });
      if (res.data.success === true) {
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
export const mascotasAPI = {
  getByCodigoFamilia: async (codigoFamilia) => {
    try {
      const url = `/mascotas/consulta/familia/${encodeURIComponent(codigoFamilia)}`;
      const res = await customAxios.get(url);

      const mascotasFiltradas = res.data.data.map(mascota => ({
        codigoFamilia: mascota.codigoFamilia,
        nombreMascota: mascota.nombreMascota,
        tipo: mascota.tipo,
        tamaño: mascota.tamaño
      }));

      return {
        success: true,
        data: mascotasFiltradas,
        message: res.data.message
      };

    } catch (error) {
      console.error("Error al buscar mascotas:", error.response?.data || error);
      throw new Error(error.response?.data?.message || "Error en la búsqueda");
    }
  }
};
