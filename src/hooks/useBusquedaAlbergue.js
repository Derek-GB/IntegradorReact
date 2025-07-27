import { useState } from "react";
import { alberguesAPI } from "../helpers/api.js";

export function useBusquedaAlbergue({ provincias, cantones, distritos, setProvinciaId, setCantonId }) {
  const [idAlbergue, setIdAlbergue] = useState("");
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [cantonSeleccionado, setCantonSeleccionado] = useState("");
  const [distritoSeleccionado, setDistritoSeleccionado] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProvinciaChange = (e) => {
    const idSeleccionado = parseInt(e.target.value, 10);
    setProvinciaId(idSeleccionado);
    const provincia = provincias.find((p) => p.idProvincia === idSeleccionado);
    setProvinciaSeleccionada(provincia?.descripcion || "");

    setCantonSeleccionado("");
    setDistritoSeleccionado("");
    setCantonId(null);
  };

  const handleCantonChange = (e) => {
    const idSeleccionado = parseInt(e.target.value, 10);
    setCantonId(idSeleccionado);
    const canton = cantones.find((c) => c.idCanton === idSeleccionado);
    setCantonSeleccionado(canton?.descripcion || "");

    setDistritoSeleccionado("");
  };

  const handleDistritoChange = (e) => {
    const idSeleccionado = parseInt(e.target.value, 10);
    const distrito = distritos.find((d) => d.idDistrito === idSeleccionado);
    setDistritoSeleccionado(distrito?.descripcion || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResultados([]);
    setLoading(true);

    try {
      if (idAlbergue.trim() !== "") {
        const res = await alberguesAPI.getById(idAlbergue.trim());
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue con ese ID.");
      } else if (nombre.trim() !== "") {
        const res = await alberguesAPI.getByNombre(nombre.trim());
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue con ese nombre.");
      } else if (distritoSeleccionado) {
        const res = await alberguesAPI.getByDistrito(distritoSeleccionado);
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue en ese distrito.");
      } else if (cantonSeleccionado) {
        const res = await alberguesAPI.getByCanton(cantonSeleccionado);
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue en ese cantón.");
      } else if (provinciaSeleccionada) {
        const res = await alberguesAPI.getByProvincia(provinciaSeleccionada);
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue en esa provincia.");
      } else {
        setError("Por favor ingrese ID, Nombre o seleccione una ubicación.");
      }
    } catch (err) {
      if (err.response?.status === 404 || (err.message && err.message.includes("Albergue no encontrado"))) {
        setError("No se encontró un albergue con esos datos.");
      } else {
        setError(String(err) || "Error al buscar albergue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    idAlbergue,
    setIdAlbergue,
    nombre,
    setNombre,
    resultados,
    error,
    provinciaSeleccionada,
    cantonSeleccionado,
    distritoSeleccionado,
    loading,
    handleSubmit,
    handleProvinciaChange,
    handleCantonChange,
    handleDistritoChange,
  };
}
