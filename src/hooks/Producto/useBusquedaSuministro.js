import { useState } from "react";
import { productosAPI } from "../../helpers/api.js";
import toast from "react-hot-toast";

export const useBusquedaSuministro = () => {
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
    setResultados([]); // Limpiar resultados previos

    try {
      const data = await productosAPI.getByFamilia(codigoFamilia);
      console.log("Datos recibidos:", data);
      setResultados(data.data);
    } catch (error) {
      toast.error(error.message || "Error al buscar productos.");
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
