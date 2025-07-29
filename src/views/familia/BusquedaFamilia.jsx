import React, { useState } from "react";
import { familiasAPI } from "../../helpers/api";
import Alerta from "../../components/Alerta";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../../components/globalComponents/CustomToaster.jsx";

const BusquedaFamilia = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [familia, setFamilia] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFamilia(null);

    if (!identificacion.trim()) {
      setError("Por favor ingrese un número de identificación.");
      return;
    }

    setLoading(true);
    try {
      const id = identificacion.trim();
      const res = await familiasAPI.getById(id);

      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setFamilia(res.data);
        setError("");
      } else {
        setError("No se encontró una familia con ese número de identificación.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No se encontró un Jefe de familia con ese número de identificación.");
      } else {
        setError(err.message || "Error al buscar la familia.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer
      title="Buscar Familia"
      onSubmit={handleSubmit}
      size={familia && familia.length > 0 ? "md" : "xs"}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <InputField
            label="Número de Identificación"
            name="identificacion"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            placeholder="Ingrese el número de identificación"
            required
          />
          <div className="mt-4">
            <SubmitButton width="w-full" loading={loading}>
              Buscar
            </SubmitButton>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6">
          <Alerta tipo="error" mensaje={error} />
        </div>
      )}

      {familia && familia.length > 0 && (
        <>
          <div className="mt-8 mb-4">
            <h2 className="text-xl font-bold text-[#00897B] mb-4">Detalles de la Familia</h2>
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
              <div>
                <InputField
                  label="Código de Familia"
                  value={familia[0].codigoFamilia || ""}
                  readOnly
                />
              </div>
              <div>
                <InputField
                  label="Jefe de Familia"
                  value={familia[0].nombreCompletoJefe || ""}
                  readOnly
                />
              </div>
              <div>
                <InputField
                  label="Ubicación"
                  value={`${familia[0].provincia || ""}, ${familia[0].canton || ""}, ${familia[0].distrito || ""}`}
                  readOnly
                />
              </div>
              <div>
                <InputField
                  label="Dirección Exacta"
                  value={familia[0].direccionExacta || ""}
                  readOnly
                />
              </div>
              <div>
                <InputField
                  label="Albergue"
                  value={familia[0].nombreAlbergue || ""}
                  readOnly
                />
              </div>
              <div>
                <InputField
                  label="N° Personas"
                  value={familia.length}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-[#00897B] text-white">
                <tr>
                  <th className="px-2 py-2">#</th>
                  <th className="px-2 py-2">Nombre Completo</th>
                  <th className="px-2 py-2">Tipo Identificación</th>
                  <th className="px-2 py-2">Número Identificación</th>
                  <th className="px-2 py-2">Fecha Nacimiento</th>
                  <th className="px-2 py-2">Nacionalidad</th>
                  <th className="px-2 py-2">Parentesco</th>
                  <th className="px-2 py-2">Sexo</th>
                  <th className="px-2 py-2">Género</th>
                  <th className="px-2 py-2">Condición de Salud</th>
                  <th className="px-2 py-2">Discapacidad</th>
                  <th className="px-2 py-2">Tipo Discapacidad</th>
                  <th className="px-2 py-2">Subtipo Discapacidad</th>
                  <th className="px-2 py-2">Tipo Condición Poblacional</th>
                  <th className="px-2 py-2">Contacto de Emergencia</th>
                </tr>
              </thead>
              <tbody>
                {familia.map((p, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2">{p.nombreCompletoIntegrante || ""}</td>
                    <td className="px-2 py-2">{p.tipoIdentificacion || ""}</td>
                    <td className="px-2 py-2">{p.numeroIdentificacion || ""}</td>
                    <td className="px-2 py-2">{p.fechaNacimiento ? p.fechaNacimiento.split("T")[0] : ""}</td>
                    <td className="px-2 py-2">{p.nacionalidad || ""}</td>
                    <td className="px-2 py-2">{p.parentesco || ""}</td>
                    <td className="px-2 py-2">{p.sexo || ""}</td>
                    <td className="px-2 py-2">{p.genero || ""}</td>
                    <td className="px-2 py-2">{p.tieneCondicionSalud === 1 ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{p.discapacidad === 1 ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{p.discapacidad === 1 ? p.tipoDiscapacidad || "" : "-"}</td>
                    <td className="px-2 py-2">{p.discapacidad === 1 ? p.subtipoDiscapacidad || "" : "-"}</td>
                    <td className="px-2 py-2">{p.tipoCondicionPoblacional || ""}</td>
                    <td className="px-2 py-2">{p.contactoEmergencia || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <CustomToaster />
    </FormContainer>
  );
};

export default BusquedaFamilia;