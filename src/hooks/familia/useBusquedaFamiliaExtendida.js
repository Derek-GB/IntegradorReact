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
  const [vistaActual, setVistaActual] = useState('busqueda');
  const [loadingAlbergues, setLoadingAlbergues] = useState(false);
  const [loadingFamilias, setLoadingFamilias] = useState(false);

  // Cargar todos los albergues al inicio
  useEffect(() => {
    const cargarAlbergues = async () => {
      setLoadingAlbergues(true);
      try {
        const res = await alberguesAPI.getAll();
        if (res && res.data) {
          setAlbergues(res.data);
        }
      } catch (err) {
        showCustomToast("Error", "Error al cargar los albergues.", "error");
      } finally {
        setLoadingAlbergues(false);
      }
    };

    cargarAlbergues();
  }, []);

  // Buscar familia por identificación (mantiene funcionalidad original)
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
        setVistaActual('detalle');
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
        showCustomToast(
          "Error",
          "Error al buscar la familia.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar un albergue y cargar sus familias
  const handleSeleccionarAlbergue = async (albergue) => {
    setAlbergueSeleccionado(albergue);
    setLoadingFamilias(true);
    setVistaActual('familias');

    try {
      // Obtener todas las familias y filtrar por albergue
      const familiasRes = await familiasAPI.getAll();
      const personasRes = await personasAPI.getAll();
      
      if (familiasRes && familiasRes.data && personasRes && personasRes.data) {
        // Filtrar familias por el ID del albergue seleccionado
        const familiasFiltradas = familiasRes.data.filter(familia => 
          familia.idAlbergue === albergue.id
        );

        // Agrupar por código de familia y agregar información del jefe
        const familiasConInfo = [];
        const codigosProcesados = new Set();

        for (const familia of familiasFiltradas) {
          if (!codigosProcesados.has(familia.codigoFamilia)) {
            codigosProcesados.add(familia.codigoFamilia);
            
            // Buscar al jefe de familia en la tabla Persona
            // Primero buscamos personas que tengan esJefeFamilia = true y idFamilia coincida
            const jefeFamilia = personasRes.data.find(persona => 
              persona.esJefeFamilia === 1 && persona.idFamilia === familia.id
            );

            familiasConInfo.push({
              ...familia,
              nombreJefe: jefeFamilia ? `${jefeFamilia.nombre} ${jefeFamilia.primerApellido} ${jefeFamilia.segundoApellido || ''}`.trim() : "No disponible",
              cedulaJefe: jefeFamilia ? jefeFamilia.numeroIdentificacion : null,
              nombreAlbergue: albergue.nombre
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
    } catch (err) {
      showCustomToast("Error", "Error al cargar las familias del albergue.", "error");
      console.error("Error:", err);
    } finally {
      setLoadingFamilias(false);
    }
  };

  // Seleccionar una familia específica y obtener todos sus miembros
  const handleSeleccionarFamilia = async (familiaItem) => {
    setLoadingFamilias(true);
    try {
      if (familiaItem.cedulaJefe) {
        // Si tenemos la cédula del jefe, usar el endpoint que funciona perfectamente
        const res = await familiasAPI.getById(familiaItem.cedulaJefe);
        
        if (res && Array.isArray(res.data) && res.data.length > 0) {
          setFamiliaSeleccionada(res.data);
          setVistaActual('detalle');
          showCustomToast("Éxito", "Familia cargada correctamente.", "success");
        } else {
          throw new Error("No se encontraron datos completos");
        }
      } else {
        // Si no tenemos cédula, mostrar mensaje informativo
        showCustomToast(
          "Información limitada",
          "No se pudo obtener la cédula del jefe de familia. Use la búsqueda por identificación para ver todos los detalles.",
          "info"
        );
        
        // Crear estructura básica para mostrar lo que podemos
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
        setVistaActual('detalle');
      }
    } catch (err) {
      showCustomToast("Error", "Error al cargar los detalles de la familia.", "error");
      console.error("Error:", err);
    } finally {
      setLoadingFamilias(false);
    }
  };

  // Navegación entre vistas
  const irAAlbergues = () => {
    setVistaActual('albergues');
    setFamiliasPorAlbergue([]);
    setAlbergueSeleccionado(null);
    setFamiliaSeleccionada(null);
  };

  const volverABusqueda = () => {
    setVistaActual('busqueda');
    setFamilia(null);
    setFamiliasPorAlbergue([]);
    setAlbergueSeleccionado(null);
    setFamiliaSeleccionada(null);
    setIdentificacion("");
  };

  const volverAFamilias = () => {
    setVistaActual('familias');
    setFamiliaSeleccionada(null);
  };

  return {
    // Estados principales
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
    
    // Funciones
    handleSubmit,
    handleSeleccionarAlbergue,
    handleSeleccionarFamilia,
    irAAlbergues,
    volverABusqueda,
    volverAFamilias,
  };
};

export default useBusquedaFamiliaExtendida;