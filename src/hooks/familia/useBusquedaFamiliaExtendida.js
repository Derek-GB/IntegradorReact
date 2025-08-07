import { useState, useEffect } from "react";
import { familiasAPI, alberguesAPI, personasAPI } from "../../helpers/api.js";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const useBusquedaFamiliaExtendida = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [familia, setFamilia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [albergues, setAlbergues] = useState([]);
  const [familiasPorAlbergue, setFamiliasPorAlbergue] = useState([]);
  const [albergueSeleccionado, setAlbergueSeleccionado] = useState(null);
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState(null);
  const [vistaActual, setVistaActual] = useState("busqueda");
  const [loadingAlbergues, setLoadingAlbergues] = useState(false);
  const [loadingFamilias, setLoadingFamilias] = useState(false);

  useEffect(() => {
    const cargarAlbergues = async () => {
      setLoadingAlbergues(true);
      try {
        const res = await alberguesAPI.getAll();
        if (res && res.data) {
          setAlbergues(res.data);
        }
      } catch {
        showCustomToast("Error", "Error al cargar los albergues.", "error");
      } finally {
        setLoadingAlbergues(false);
      }
    };

    cargarAlbergues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFamilia(null);

    if (!identificacion.trim()) {
      showCustomToast(
        "Campo requerido",
        "Por favor ingrese un número de identificación.",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const id = identificacion.trim();
      const res = await familiasAPI.getById(id);

      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setFamilia(res.data);
        setVistaActual("detalle");
        showCustomToast("Éxito", "Familia encontrada correctamente.", "success");
      } else {
        showCustomToast(
          "No encontrada",
          "No se encontró una familia con ese número.",
          "info"
        );
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        showCustomToast(
          "No encontrado",
          "No se encontró un jefe de hogar con ese número de identificación.",
          "info"
        );
      } else {
        showCustomToast("Error", "Error al buscar la familia.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSeleccionarAlbergue = async (albergue) => {
    setAlbergueSeleccionado(albergue);
    setLoadingFamilias(true);
    setVistaActual("familias");

    try {
      const familiasRes = await familiasAPI.getAll();
      const personasRes = await personasAPI.getAll();

      if (familiasRes?.data && personasRes?.data) {
        const familiasFiltradas = familiasRes.data.filter(
          (familia) => familia.idAlbergue === albergue.id
        );

        const familiasConInfo = [];
        const codigosProcesados = new Set();

        for (const familia of familiasFiltradas) {
          if (!codigosProcesados.has(familia.codigoFamilia)) {
            codigosProcesados.add(familia.codigoFamilia);

            const jefeFamilia = personasRes.data.find(
              (persona) =>
                persona.esJefeFamilia === 1 && persona.idFamilia === familia.id
            );

            familiasConInfo.push({
              ...familia,
              nombreJefe: jefeFamilia
                ? `${jefeFamilia.nombre} ${jefeFamilia.primerApellido} ${jefeFamilia.segundoApellido || ""}`.trim()
                : "No disponible",
              cedulaJefe: jefeFamilia ? jefeFamilia.numeroIdentificacion : null,
              nombreAlbergue: albergue.nombre,
              egresado: familia.egresado || false,
              fechaEgreso: familia.fechaEgreso || "No disponible",
            });
          }
        }

        setFamiliasPorAlbergue(familiasConInfo);

        if (familiasConInfo.length === 0) {
          showCustomToast(
            "Sin familias",
            "No hay familias registradas en este albergue.",
            "info"
          );
        }
      }
    } catch {
      showCustomToast("Error", "Error al cargar las familias del albergue.", "error");
    } finally {
      setLoadingFamilias(false);
    }
  };

  const handleSeleccionarFamilia = async (familiaItem) => {
    setLoadingFamilias(true);
    try {
      if (familiaItem.cedulaJefe) {
        const res = await familiasAPI.getById(familiaItem.cedulaJefe);

        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setFamiliaSeleccionada(res.data);
          setVistaActual("detalle");
          showCustomToast("Éxito", "Familia cargada correctamente.", "success");
        } else {
          throw new Error("No se encontraron datos completos");
        }
      } else {
        showCustomToast(
          "Información limitada",
          "No se pudo obtener la cédula del jefe de familia. Use la búsqueda por identificación para ver todos los detalles.",
          "info"
        );

        setFamiliaSeleccionada([{
          codigoFamilia: familiaItem.codigoFamilia,
          cantidadPersonas: familiaItem.cantidadPersonas,
          nombreCompletoJefe: familiaItem.nombreJefe,
          nombreCompletoIntegrante: familiaItem.nombreJefe,
          numeroIdentificacion: "No disponible",
          tipoIdentificacion: "No disponible",
          nacionalidad: "No disponible",
          parentesco: "Jefe de familia",
          genero: "No disponible",
          sexo: "No disponible",
          fechaNacimiento: "No disponible",
          discapacidad: "No disponible",
          tipoDiscapacidad: "No disponible",
          subtipoDiscapacidad: "No disponible",
          tieneCondicionSalud: "No disponible",
          tipoCondicionPoblacional: "No disponible",
          contactoEmergencia: "No disponible",
          provincia: "No disponible",
          canton: "No disponible",
          distrito: "No disponible",
          direccionExacta: "No disponible",
          nombreAlbergue: familiaItem.nombreAlbergue
        }]);
        setVistaActual("detalle");
      }
    } catch {
      showCustomToast("Error", "Error al cargar los detalles de la familia.", "error");
    } finally {
      setLoadingFamilias(false);
    }
  };

  const irAAlbergues = () => {
    setVistaActual("albergues");
    setFamilia(null);
    setFamiliaSeleccionada(null);
    setAlbergueSeleccionado(null);
    setFamiliasPorAlbergue([]);
    setIdentificacion("");
  };

  const volverABusqueda = () => {
    setVistaActual("busqueda");
    setFamilia(null);
    setFamiliaSeleccionada(null);
    setAlbergueSeleccionado(null);
    setFamiliasPorAlbergue([]);
    setIdentificacion("");
  };

  const volverAFamilias = () => {
    setVistaActual("familias");
    setFamilia(null);
    setFamiliaSeleccionada(null);
  };

  return {
    identificacion,
    setIdentificacion,
    familia,
    loading,
    albergues,
    familiasPorAlbergue,
    albergueSeleccionado,
    familiaSeleccionada,
    vistaActual,
    loadingAlbergues,
    loadingFamilias,
    handleSubmit,
    handleSeleccionarAlbergue,
    handleSeleccionarFamilia,
    irAAlbergues,
    volverABusqueda,
    volverAFamilias,
  };
};

export default useBusquedaFamiliaExtendida;
