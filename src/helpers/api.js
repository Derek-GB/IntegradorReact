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

// -------------------- APIs --------------------

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
  },
  getByUsuario: async (idUsuario) => {
    try {
      const url = `/productos/consulta/porUsuario/${encodeURIComponent(idUsuario)}`;
      console.log("📦 Consultando productos por usuario:", url);
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
  egresar: async (payload) => {
    try {
      const data = {
        id: payload.id,
        idModificacion: Number(payload.idModificacion)
      };
      const res = await customAxios.put(`/familias/egreso`, data);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
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
  getByUsuario: async (idUsuario) => {
    try {
      const res = await customAxios.get(`/familias/consulta/porUsuario/${encodeURIComponent(idUsuario)}`);
      return res.data;
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
      const res = await customAxios.get(`/albergues/consulta/nombre/${encodeURIComponent(nombre)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByDistrito: async (distrito) => {
    try {
      const res = await customAxios.get(`/albergues/consulta/distrito/${encodeURIComponent(distrito)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByCanton: async (canton) => {
    try {
      const res = await customAxios.get(`/albergues/consulta/canton/${encodeURIComponent(canton)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByProvincia: async (provincia) => {
    try {
      const res = await customAxios.get(`/albergues/consulta/provincia/${encodeURIComponent(provincia)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByColor: async (color) => {
    try {
      if (!color || color.trim() === "") {
        throw new Error("Color del albergue es requerido");
      }
      const colorNormalized = color.trim().toLowerCase();
      const url = `/albergues/resumen/color/${encodeURIComponent(colorNormalized)}`;
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByUsuario: async (idUsuario) => {
    try {
      const url = `/albergues/consulta/porUsuario/${encodeURIComponent(idUsuario)}`;
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },

  // ---- UPDATE CORREGIDO SEGÚN DOCUMENTACIÓN ----
  update: async (albergue) => {
    if (!albergue || !albergue.id) {
      throw new Error("ID del albergue es requerido");
    }
    try {
      const payload = {
        id: albergue.id,
        condicionAlbergue: albergue.condicionAlbergue,
        especificacion: albergue.especificacion,
        detalleCondicion: albergue.detalleCondicion,
        administrador: albergue.administrador,
        telefono: albergue.telefono,
        idCapacidad: albergue.idCapacidad,
        seccion: albergue.seccion,
        requerimientosTecnicos: albergue.requerimientosTecnicos,
        costoRequerimientosTecnicos: albergue.costoRequerimientosTecnicos,
        idInfraestructura: albergue.idInfraestructura,
        color: albergue.color,
        idUsuarioModificacion: albergue.idUsuarioModificacion,
      };
      const res = await customAxios.put(`/albergues/${albergue.id}`, payload);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// -------------------- El resto de las APIs --------------------
// Personas, inventario, municipalidad, capacidades, ubicaciones, etc.
// Mantener todo como estaba, no modificado, tal como en tu archivo original

export const personasAPI = {
  ...createApiMethods("personas"),
  getPorDiscapacidad: async (idDiscapacidad) => {
    try {
      const url = `/personas/resumen/discapacidad/${encodeURIComponent(idDiscapacidad)}`;
      const response = await customAxios.get(url);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  getByUsuario: async (idUsuario) => {
    try {
      const url = `/personas/user/${encodeURIComponent(idUsuario)}`;
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getResumenPorCondiciones: async (idCondicion) => {
    if (!idCondicion) throw new Error("ID Condicion es requerido");
    try {
      const url = `/personas/resumen/condicion/${encodeURIComponent(idCondicion)}`;
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getResumenPorAlbergue: async (nombreAlbergue) => {
    if (!nombreAlbergue || nombreAlbergue.toString().trim() === "") {
      throw new Error("El nombre del albergue es requerido");
    }
    const url = `/personas/resumen/porAlbergue/${encodeURIComponent(nombreAlbergue)}`;
    const res = await customAxios.get(url);
    return res.data?.data ?? res.data;
  },
  getResumenPorSexoYAlbergue: async (sexo, idAlbergue) => {
    if (!sexo) throw new Error("Sexo es requerido");
    if (!idAlbergue) throw new Error("ID Albergue es requerido");
    try {
      const res = await customAxios.get(`/personas/resumen/sexo`, { params: { sexo, idAlbergue } });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
  getResumenPorEdadYAlbergue: async (idAlbergue, edadMin, edadMax) => {
    if (!idAlbergue) throw new Error("ID Albergue es requerido");
    if (edadMin === undefined || edadMax === undefined) throw new Error("Edad mínima y máxima son requeridas");
    try {
      const res = await customAxios.get(`/personas/resumen/edad`, { params: { idAlbergue, edadMin, edadMax } });
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// ---------------- API INVENTARIO ----------------
export const inventarioAPI = createApiMethods("inventario", {
  getSuministrosPorId: async (idSuministros) => {
    try {
      const res = await customAxios.get(`/inventario/resumen/suministros/${encodeURIComponent(idSuministros)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
});

// ---------------- DEMÁS APIS ----------------
export const municipalidadAPI = createApiMethods("municipalidad");
export const capacidadAlberguesAPI = createApiMethods("capacidadAlbergues");
export const ubicacionesAPI = createApiMethods("ubicaciones");
export const condicionesSaludAPI = createApiMethods("condicionesSalud");
export const recursosAsignadosAPI = createApiMethods("recursosAsignados");
export const caracteristicasPoblacionalesAPI = createApiMethods("caracteristicasPoblacionales");
export const firmasDigitalesAPI = createApiMethods("firmasDigitales");
export const infraestructuraAlberguesAPI = createApiMethods("infraestructuraAlbergues");
export const amenazasAPI = createApiMethods("amenazas");
export const categoriaConsumiblesAPI = createApiMethods("categoriaConsumibles");
export const consumiblesAPI = createApiMethods("consumibles");
export const detallePedidoConsumiblesAPI = createApiMethods("detallePedidoConsumibles");
export const pedidoConsumiblesAPI = createApiMethods("pedidoConsumibles", {
  getAllAbastecimientos: async () => {
    try {
      const res = await customAxios.get(`/pedidoConsumibles/all`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
});
export const unidadMedidasAPI = createApiMethods("unidadMedidas");
export const condicionesEspecialesAPI = createApiMethods("condicionesEspeciales");

// ---------------- API USUARIOS ----------------
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
  getAll: async () => {
    try {
      const res = await customAxios.get(`/usuarios/all`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
 delete: async (id) => {
  const res = await customAxios.delete(`/usuarios/${id}`);
  return res.data;
},
  getById: async (id) => {
    try {
      const res = await customAxios.get(`/usuarios/${id}`);
      return res.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("Usuario no encontrado.");
      }
      throw new Error("Error al buscar usuario por ID.");
    }
  }
});

// ---------------- APIs ADICIONALES ----------------
export const mascotasAPI = createApiMethods("mascotas");
export const referenciasAPI = createApiMethods("referencias");
export const ajusteInventarioAPI = createApiMethods("ajusteInventario");
