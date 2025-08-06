import { useState } from "react";
import { mascotasAPI } from "../helpers/api";
import toast from "react-hot-toast";

export const useBusquedaMascotas = () => {
  const [codigoFamilia, setCodigoFamilia] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigoFamilia.trim()) {
      toast.error("Debe ingresar un código de familia.");
      return;
    }

    setLoading(true);
    setResultados([]);

    try {
      const response = await mascotasAPI.getByCodigoFamilia(codigoFamilia);
      setResultados(response.data || []);

      if (!response.data || response.data.length === 0) {
        toast.error("No se encontraron mascotas para esta familia.");
      } else if (response.success) {
        toast.success("Mascotas encontradas exitosamente.");
      }
    } catch (error) {
      toast.error(error.message || "Error al buscar mascotas.");
    } finally {
      setLoading(false)
    }
  };

  return {
    codigoFamilia,
    setCodigoFamilia,
    resultados,
    loading,
    handleSubmit
  };
};