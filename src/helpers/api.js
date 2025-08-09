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

  egresar: async (id, idModificacion) => {
    try {
      const res = await customAxios.put(`/familias/egreso`, {
        id,
        idModificacion
      });
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
    if (!color || color.trim() === "") {
      throw new Error("Color del albergue es requerido");
    }
    const colorNormalized = color.trim().toLowerCase();
    console.log("URL llamada con color:", colorNormalized);
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
      console.log("📥 Consultando albergues por usuario:", url);
      const res = await customAxios.get(url);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  }
};

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
      console.log("📥 Consultando personas por usuario:", url);
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

 getResumenPorAlbergue: async (idAlberguePersona) => {
    if (!idAlberguePersona || idAlberguePersona.toString().trim() === "") {
      throw new Error("El idAlberguePersona es requerido");
    }
    const url = `/personas/resumen/porAlbergue/${encodeURIComponent(idAlberguePersona)}`;
    const res = await customAxios.get(url);
    return res.data;  
  },
   getResumenPorSexo: async (idSexoPersona) => {
    if (!idSexoPersona) throw new Error("ID Sexo Persona es requerido");
    try {
      const res = await customAxios.get(`/personas/resumen/sexo/${encodeURIComponent(idSexoPersona)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
 getResumenPorEdad: async (idEdadPersona) => {
    if (!idEdadPersona) throw new Error("ID Edad Persona es requerido");
    try {
      const res = await customAxios.get(`/personas/resumen/edad/${encodeURIComponent(idEdadPersona)}`);
      return res.data;
    } catch (error) {
      handleError(error);
    }
  },
};


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
  console.log("[usuariosAPI.getAll] Llamando a /usuarios/all");
  try {
    const res = await customAxios.get(`/usuarios/all`);
    console.log("[usuariosAPI.getAll] Respuesta:", res.data);
    return res.data;
  } catch (error) {
    console.error("[usuariosAPI.getAll] Error:", error);
    handleError(error);
  }
},

  // 🔍 Nuevo método para buscar usuario por ID
 getById: async (id) => {
  console.log(`[usuariosAPI.getById] Llamando a /usuarios/${id}`);
  try {
    const res = await customAxios.get(`/usuarios/${id}`);
    console.log("[usuariosAPI.getById] Respuesta:", res.data);
    return res.data;
  } catch (error) {
    console.error("[usuariosAPI.getById] Error:", error);
    if (error.response?.status === 404) {
      throw new Error("Usuario no encontrado.");
    }
    throw new Error("Error al buscar usuario por ID.");
  }
}
});



export const mascotasAPI = {
  ...createApiMethods("mascotas"),
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
export const referenciasAPI = {
  ...createApiMethods("referencias"),

  getByCodigoFamilia: async (codigoFamilia) => {
    try {
      const url = `/familias/obtener/referencia/${encodeURIComponent(codigoFamilia)}`;
      const res = await customAxios.get(url);

      const data = res.data.data;

      let referenciasFiltradas;

      if (Array.isArray(data)) {
        // Si es array, mapeamos normalmente
        referenciasFiltradas = data.map(ref => ({
          idFamilia: ref.idFamilia,
          tipoAyuda: ref.tipoAyuda,
          descripcion: ref.descripcion,
          fechaEntrega: ref.fechaEntrega,
          responsable: ref.responsable,
        }));
      } else if (data && typeof data === "object") {
        // Si es objeto, envolvemos en array
        referenciasFiltradas = [{
          idFamilia: data.idFamilia,
          tipoAyuda: data.tipoAyuda,
          descripcion: data.descripcion,
          fechaEntrega: data.fechaEntrega,
          responsable: data.responsable,
        }];
      } else {
        referenciasFiltradas = [];
      }

      return {
        success: true,
        data: referenciasFiltradas,
        message: res.data.message,
      };

    } catch (error) {
      console.error("Error al buscar referencias:", error.response?.data || error);
      throw new Error(error.response?.data?.message || "Error en la búsqueda");
    }
  }
};


export const ajusteInventarioAPI = {
  ...createApiMethods("ajusteInventario"),

  getByNombreProducto: async (nombreProducto) => {
    try {
      const url = `/ajusteInventario/producto/${encodeURIComponent(nombreProducto)}`;
      const res = await customAxios.get(url);

      const ajustesFiltrados = res.data.data.slice(0, 20).map(ajuste => ({
        nombreProducto: ajuste.nombreProducto,
        cantidadOriginal: ajuste.cantidadOriginal,
        cantidadAjustada: ajuste.cantidadAjustada,
        justificacion: ajuste.justificacion,
        fechaCreacion: ajuste.fechaCreacion,
        idUsuario: ajuste.idUsuario,
      }));

      return {
        success: true,
        data: ajustesFiltrados,
        message: res.data.message,
      };

    } catch (error) {
      console.error("Error al buscar ajustes de inventario:", error.response?.data || error);
      throw new Error(error.response?.data?.message || "Error en la búsqueda de ajustes");
    }
  }
};