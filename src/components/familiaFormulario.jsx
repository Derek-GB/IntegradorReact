import React, { useState } from "react";
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

  const validarDatos = (dp) => {
    if (!dp.nombre?.trim()) return "Falta el nombre.";
    if (!dp.numeroIdentificacion?.trim()) return "Falta el número de identificación.";
    if (!dp.tipoIdentificacion?.trim()) return "Falta el tipo de identificación.";
    return null;
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

    try {
      // Armar el payload según el schema proporcionado
      const personaPayload = {
        tieneCondicionSalud: ce.tieneCondicionSalud ?? true,
        descripcionCondicionSalud: ce.descripcionCondicionSalud || ce.otrasCondiciones || "",
        discapacidad: ce.discapacidad ?? false,
        tipoDiscapacidad: ce.tipoDiscapacidad || "",
        subtipoDiscapacidad: ce.subtipoDiscapacidad || "",
        paisOrigen: cp.paises || "",
        autoidentificacionCultural: cp.autoidentificacionCultural || "",
        puebloIndigena: cp.grupoIndigena || "",
        firma: fd.imagen || "",
        idFamilia: 1,
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
        idUsuarioCreacion: 1,
      };

      // Enviar a la API principal
      const personaRes = await personasAPI.create([personaPayload]);
      const personaId = personaRes.id || personaRes.data?.id;
      if (!personaId) throw new Error("No se recibió el ID de la persona");

      // Enviar a las APIs relacionadas (opcional según tu lógica)
      await condicionesEspecialesAPI.create({
        idPersona: personaId,
        discapacidad: ce.discapacidad ?? false,
        tipoDiscapacidad: ce.tipoDiscapacidad || "",
        subtipoDiscapacidad: ce.subtipoDiscapacidad || "",
        tieneCondicionSalud: ce.tieneCondicionSalud ?? true,
        condicionSaludId: 1,
      });

      await caracteristicasPoblacionalesAPI.create({
        idPersona: personaId,
        migrante: cp.migrante ?? false,
        indigena: cp.indigena ?? false,
      });

      if (fd.imagen) {
        await firmasDigitalesAPI.create({
          idPersona: personaId,
          firma: fd.imagen,
        });
      }

      setSuccess("¡Datos guardados correctamente!");
      // Opcional: resetear el formulario
      // setDatos({
      //   FamiliaDatosPersonales: {},
      //   FamiliaCondicionesEspeciales: {},
      //   FamiliaCaracteristicasPoblacionales: {},
      //   FamiliaFirmaDigital: {},
      // });
    } catch (err) {
      setError("Error al guardar los datos: " + (err.message || err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FamiliaDatosPersonales
        datos={datos.FamiliaDatosPersonales}
        setDatos={(nuevosDatos) =>
          setDatos((prev) => ({
            ...prev,
            FamiliaDatosPersonales: nuevosDatos,
          }))
        }
      />

      <FamiliaCondicionesEspeciales
        datos={datos.FamiliaCondicionesEspeciales}
        setDatos={(nuevosDatos) =>
          setDatos((prev) => ({
            ...prev,
            FamiliaCondicionesEspeciales: nuevosDatos,
          }))
        }
      />

      <FamiliaCaracteristicasPoblacionales
        datos={datos.FamiliaCaracteristicasPoblacionales}
        setDatos={(nuevosDatos) =>
          setDatos((prev) => ({
            ...prev,
            FamiliaCaracteristicasPoblacionales: nuevosDatos,
          }))
        }
      />

      <FamiliaFirmaDigital
        datos={datos.FamiliaFirmaDigital}
        setDatos={(nuevosDatos) =>
          setDatos((prev) => ({
            ...prev,
            FamiliaFirmaDigital: nuevosDatos,
          }))
        }
      />

      {/* Debug: muestra JSON */}
      {/* <pre
        style={{
          background: "#f0f0f0",
          padding: "10px",
          maxHeight: "150px",
          overflow: "auto",
          fontSize: "12px",
          marginBottom: "1rem",
        }}
      >
        {JSON.stringify(datos, null, 2)}
      </pre> */}

      {loading && <p>Guardando datos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button type="submit" disabled={loading}>
        Guardar Datos
      </button>
    </form>
  );
};

export default FamiliaFormulario;
