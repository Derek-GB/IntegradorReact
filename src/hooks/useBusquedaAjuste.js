
import { useState } from "react";
import { ajusteInventarioAPI } from "../helpers/api.js";
import toast from "react-hot-toast";

export const useBusquedaAjuste = () => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreProducto.trim()) {
      toast.error("Debe ingresar el nombre del producto.");
      return;
    }

    setLoading(true);
    setResultados([]);

    try {
      const response = await ajusteInventarioAPI.getByNombreProducto(nombreProducto); // Este método debe traer los últimos 20
      console.log("Ajustes recibidos:", response);
      setResultados(response.data);
    } catch (error) {
      toast.error(error.message || "Error al buscar ajustes de inventario.");
    } finally {
      setLoading(false);
    }
  };

  return {
    nombreProducto,
    setNombreProducto,
    resultados,
    loading,
    handleSubmit,
  };
};
