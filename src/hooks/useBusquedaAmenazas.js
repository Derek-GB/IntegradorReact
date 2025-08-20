import { useEffect, useState } from "react";
import { amenazasAPI } from "../helpers/api.js";
import toast from "react-hot-toast";

export const useBusquedaAmenazas = () => {
  const [amenazas, setAmenazas] = useState([]);
  const [codigoAmenaza, setCodigoAmenaza] = useState("");
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [selectedAmenaza, setSelectedAmenaza] = useState(null);

  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  // Cargar amenazas para el autocomplete
  const fetchAmenazas = async () => {
    try {
      const res = await amenazasAPI.getAll();
      const lista = Array.isArray(res?.data) ? res.data : res.data?.data || [];
      setAmenazas(lista);
    } catch {
      toast.error("Error al cargar amenazas.");
      setAmenazas([]);
    }
  };

  useEffect(() => {
    fetchAmenazas();
  }, []);

  // Selección amenaza del autocomplete
  const handleAmenazaSelect = (amenaza) => {
    setSelectedAmenaza(amenaza);
    setCodigoAmenaza(amenaza.codigoAmenaza || amenaza.id || "");
    setShowSugerencias(false);
  };

  // Submit buscar amenazas
  const handleSubmit = async (e) => {
    e.preventDefault();

    const codigoBusqueda = selectedAmenaza?.codigoAmenaza || codigoAmenaza;

    if (!codigoBusqueda.trim()) {
      toast.error("Debe ingresar o seleccionar un código de amenaza.");
      return;
    }

    setLoading(true);
    setResultados([]);

    try {
      const data = await amenazasAPI.getById(codigoBusqueda);
      // Si la API devuelve un array, úsalo; si es objeto, envuélvelo en array
      const amenazasData = Array.isArray(data) ? data : [data];
      setResultados(amenazasData);

      if (!amenazasData || amenazasData.length === 0) {
        toast.error("No se encontraron datos para esta amenaza.");
      }
    } catch (error) {
      toast.error(error.message || "Error al buscar amenaza.");
    } finally {
      setLoading(false);
    }
  };

  return {
    amenazas,
    codigoAmenaza,
    setCodigoAmenaza,
    showSugerencias,
    setShowSugerencias,
    selectedAmenaza,
    handleAmenazaSelect,
    resultados,
    setResultados, // <-- AGREGA ESTA LÍNEA
    loading,
    handleSubmit,
  };
};