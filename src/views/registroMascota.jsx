import React, { useState, useEffect } from "react";
import { familiasAPI, mascotasAPI } from "../helpers/api";
import FormContainer from "../components/FormComponents/FormContainer";
import SearchAutocompleteInput from "../components/FormComponents/SearchAutocompleteInput";
import InputField from "../components/FormComponents/InputField";
import SelectField from "../components/FormComponents/SelectField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import Alerta from "../components/Alerta";
import FullScreenSpinner from "../components/globalComponents/FullScreenSpinner";
import { Modal } from "@mui/material";
import GlobalModal from "../components/globalComponents/GlobalModal";
import CustomToaster, { showCustomToast } from "../components/globalComponents/CustomToaster";

export default function RegistroMascotas() {
  const [familias, setFamilias] = useState([]);
  const [busquedaFamilia, setBusquedaFamilia] = useState("");
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [selectedFamilia, setSelectedFamilia] = useState(null);
  const [tipo, setTipo] = useState("");
  const [tamano, setTamano] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });

  const tiposMascota = ["Perro", "Gato", "Ave", "Roedor"];
  const tamanosMascota = ["Pequeño", "Mediano", "Grande"];

  const fetchFamilias = async () => {
    try {
      setLoading(true);
      const data = await familiasAPI.getAll();
      const lista = Array.isArray(data) ? data : data.data ?? [];
      setFamilias(lista || []);
    } catch (error) {
      console.error('Error al cargar familias:', error);
      setFamilias([]);
      setAlerta({
        mensaje: "Error al cargar las familias disponibles",
        tipo: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilias();
  }, []);

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
        tipo: tipo,
        tamaño: tamano,
        nombreMascota: nombreMascota
      };

      await mascotasAPI.create(mascotaData);

      
      showCustomToast(
        "Registro exitoso",
        "La mascota ha sido registrada correctamente.",
        "success"
      );
      // Limpiar campos
      setSelectedFamilia(null);
      setBusquedaFamilia("");
      setTipo("");
      setTamano("");
      setNombreMascota("");

      fetchFamilias();

    } catch (error) {
      console.error('Error al registrar mascota:', error);
      setAlerta({
        mensaje: error.response?.data?.message || error.message || "Error al registrar la mascota",
        tipo: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto ">

      <FormContainer title="Registro de Mascotas" size="xl" onSubmit={handleRegistro}>
        <div className="space-y-6">
          <div className="w-full">
            <SearchAutocompleteInput
              label="Familia"
              busqueda={busquedaFamilia}
              setBusqueda={setBusquedaFamilia}
              showSugerencias={showSugerencias}
              setShowSugerencias={setShowSugerencias}
              resultados={familias}
              onSelect={handleFamiliaSelect}
              optionLabelKeys={["codigoFamilia"]}
              placeholder="Seleccione una familia"
              disabled={loading || familias.length === 0}
            />
          </div>

          <div className="w-full">
            <InputField
              label="Nombre de la Mascota"
              name="nombreMascota"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              placeholder="Ingrese el nombre de la mascota"
              disabled={loading}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Tipo"
              name="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              options={tiposMascota}
              disabled={loading}
              required
            />

            <SelectField
              label="Tamaño"
              name="tamano"
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              options={tamanosMascota}
              disabled={loading}
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <SubmitButton loading={loading}>Registrar Mascota</SubmitButton>
          </div>

         
        </div>
      </FormContainer>
      <CustomToaster/>
    </div>
  );
}