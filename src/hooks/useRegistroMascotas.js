import { useEffect, useState } from "react";
import { familiasAPI, mascotasAPI } from "../helpers/api";
import { showCustomToast } from "../components/globalComponents/CustomToaster";

export default function useRegistroMascotas() {
  const [familias, setFamilias] = useState([]);
  const [busquedaFamilia, setBusquedaFamilia] = useState("");
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const [tipo, setTipo] = useState("");
  const [tamano, setTamano] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });

  const tiposMascota = ["Perro", "Gato", "Ave", "Roedor", "Otro"];
  const tamanosMascota = ["Pequeño", "Mediano", "Grande"];

  const fetchFamilias = async () => {
    try {
      setLoading(true);
      const data = await familiasAPI.getAll();
      const lista = Array.isArray(data) ? data : data.data ?? [];
      setFamilias(lista || []);
    } catch (error) {
      console.error("Error al cargar familias:", error);
      setFamilias([]);
      setAlerta({
        mensaje: "Error al cargar las familias disponibles",
        tipo: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFamiliaSelect = (familia) => {
    setSelectedFamilia(familia);
    setBusquedaFamilia(familia.codigoFamilia);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!selectedFamilia || !tipo || !tamano || !nombreMascota) {
      setAlerta({ mensaje: "Completa todos los campos.", tipo: "error" });
      return;
    }

    try {
      setLoading(true);
      const mascotaData = {
        idFamilia: selectedFamilia.id || selectedFamilia._id,
        tipo,
        tamaño: tamano,
        nombreMascota,
      };

      await mascotasAPI.create(mascotaData);

      showCustomToast(
        "Registro exitoso",
        "La mascota ha sido registrada correctamente.",
        "success"
      );

      // Reset campos
      setSelectedFamilia(null);
      setBusquedaFamilia("");
      setTipo("");
      setTamano("");
      setNombreMascota("");

      fetchFamilias();
    } catch (error) {
      console.error("Error al registrar mascota:", error);
      setAlerta({
        mensaje:
          error.response?.data?.message ||
          error.message ||
          "Error al registrar la mascota",
        tipo: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilias();
  }, []);

  return {
    familias,
    busquedaFamilia,
    setBusquedaFamilia,
    showSugerencias,
    setShowSugerencias,
    selectedFamilia,
    handleFamiliaSelect,
    tipo,
    setTipo,
    tamano,
    setTamano,
    nombreMascota,
    setNombreMascota,
    loading,
    handleRegistro,
    alerta,
    tiposMascota,
    tamanosMascota,
  };
}
