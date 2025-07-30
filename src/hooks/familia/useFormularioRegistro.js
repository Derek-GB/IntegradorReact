
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alberguesAPI, amenazasAPI } from "../../helpers/api";
import obtenerTodos from "../../helpers/obtenerUbicaciones";
import customAxios from "../../helpers/customAxios";
import { generarCodigoFamilia } from "../../helpers/generarCodigoFamilia";
import { showCustomToast } from "../../components/globalComponents/CustomToaster";

const useFormularioRegistro = () => {
  const [integrantes, setIntegrantes] = useState("");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [cantonSeleccionado, setCantonSeleccionado] = useState("");
  const [albergueSeleccionado, setAlbergueSeleccionado] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoFamilia, setCodigoFamilia] = useState("");
  const [nombreProvincia, setNombreProvincia] = useState("");
  const [nombreCanton, setNombreCanton] = useState("");
  const [nombreDistrito, setNombreDistrito] = useState("");

  const [albergues, setAlbergues] = useState([]);
  const [amenazas, setAmenazas] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  const [busquedaAlbergue, setBusquedaAlbergue] = useState("");
  const [showSugerenciasAlbergue, setShowSugerenciasAlbergue] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resAlbergues, resAmenazas] = await Promise.all([
          alberguesAPI.getAll(),
          amenazasAPI.getAll(),
        ]);
        setAlbergues(resAlbergues?.data || []);
        setAmenazas(resAmenazas?.data || []);
      } catch {
        showCustomToast("Error", "Error al cargar datos internos", "error");
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    const cargarProvincias = async () => {
      const datos = await obtenerTodos("https://api-geo-cr.vercel.app/provincias");
      setProvincias(datos);
    };
    cargarProvincias();
  }, []);

  useEffect(() => {
    if (!provinciaSeleccionada) {
      setCantones([]);
      setCantonSeleccionado("");
      return;
    }
    const cargarCantones = async () => {
      const datos = await obtenerTodos(
        `https://api-geo-cr.vercel.app/provincias/${provinciaSeleccionada}/cantones`
      );
      setCantones(datos);
    };
    cargarCantones();
  }, [provinciaSeleccionada]);

  useEffect(() => {
    if (!cantonSeleccionado) {
      setDistritos([]);
      return;
    }
    const cargarDistritos = async () => {
      const datos = await obtenerTodos(
        `https://api-geo-cr.vercel.app/cantones/${cantonSeleccionado}/distritos`
      );
      setDistritos(datos);
    };
    cargarDistritos();
  }, [cantonSeleccionado]);

  useEffect(() => {
    if (nombreProvincia && nombreCanton && integrantes) {
      const numeroFamilia = 1;
      const nuevoCodigo = generarCodigoFamilia(nombreProvincia, nombreCanton, numeroFamilia);
      setCodigoFamilia(nuevoCodigo);
    }
  }, [nombreProvincia, nombreCanton, integrantes]);

  const crearFamilia = async (e) => {
    e.preventDefault();
    const idUsuario = localStorage.getItem("idUsuario");

    if (
      !albergueSeleccionado ||
      !codigoFamilia ||
      !integrantes ||
      !eventoSeleccionado ||
      !nombreProvincia ||
      !nombreCanton ||
      !nombreDistrito ||
      !direccion ||
      !idUsuario
    ) {
      showCustomToast("Campos incompletos", "Complete todos los campos obligatorios.", "error");
      return;
    }

    const datos = {
      provincia: nombreProvincia,
      canton: nombreCanton,
      distrito: nombreDistrito,
      direccion,
      codigoFamilia,
      cantidadPersonas: parseInt(integrantes),
      idAlbergue: parseInt(albergueSeleccionado),
      idAmenaza: parseInt(eventoSeleccionado),
      idUsuarioCreacion: parseInt(idUsuario),
    };

    try {
      const res = await customAxios.post("/familias", datos);
      const idFamilia = res.data.idFamilia;
      localStorage.setItem("idFamilia", idFamilia);
      showCustomToast("Éxito", "Familia registrada correctamente.", "success");
    } catch {
      showCustomToast("Error", "No se pudo registrar la familia.", "error");
    }

    localStorage.setItem("cantidadIntegrantes", integrantes);
    navigate("/formularioIntegrantes.jsx");
  };

  return {
    // States y handlers
    albergues,
    amenazas,
    provincias,
    cantones,
    distritos,
    integrantes,
    setIntegrantes,
    provinciaSeleccionada,
    setProvinciaSeleccionada,
    cantonSeleccionado,
    setCantonSeleccionado,
    albergueSeleccionado,
    setAlbergueSeleccionado,
    eventoSeleccionado,
    setEventoSeleccionado,
    direccion,
    setDireccion,
    codigoFamilia,
    setCodigoFamilia,
    nombreProvincia,
    setNombreProvincia,
    nombreCanton,
    setNombreCanton,
    nombreDistrito,
    setNombreDistrito,
    busquedaAlbergue,
    setBusquedaAlbergue,
    showSugerenciasAlbergue,
    setShowSugerenciasAlbergue,
    crearFamilia,
  };
};

export default useFormularioRegistro;
