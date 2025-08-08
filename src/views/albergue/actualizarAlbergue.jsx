import React, { useEffect, useState } from "react";
import { alberguesAPI } from "../../helpers/api";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import SearchAutocompleteInput from "../../components/FormComponents/SearchAutocompleteInput.jsx";
import CustomToaster, { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const camposFormulario = [
  "nombre", "region", "provincia", "canton", "distrito", "direccion",
  "tipoEstablecimiento", "tipoAlbergue", "condicionAlbergue",
  "administrador", "telefono", "capacidadPersonas", "capacidadColectiva",
  "cantidadFamilias", "ocupacion", "cocina", "duchas", "serviciosSanitarios",
  "bodega", "menajeMobiliario", "tanqueAgua", "areaTotalM2", "municipalidad", "color"
];

const camposNumericos = [
  "capacidadPersonas", "capacidadColectiva", "cantidadFamilias",
  "ocupacion", "areaTotalM2"
];

const formatearLabel = (texto) =>
  texto.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const ActualizarAlbergue = () => {
  const [albergues, setAlbergues] = useState([]);
  const [busquedaAlbergue, setBusquedaAlbergue] = useState("");
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlbergues = async () => {
      try {
        const data = await alberguesAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data || [];
        setAlbergues(lista);
      } catch {
        showCustomToast(
          "Error",
          "Error al cargar albergues. Verifica si tu sesión expiró.",
          "error"
        );
      }
    };
    fetchAlbergues();
  }, []);

  const handleSelectAlbergue = async (albergue) => {
    if (!albergue) {
      setForm({});
      setBusquedaAlbergue("");
      return;
    }

    try {
      const albergueCompleto = await alberguesAPI.getById(albergue.idAlbergue);
      const datosCompletos = { idAlbergue: albergue.idAlbergue };

      camposFormulario.forEach((campo) => {
        const valor = albergueCompleto[campo];

        if (typeof valor === "boolean") {
          datosCompletos[campo] = valor;
        } else if (typeof valor === "number") {
          datosCompletos[campo] = valor.toString();
        } else {
          datosCompletos[campo] = valor ?? "";
        }
      });

      setForm(datosCompletos);
      setBusquedaAlbergue(
        `ID: ${datosCompletos.idAlbergue} - ${datosCompletos.nombre}`
      );
    } catch (error) {
      showCustomToast("Error", "No se pudo cargar el albergue completo", "error");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!form.idAlbergue) {
      showCustomToast(
        "Error",
        "Seleccione un albergue antes de actualizar",
        "error"
      );
      return;
    }
    try {
      setLoading(true);
      await alberguesAPI.update(form.idAlbergue, form);
      showCustomToast("Éxito", "Albergue actualizado correctamente", "success");
    } catch (error) {
      showCustomToast("Error", "No se pudo actualizar el albergue", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (!form.idAlbergue) {
      showCustomToast("Error", "No hay albergue para eliminar", "error");
      return;
    }
    if (!window.confirm("¿Está seguro de eliminar este albergue?")) return;
    try {
      setLoading(true);
      await alberguesAPI.remove(form.idAlbergue);
      showCustomToast("Éxito", "Albergue eliminado", "success");
      setForm({});
      setBusquedaAlbergue("");
    } catch (error) {
      showCustomToast("Error", "Error al eliminar el albergue", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer title="Actualizar Albergue" size="md" onSubmit={handleActualizar}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <SearchAutocompleteInput
            label="Buscar Albergue"
            busqueda={busquedaAlbergue}
            setBusqueda={setBusquedaAlbergue}
            showSugerencias={showSugerencias}
            setShowSugerencias={setShowSugerencias}
            resultados={albergues}
            onSelect={handleSelectAlbergue}
            optionLabelKeys={["idAlbergue", "nombre"]}
            placeholder="ID o nombre del albergue..."
          />
        </div>

        {form.idAlbergue && (
          <>
            <div className="flex-1">
              <InputField
                label="ID Albergue"
                name="idAlbergue"
                value={form.idAlbergue}
                readOnly
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Nombre"
                name="nombre"
                value={form.nombre || ""}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
      </div>

      {form.idAlbergue && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {camposFormulario
              .filter((campo) => campo !== "nombre")
              .map((campo) => (
                <InputField
                  key={campo}
                  label={formatearLabel(campo)}
                  name={campo}
                  value={form[campo] ?? ""}
                  onChange={handleChange}
                  type={camposNumericos.includes(campo) ? "number" : "text"}
                />
              ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="flex-1 flex gap-4">
              <SubmitButton
                type="submit"
                width="w-full"
                loading={loading}
                color="text-black"
              >
                Actualizar
              </SubmitButton>
              <SubmitButton
                type="button"
                width="w-full"
                color="text-black hover:bg-red-700"
                onClick={handleEliminar}
                disabled={loading}
              >
                Eliminar
              </SubmitButton>
            </div>
          </div>
        </>
      )}
      <CustomToaster />
    </FormContainer>
  );
};

export default ActualizarAlbergue;
