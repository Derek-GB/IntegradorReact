import React, { useState } from "react";
import FormContainer from "../components/FormComponents/FormContainer.jsx";
import InputField from "../components/FormComponents/InputField.jsx";
import SubmitButton from "../components/FormComponents/SubmitButton.jsx";
import CustomToaster, { showCustomToast } from "../components/globalComponents/CustomToaster.jsx";

export default function RegistroAmenazas() {
  const [familia, setFamilia] = useState("");
  const [evento, setEvento] = useState("");
  const [peligro, setPeligro] = useState("");
  const [eventoEspecifico, setEventoEspecifico] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = (e) => {
    e.preventDefault();
    if (!familia || !evento || !peligro || !eventoEspecifico) {
      showCustomToast("Error", "Por favor completa todos los campos.", "error");
      return;
    }
    showCustomToast("Éxito", "Amenaza registrada correctamente.", "success");
    setFamilia("");
    setEvento("");
    setPeligro("");
    setEventoEspecifico("");
  };

  return (
    <>
      <FormContainer
        title="Registro de Amenazas"
        onSubmit={handleRegistro}
        size="md"
      >
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
              label="Evento Específico"
              name="eventoEspecifico"
              value={eventoEspecifico}
              onChange={(e) => setEventoEspecifico(e.target.value)}
              placeholder="Ej: Huracán Lesly"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <SubmitButton width="w-full" loading={loading}>
            Registrar
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
}