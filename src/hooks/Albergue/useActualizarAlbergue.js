import { useState } from "react";
import { alberguesAPI } from "../../helpers/api.js";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const camposFormulario = [
  "nombre", "region", "provincia", "canton", "distrito", "direccion",
  "tipoEstablecimiento", "tipoAlbergue", "condicionAlbergue",
  "administrador", "telefono", "capacidadPersonas", "capacidadColectiva",
  "cantidadFamilias", "ocupacion", "cocina", "duchas", "serviciosSanitarios",
  "bodega", "menajeMobiliario", "tanqueAgua", "areaTotalM2", "municipalidad", "color"
];

// Campos editables específicos para actualizar (puedes ajustar según "registrarAlbergue.jsx")
const camposEditables = [
  "nombre", "region", "provincia", "canton", "distrito", "direccion",
  "tipoEstablecimiento", "tipoAlbergue", "condicionAlbergue",
  "administrador", "telefono", "capacidadPersonas"
];

export function useActualizarAlbergueConBusqueda() {
  // Búsqueda
  const [idAlbergueBuscar, setIdAlbergueBuscar] = useState("");
  const [nombreBuscar, setNombreBuscar] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);

  // Formulario actualización
  const [form, setForm] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);

  // Buscar albergue por ID o nombre
  const handleBuscar = async (e) => {
    e.preventDefault();
    setError("");
    setResultados([]);
    setLoadingBusqueda(true);

    try {
      if (idAlbergueBuscar.trim() !== "") {
        const res = await alberguesAPI.getById(idAlbergueBuscar.trim());
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue con ese ID.");
      } else if (nombreBuscar.trim() !== "") {
        const res = await alberguesAPI.getByNombre(nombreBuscar.trim());
        if (res?.data?.length > 0) setResultados(res.data);
        else setError("No se encontró albergue con ese nombre.");
      } else {
        setError("Ingrese ID o nombre para buscar.");
      }
    } catch (err) {
      setError("Error al buscar albergue.");
      console.error(err);
    } finally {
      setLoadingBusqueda(false);
    }
  };

  // Al seleccionar un albergue de resultados, cargar en el formulario (solo campos seleccionados)
  const seleccionarAlbergue = (albergue) => {
    if (!albergue) {
      setForm({});
      return;
    }
    const datosParaFormulario = { idAlbergue: albergue.idAlbergue || "" };
    camposEditables.forEach(campo => {
      datosParaFormulario[campo] = albergue[campo] ?? "";
    });
    setForm(datosParaFormulario);
    setResultados([]);
  };

  // Cambios en el formulario de actualización
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Actualizar albergue
  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!form.idAlbergue) {
      showCustomToast("Error", "Seleccione un albergue para actualizar", "error");
      return;
    }
    try {
      setLoadingForm(true);
      await alberguesAPI.update(form.idAlbergue, form);
      showCustomToast("Éxito", "Albergue actualizado correctamente", "success");
      // Opcional: limpiar form o resultados?
    } catch (err) {
      showCustomToast("Error", "No se pudo actualizar el albergue", "error");
      console.error(err);
    } finally {
      setLoadingForm(false);
    }
  };

  return {
    idAlbergueBuscar,
    setIdAlbergueBuscar,
    nombreBuscar,
    setNombreBuscar,
    resultados,
    error,
    loadingBusqueda,
    handleBuscar,
    seleccionarAlbergue,
    form,
    loadingForm,
    handleChangeForm,
    handleActualizar,
    camposEditables,
  };
}