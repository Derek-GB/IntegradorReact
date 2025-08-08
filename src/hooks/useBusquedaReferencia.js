import { useState } from "react";
import { referenciasAPI } from "../helpers/api.js";
import toast from "react-hot-toast";

export const useBusquedaReferencia = () => {
  const [codigoFamilia, setCodigoFamilia] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigoFamilia.trim()) {
      toast.error("Debe ingresar un código de familia.");
      return;
    }

    setLoading(true);
    setResultados([]); 

    try {
      const data = await referenciasAPI.getByCodigoFamilia(codigoFamilia);
      console.log("Datos recibidos:", data);
      setResultados(data.data);
    } catch (error) {
      toast.error(error.message || "Error al buscar referencias.");
    } finally {
      setLoading(false);
    }
  };

  return {
    codigoFamilia,
    setCodigoFamilia,
    resultados,
    loading,
    handleSubmit,
  };
};
