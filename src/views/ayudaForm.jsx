import React, { useState, useEffect } from "react";
import { familiasAPI, referenciasAPI } from "../helpers/api";
import FormContainer from "../components/FormComponents/FormContainer";
import InputField from "../components/FormComponents/InputField";
import SelectField from "../components/FormComponents/SelectField";
import SubmitButton from "../components/FormComponents/SubmitButton";
import SearchAutocompleteInput from "../components/FormComponents/SearchAutocompleteInput";
import CustomToaster, { showCustomToast } from "../components/globalComponents/CustomToaster";

const tiposAyuda = [
  { id: "imas", nombre: "IMAS" },
  { id: "cruzroja", nombre: "Cruz Roja" },
  { id: "cne", nombre: "CNE" },
  { id: "refugio", nombre: "Refugio" },
  { id: "otros", nombre: "Otros" },
];

const AyudaForm = () => {
  const idUsuario = localStorage.getItem("idUsuario");
  const [familias, setFamilias] = useState([]);
  const [form, setForm] = useState({
    idFamilia: "",
    tipoAyuda: "",
    descripcion: "",
    fechaEntrega: "",
    responsable: "",
  });

  // Autocomplete states
  const [busquedaFamilia, setBusquedaFamilia] = useState("");
  const [showSugerenciasFamilia, setShowSugerenciasFamilia] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFamilias = async () => {
      try {
        const res = await familiasAPI.getAll();
        setFamilias(Array.isArray(res) ? res : res.data ?? []);
      } catch {
        showCustomToast("Error", "Error al cargar familias", "error");
      }
    };
    fetchFamilias();
  }, []);

  const validarFormulario = () => {
    if (!form.idFamilia) return "Debe seleccionar una familia";
    if (!form.tipoAyuda) return "Debe seleccionar un tipo de ayuda";
    if (!form.descripcion.trim()) return "Debe ingresar una descripción";
    if (!form.fechaEntrega) return "Debe ingresar la fecha de entrega";
    if (!form.responsable.trim()) return "Debe ingresar el responsable";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validacion = validarFormulario();
    if (validacion) {
      showCustomToast("Error", validacion, "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        idFamilia: Number(form.idFamilia),
        tipoAyuda: form.tipoAyuda,
        descripcion: form.descripcion,
        fechaEntrega: form.fechaEntrega,
        responsable: form.responsable,
        idUsuarioCreacion: Number(idUsuario),
      };

      await referenciasAPI.create(payload);

      showCustomToast("Éxito", "Ayuda registrada correctamente", "success");
      setForm({
        idFamilia: "",
        tipoAyuda: "",
        descripcion: "",
        fechaEntrega: "",
        responsable: "",
      });
      setBusquedaFamilia("");
    } catch {
      showCustomToast("Error", "No se pudo registrar la ayuda. Inténtelo de nuevo.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <FormContainer
      title="Registro de Ayuda Entregada"
      onSubmit={handleSubmit}
      size="md"
    >
      <fieldset className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <SearchAutocompleteInput
              label="Código de Familia"
              busqueda={busquedaFamilia}
              setBusqueda={setBusquedaFamilia}
              showSugerencias={showSugerenciasFamilia}
              setShowSugerencias={setShowSugerenciasFamilia}
              resultados={familias}
              onSelect={(familia) => {
                setForm((prev) => ({
                  ...prev,
                  idFamilia: familia.id || familia.ID,
                }));
                setBusquedaFamilia(familia.codigoFamilia || familia.codigo);
              }}
              optionLabelKeys={["codigoFamilia", "codigo"]}
              placeholder="Buscar familia..."
            />
          </div>
          <div className="flex-1">
            <SelectField
              label="Tipo de Ayuda"
              name="tipoAyuda"
              value={form.tipoAyuda}
              onChange={handleChange}
              options={tiposAyuda}
              optionLabel="nombre"
              optionValue="id"
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <InputField
              label="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción de la ayuda"
              required
            />
          </div>
          <div className="flex-1">
          <InputField
              label="Responsable"
              name="responsable"
              value={form.responsable}
              onChange={handleChange}
              placeholder="Nombre del responsable"
              required
            />
          
          </div>
          <div className="flex-1">
          <InputField
              label="Fecha de Entrega"
              name="fechaEntrega"
              type="date"
              value={form.fechaEntrega}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </fieldset>
      <div className="flex justify-center mt-8">
        <SubmitButton width="w-full" loading={loading}>
          Registrar
        </SubmitButton>
      </div>
    </FormContainer>
    <CustomToaster />
    </div>
  );
};

export default AyudaForm;
