import React, { useState } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import CustomToaster, { showCustomToast } from "../components/globalComponents/CustomToaster.jsx";
import { amenazasAPI } from "../helpers/api.js";

export default function RegistroAmenazas() {
  const [familia, setFamilia] = useState("");
  const [evento, setEvento] = useState("");
  const [peligro, setPeligro] = useState("");
  const [causa, setCausa] = useState("");
  const [categoriaEvento, setCategoriaEvento] = useState("");

  const idUsuarioCreacion = localStorage.getItem("idUsuario");

  const [loading, setLoading] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!familia || !evento || !peligro || !causa || !categoriaEvento) {
      showCustomToast("Error", "Por favor completa todos los campos.", "error");
      return;
    }

    setLoading(true);

    try {
      await amenazasAPI.create({
        familiaEvento: familia,
        evento,
        peligro,
        causa,
        categoriaEvento,
        idUsuarioCreacion,
      });

      showCustomToast("Éxito", "Amenaza registrada correctamente.", "success");

      setFamilia("");
      setEvento("");
      setPeligro("");
      setCausa("");
      setCategoriaEvento("");
    } catch (error) {
      showCustomToast("Error", error.message || "Error al registrar amenaza", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormContainer title="Registro de Amenazas" onSubmit={handleRegistro} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Familia del Evento"
              name="familia"
              value={familia}
              onChange={(e) => setFamilia(e.target.value)}
              placeholder="Ej: Hidrológico"
              required
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Evento"
              name="evento"
              value={evento}
              onChange={(e) => setEvento(e.target.value)}
              placeholder="Ej: Inundación"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <InputField
              label="Peligro"
              name="peligro"
              value={peligro}
              onChange={(e) => setPeligro(e.target.value)}
              placeholder="Ej: Inundación"
              required
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Causa"
              name="causa"
              value={causa}
              onChange={(e) => setCausa(e.target.value)}
              placeholder="Ej: Lluvias continuas"
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <InputField
              label="Categoría del Evento"
              name="categoriaEvento"
              value={categoriaEvento}
              onChange={(e) => setCategoriaEvento(e.target.value)}
              placeholder="Ej: Natural"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <SubmitButton color="text-black" width="w-full" loading={loading}>
            Registrar
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
}
