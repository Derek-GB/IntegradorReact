import { useState, useEffect } from "react";
import { alberguesAPI } from "../../helpers/api.js";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

export function useActualizarAlbergue(idAlbergue) {
  const [albergue, setAlbergue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  // Cargar albergue por ID
  useEffect(() => {
    if (!idAlbergue) return;

    setLoading(true);
    setError(null);

    alberguesAPI.getById(idAlbergue)
      .then((data) => {
        setAlbergue(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        showCustomToast("Error", "No se pudo cargar el albergue.", "error");
      });
  }, [idAlbergue]);

  // Función para actualizar el albergue
  const actualizarAlbergue = async (datosActualizados) => {
    if (!albergue?.id) {
      const msg = "ID del albergue es requerido";
      setError(msg);
      showCustomToast("Error", msg, "error");
      return;
    }

    setActualizando(true);
    setError(null);

    try {
      // Construir payload según documentación de la API
      const payload = {
        id: albergue.id,
        condicionAlbergue: datosActualizados.condicionAlbergue,
        especificacion: datosActualizados.especificacion,
        detalleCondicion: datosActualizados.detalleCondicion,
        administrador: datosActualizados.administrador,
        telefono: datosActualizados.telefono,
        idCapacidad: datosActualizados.idCapacidad,
        seccion: datosActualizados.seccion,
        requerimientosTecnicos: datosActualizados.requerimientosTecnicos,
        costoRequerimientosTecnicos: datosActualizados.costoRequerimientosTecnicos,
        idInfraestructura: datosActualizados.idInfraestructura,
        color: datosActualizados.color,
        idUsuarioModificacion: datosActualizados.idUsuarioModificacion,
      };

      const res = await alberguesAPI.update(payload);

      setAlbergue(res); // actualizar estado con la respuesta
      setActualizando(false);
      showCustomToast("Éxito", "Albergue actualizado correctamente.", "success");
      return res;
    } catch (err) {
      setError(err.message);
      setActualizando(false);
      showCustomToast("Error", "No se pudo actualizar el albergue.", "error");
      throw err;
    }
  };

  // Función para manejar cambios de input
  const handleChange = (name, value) => {
    setAlbergue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    albergue,
    loading,
    error,
    actualizarAlbergue,
    actualizando,
    handleChange,
  };
}
