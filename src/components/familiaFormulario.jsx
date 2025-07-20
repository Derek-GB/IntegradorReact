import React, { useState, useEffect } from "react";
import FamiliaDatosPersonales from "./familiaDatosPersonales.jsx";
import FamiliaCondicionesEspeciales from "./FamiliaCondicionesEspeciales.jsx";
import FamiliaCaracteristicasPoblacionales from "./familiaCaracteristicasPoblacionales.jsx";
import FamiliaFirmaDigital from "./FamiliaFirmaDigital.jsx";
import {
  personasAPI,
  condicionesEspecialesAPI,
  caracteristicasPoblacionalesAPI,
  firmasDigitalesAPI,
} from "../helpers/api";
import "../styles/familiaFormulario.css";

const FamiliaFormulario = () => {
  const [datos, setDatos] = useState({
    FamiliaDatosPersonales: {},
    FamiliaCondicionesEspeciales: {},
    FamiliaCaracteristicasPoblacionales: {},
    FamiliaFirmaDigital: {},
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Código de familia dinámico desde input
  const codigoFamilia = datos.FamiliaDatosPersonales.idFamilia || "";

  // Guardar en localStorage automáticamente si el usuario lo modifica
  useEffect(() => {
    if (codigoFamilia) {
      localStorage.setItem("codigoFamilia", codigoFamilia);
    }
  }, [codigoFamilia]);

  const obtenerIdUsuario = () => localStorage.getItem("idUsuario") || "";

  const validarDatos = (dp) => {
    if (!dp.nombre?.trim()) return "Falta el nombre.";
    if (!dp.numeroIdentificacion?.trim()) return "Falta el número de identificación.";
    if (!dp.tipoIdentificacion?.trim()) return "Falta el tipo de identificación.";
    return null;
  };

  const construirPersonaPayload = (dp, ce, cp, fd, codigoFamilia, idUsuarioCreacion) => ({
    tieneCondicionSalud: ce.tieneCondicionSalud ?? true,
    descripcionCondicionSalud: ce.descripcionCondicionSalud || ce.otrasCondiciones || "",
    discapacidad: ce.discapacidad ?? false,
    tipoDiscapacidad: ce.tipoDiscapacidad || "",
    subtipoDiscapacidad: ce.subtipoDiscapacidad || "",
    paisOrigen: cp.paises || "",
    autoidentificacionCultural: cp.autoidentificacionCultural || "",
    puebloIndigena: cp.grupoIndigena || "",
    firma: fd.imagen || "",
    idFamilia: codigoFamilia,
    nombre: dp.nombre || "",
    primerApellido: dp.primerApellido || "",
    segundoApellido: dp.segundoApellido || "",
    tipoIdentificacion: dp.tipoIdentificacion || "Cédula",
    numeroIdentificacion: dp.numeroIdentificacion || "",
    nacionalidad: dp.nacionalidad || "",
    parentesco: dp.parentesco || "",
    esJefeFamilia: dp.esJefeFamilia ?? false,
    fechaNacimiento: dp.fechaNacimiento || "",
    genero: dp.genero || "",
    sexo: dp.sexo || "",
    telefono: dp.telefono || "",
    contactoEmergencia: dp.contactoEmergencia || "",
    observaciones: dp.observaciones || "",
    estaACargoMenor: dp.estaACargoMenor ?? false,
    idUsuarioCreacion,
  });

  const crearPersonas = async (payloadArray) => {

  console.log("Payload a enviar", payloadArray);  
    
  const res = await personasAPI.create(payloadArray);
  console.log("Respuesta API", res);

  const resultados = res.resultados || [];
  const ids = resultados.map(r => r.id);

  if (ids.length !== payloadArray.length) {
    throw new Error("No se pudieron insertar todas las personas");
  }
  // Guardás el primer ID o los guardás todos (según lo que necesités)
  localStorage.setItem("idPersona", ids[0]);
  return ids;
};


  const crearCondicionesEspeciales = async (idPersona, ce) => {
    return condicionesEspecialesAPI.create({
      idPersona,
      discapacidad: ce.discapacidad ?? false,
      tipoDiscapacidad: ce.tipoDiscapacidad || "",
      subtipoDiscapacidad: ce.subtipoDiscapacidad || "",
      tieneCondicionSalud: ce.tieneCondicionSalud ?? true,
      condicionSaludId: 1,
    });
  };

  const crearCaracteristicasPoblacionales = async (idPersona, cp) => {
    return caracteristicasPoblacionalesAPI.create({
      idPersona,
      migrante: cp.migrante ?? false,
      indigena: cp.indigena ?? false,
    });
  };

  const crearFirmaDigital = async (idPersona, fd) => {
    if (!fd.imagen) return;
    return firmasDigitalesAPI.create({
      idPersona,
      firma: fd.imagen,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const dp = datos.FamiliaDatosPersonales;
    const ce = datos.FamiliaCondicionesEspeciales;
    const cp = datos.FamiliaCaracteristicasPoblacionales;
    const fd = datos.FamiliaFirmaDigital;

    const mensajeError = validarDatos(dp);
    if (mensajeError) {
      setError("Error: " + mensajeError);
      setLoading(false);
      return;
    }

    if (!codigoFamilia) {
      setError("No se encontró el código de familia. Asegúrese de ingresarlo.");
      setLoading(false);
      return;
    }

    const idUsuarioCreacion = obtenerIdUsuario();
    if (!idUsuarioCreacion) {
      setError("No se encontró el idUsuario en localStorage.");
      setLoading(false);
      return;
    }

    try {
      const personaPayload = construirPersonaPayload(dp, ce, cp, fd, codigoFamilia, idUsuarioCreacion);
      const [personaId] = await crearPersonas([personaPayload]);

      console.log("Payload enviado", [personaPayload]);
      console.log("Respuesta completa", res);
      console.log("Resultados:", res.data?.resultados);


      await crearCondicionesEspeciales(personaId, ce);
      await crearCaracteristicasPoblacionales(personaId, cp);
      await crearFirmaDigital(personaId, fd);

      setSuccess("¡Datos guardados correctamente!");
    } catch (err) {
      setError("Error al guardar los datos: " + (err.message || err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="familia-formulario-fullscreen">
      <form onSubmit={handleSubmit} className="familiaFormulario">
        <div className="ficha-persona">
          <FamiliaDatosPersonales
            datos={datos.FamiliaDatosPersonales}
            setDatos={(nuevosDatos) =>
              setDatos((prev) => ({
                ...prev,
                FamiliaDatosPersonales: nuevosDatos,
              }))
            }
          />
        </div>

        <div className="ficha-persona">
          <FamiliaCondicionesEspeciales
            datos={datos.FamiliaCondicionesEspeciales}
            setDatos={(nuevosDatos) =>
              setDatos((prev) => ({
                ...prev,
                FamiliaCondicionesEspeciales: nuevosDatos,
              }))
            }
          />
        </div>

        <div className="ficha-persona">
          <FamiliaCaracteristicasPoblacionales
            datos={datos.FamiliaCaracteristicasPoblacionales}
            setDatos={(nuevosDatos) =>
              setDatos((prev) => ({
                ...prev,
                FamiliaCaracteristicasPoblacionales: nuevosDatos,
              }))
            }
          />
        </div>

        {datos.FamiliaDatosPersonales.esJefeFamilia && (
          <div className="ficha-persona">
            <FamiliaFirmaDigital
              datos={datos.FamiliaFirmaDigital}
              setDatos={(nuevosDatos) =>
                setDatos((prev) => ({
                  ...prev,
                  FamiliaFirmaDigital: nuevosDatos,
                }))
              }
            />
          </div>
        )}

        {loading && <p className="mensaje-cargando">Guardando datos...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={loading}>Guardar Datos</button>
      </form>
    </div>
  );
};

export default FamiliaFormulario;
