import React, { useEffect, useState } from "react";
import { alberguesAPI } from "../../helpers/api";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster, { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const ActualizarAlbergue = () => {
  const [idAlbergue, setIdAlbergue] = useState("");
  const [albergue, setAlbergue] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar albergue por ID
  const fetchAlbergue = async () => {
    if (!idAlbergue.trim()) {
      showCustomToast("Ingrese un ID de albergue", null, "error");
      return;
    }

    try {
      setLoading(true);
      const res = await alberguesAPI.getById(idAlbergue);
      const data = Array.isArray(res.data) ? res.data[0] : res.data;

      if (!data) {
        showCustomToast("Albergue no encontrado", null, "error");
        setAlbergue(null);
      } else {
        setAlbergue(data);
      }
    } catch (error) {
      showCustomToast("Error al obtener el albergue", null, "error");
      console.error(error);
      setAlbergue(null);
    } finally {
      setLoading(false);
    }
  };

  const handleActualizar = async () => {
    try {
      await alberguesAPI.update(albergue.id, albergue);
      showCustomToast("Albergue actualizado correctamente", null, "success");
    } catch (error) {
      showCustomToast("No se pudo actualizar el albergue", null, "error");
      console.error(error);
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Está seguro de eliminar este albergue?")) return;
    try {
      await alberguesAPI.remove(albergue.id);
      showCustomToast("Albergue eliminado", null, "success");
      setAlbergue(null);
      setIdAlbergue("");
    } catch (error) {
      showCustomToast("Error al eliminar el albergue", null, "error");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbergue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <FormContainer title="Actualizar Albergue" onSubmit={(e) => { e.preventDefault(); fetchAlbergue(); }}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="ID del Albergue"
              name="idAlbergue"
              value={idAlbergue}
              onChange={(e) => setIdAlbergue(e.target.value)}
              placeholder="Ingrese ID"
            />
          </div>
          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading}>
              Cargar Datos
            </SubmitButton>
          </div>
        </div>

        {albergue && (
          <div className="mt-8 space-y-4">
            {Object.entries(albergue).map(([key, value]) => (
              <InputField
                key={key}
                label={key}
                name={key}
                value={value || ""}
                onChange={handleChange}
                readOnly={key === "id"}
                type={typeof value === "number" ? "number" : "text"}
              />
            ))}

            <div className="flex gap-4 pt-4">
              <SubmitButton color="text-white bg-green-600 hover:bg-green-700" onClick={handleActualizar}>
                Actualizar
              </SubmitButton>
              <SubmitButton color="text-white bg-red-600 hover:bg-red-700" onClick={handleEliminar}>
                Eliminar
              </SubmitButton>
            </div>
          </div>
        )}
      </FormContainer>

      <CustomToaster />
    </>
  );
};

export default ActualizarAlbergue;
