import React, { useState, useEffect, useRef } from "react";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import FoldDownComponent from "../../components/otros/FoldDownComponent.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import SignaturePad from "signature_pad";
import { personasAPI } from "../../helpers/api.js";

const paises = [
  "Belice", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
  "Nicaragua", "Panamá", "Argentina", "Venezuela", "Colombia"
];
const gruposIndigenasCR = [
  "Bribri", "Cabécar", "Maleku", "Guaymí (Ngäbe)", "Boruca", "Térraba", "Chorotega"
];

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

  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  const codigoFamilia = datos.FamiliaDatosPersonales.idFamilia || localStorage.getItem("codigoFamilia") || "";

  useEffect(() => {
    if (codigoFamilia) {
      localStorage.setItem("codigoFamilia", codigoFamilia);
    }
  }, [codigoFamilia]);

  useEffect(() => {
    if (canvasRef.current && !signaturePadRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0)",
      });
    }
  }, []);

  const obtenerIdUsuario = () => localStorage.getItem("idUsuario") || "";

  const validarDatos = (dp) => {
    if (!dp.nombre?.trim()) return "Falta el nombre.";
    if (!dp.numeroIdentificacion?.trim()) return "Falta el número de identificación.";
    if (!dp.tipoIdentificacion?.trim()) return "Falta el tipo de identificación.";
    return null;
  };

  const construirPersonaPayload = (
    dp, ce, cp, fd, codigoFamilia, idUsuarioCreacion
  ) => ({
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
    const res = await personasAPI.create({ personas: payloadArray });
    const resultados = res?.resultados || [];
    const ids = resultados.map(r => r.id);

    if (ids.length !== payloadArray.length) {
      if (res.success && ids.length === 0) {
        console.warn("Advertencia: No se devolvieron IDs, pero la inserción fue exitosa.");
      } else {
        throw new Error("No se pudieron insertar todas las personas");
      }
    }

    if (ids.length > 0) {
      localStorage.setItem("idPersona", ids[0]);
    }

    return ids;
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
      await crearPersonas([personaPayload]);
      setSuccess("¡Datos guardados correctamente!");
    } catch (err) {
      setError("Error al guardar los datos: " + (err.message || err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return "";
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  return (
    <FormContainer
      title="Formulario de Registro Familiar"
      onSubmit={handleSubmit}
    >
      {/* Información Personal */}
      <FoldDownComponent title="Información Personal" open>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Código de Familia"
            name="idFamilia"
            value={codigoFamilia}
            readOnly
          />
          <InputField
            label="Nombre"
            name="nombre"
            value={datos.FamiliaDatosPersonales?.nombre || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  nombre: e.target.value,
                },
              }))
            }
            required
          />
          <InputField
            label="Primer Apellido"
            name="primerApellido"
            value={datos.FamiliaDatosPersonales?.primerApellido || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  primerApellido: e.target.value,
                },
              }))
            }
            required
          />
          <InputField
            label="Segundo Apellido"
            name="segundoApellido"
            value={datos.FamiliaDatosPersonales?.segundoApellido || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  segundoApellido: e.target.value,
                },
              }))
            }
          />
          <SelectField
            label="Tipo de Identificación"
            name="tipoIdentificacion"
            value={datos.FamiliaDatosPersonales?.tipoIdentificacion || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  tipoIdentificacion: e.target.value,
                },
              }))
            }
            options={["Cédula", "Pasaporte", "DIMEX"]}
            required
          />
          <InputField
            label="Número de Identificación"
            name="numeroIdentificacion"
            value={datos.FamiliaDatosPersonales?.numeroIdentificacion || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  numeroIdentificacion: e.target.value,
                },
              }))
            }
            required
          />
          <InputField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            type="date"
            value={datos.FamiliaDatosPersonales?.fechaNacimiento || ""}
            onChange={e => {
              const fecha = e.target.value;
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  fechaNacimiento: fecha,
                },
              }));
            }}
          />
          {/* Mostrar edad calculada */}
          <InputField
            label="Edad"
            name="edad"
            value={
              datos.FamiliaDatosPersonales?.fechaNacimiento
                ? calcularEdad(datos.FamiliaDatosPersonales.fechaNacimiento)
                : ""
            }
            readOnly
          />
          <InputField
            label="Nacionalidad"
            name="nacionalidad"
            value={datos.FamiliaDatosPersonales?.nacionalidad || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  nacionalidad: e.target.value,
                },
              }))
            }
          />
          <InputField
            label="Parentesco"
            name="parentesco"
            value={datos.FamiliaDatosPersonales?.parentesco || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  parentesco: e.target.value,
                },
              }))
            }
          />
          <InputField
            label="Teléfono"
            name="telefono"
            value={datos.FamiliaDatosPersonales?.telefono || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  telefono: e.target.value,
                },
              }))
            }
          />
          <InputField
            label="Contacto de Emergencia"
            name="contactoEmergencia"
            value={datos.FamiliaDatosPersonales?.contactoEmergencia || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  contactoEmergencia: e.target.value,
                },
              }))
            }
          />
          <SelectField
            label="¿Es jefe de familia?"
            name="esJefeFamilia"
            value={datos.FamiliaDatosPersonales?.esJefeFamilia ? "Sí" : "No"}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  esJefeFamilia: e.target.value === "Sí",
                },
              }))
            }
            options={["No", "Sí"]}
          />
          <SelectField
            label="¿Está a cargo de algún menor?"
            name="estaACargoMenor"
            value={
              datos.FamiliaDatosPersonales?.estaACargoMenor === true
                ? "Sí"
                : datos.FamiliaDatosPersonales?.estaACargoMenor === false
                  ? "No"
                  : ""
            }
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaDatosPersonales: {
                  ...prev.FamiliaDatosPersonales,
                  estaACargoMenor: e.target.value === "Sí",
                },
              }))
            }
            options={["Sí", "No"]}
          />
        </div>
      </FoldDownComponent>

      {/* Condiciones Especiales */}
      <FoldDownComponent title="Condiciones Especiales" open>
        <fieldset className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="form-label col-span-2">¿Tiene alguna condición especial?</label>
          <div className="flex items-center gap-4 col-span-2">
            <input
              id="discapacidad-si"
              type="radio"
              name="discapacidad"
              value="true"
              checked={datos.FamiliaCondicionesEspeciales?.discapacidad === true}
              onChange={() =>
                setDatos(prev => ({
                  ...prev,
                  FamiliaCondicionesEspeciales: {
                    ...prev.FamiliaCondicionesEspeciales,
                    discapacidad: true,
                  },
                }))
              }
            />
            <label htmlFor="discapacidad-si" className="me-3">Sí</label>
            <input
              id="discapacidad-no"
              type="radio"
              name="discapacidad"
              value="false"
              checked={datos.FamiliaCondicionesEspeciales?.discapacidad === false}
              onChange={() =>
                setDatos(prev => ({
                  ...prev,
                  FamiliaCondicionesEspeciales: {
                    ...prev.FamiliaCondicionesEspeciales,
                    discapacidad: false,
                  },
                }))
              }
            />
            <label htmlFor="discapacidad-no">No</label>
          </div>

          {datos.FamiliaCondicionesEspeciales?.discapacidad === true && (
            <>
              <SelectField
                label="Tipo de condición especial"
                name="tipoDiscapacidad"
                value={datos.FamiliaCondicionesEspeciales?.tipoDiscapacidad || ""}
                onChange={e =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      tipoDiscapacidad: e.target.value,
                    },
                  }))
                }
                options={[
                  "Embarazo", "Presión", "Hipertensión", "Diabetes",
                  "Problemas cardíacos", "Problemas respiratorios",
                  "Enfermedad renal", "Cáncer", "Otro"
                ]}
              />
              {datos.FamiliaCondicionesEspeciales?.tipoDiscapacidad === "Otro" && (
                <InputField
                  label="Especifique otro tipo de condición"
                  name="otroTipoDiscapacidad"
                  value={datos.FamiliaCondicionesEspeciales?.otroTipoDiscapacidad || ""}
                  onChange={e =>
                    setDatos(prev => ({
                      ...prev,
                      FamiliaCondicionesEspeciales: {
                        ...prev.FamiliaCondicionesEspeciales,
                        otroTipoDiscapacidad: e.target.value,
                      },
                    }))
                  }
                />
              )}
              <SelectField
                label="Subtipo de condición especial"
                name="subtipoDiscapacidad"
                value={datos.FamiliaCondicionesEspeciales?.subtipoDiscapacidad || ""}
                onChange={e =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      subtipoDiscapacidad: e.target.value,
                    },
                  }))
                }
                options={["Presión baja", "Presión alta", "Crónica", "Otro"]}
              />
              {datos.FamiliaCondicionesEspeciales?.subtipoDiscapacidad === "Otro" && (
                <InputField
                  label="Especifique otro subtipo"
                  name="otroSubtipoDiscapacidad"
                  value={datos.FamiliaCondicionesEspeciales?.otroSubtipoDiscapacidad || ""}
                  onChange={e =>
                    setDatos(prev => ({
                      ...prev,
                      FamiliaCondicionesEspeciales: {
                        ...prev.FamiliaCondicionesEspeciales,
                        otroSubtipoDiscapacidad: e.target.value,
                      },
                    }))
                  }
                />
              )}
              <InputField
                label="Describa brevemente la condición especial"
                name="descripcionCondicionSalud"
                value={datos.FamiliaCondicionesEspeciales?.descripcionCondicionSalud || ""}
                onChange={e =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      descripcionCondicionSalud: e.target.value,
                    },
                  }))
                }
                type="textarea"
              />
            </>
          )}
        </fieldset>
      </FoldDownComponent>

      {/* Características Poblacionales */}
      <FoldDownComponent title="Características Poblacionales" open>
        <fieldset className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              id="indigena"
              name="indigena"
              checked={datos.FamiliaCaracteristicasPoblacionales?.indigena || false}
              onChange={e =>
                setDatos(prev => ({
                  ...prev,
                  FamiliaCaracteristicasPoblacionales: {
                    ...prev.FamiliaCaracteristicasPoblacionales,
                    indigena: e.target.checked,
                  },
                }))
              }
              className="form-check-input"
            />
            <label htmlFor="indigena" className="ms-2">Población Indígena</label>
          </div>

          {datos.FamiliaCaracteristicasPoblacionales?.indigena && (
            <SelectField
              label="¿A qué pueblo indígena pertenece?"
              name="grupoIndigena"
              value={datos.FamiliaCaracteristicasPoblacionales?.grupoIndigena || ""}
              onChange={e =>
                setDatos(prev => ({
                  ...prev,
                  FamiliaCaracteristicasPoblacionales: {
                    ...prev.FamiliaCaracteristicasPoblacionales,
                    grupoIndigena: e.target.value,
                  },
                }))
              }
              options={gruposIndigenasCR}
            />
          )}

          <SelectField
            label="¿Cómo se autoidentifica según su origen e identidad cultural?"
            name="autoidentificacionCultural"
            value={datos.FamiliaCaracteristicasPoblacionales?.autoidentificacionCultural || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaCaracteristicasPoblacionales: {
                  ...prev.FamiliaCaracteristicasPoblacionales,
                  autoidentificacionCultural: e.target.value,
                },
              }))
            }
            options={[
              "china", "indígena", "afrodescendiente", "mestiza",
              "blanca", "otra", "NS/NR"
            ]}
          />

          <SelectField
            label="País de origen"
            name="paises"
            value={datos.FamiliaCaracteristicasPoblacionales?.paises || ""}
            onChange={e =>
              setDatos(prev => ({
                ...prev,
                FamiliaCaracteristicasPoblacionales: {
                  ...prev.FamiliaCaracteristicasPoblacionales,
                  paises: e.target.value,
                },
              }))
            }
            options={paises}
          />
        </fieldset>
      </FoldDownComponent>

      {/* Firma Digital */}
      {datos.FamiliaDatosPersonales.esJefeFamilia && (
        <FoldDownComponent title="Firma Digital" open>
          <div className="flex flex-col items-center">
            <div style={{ border: "1px solid black", width: 400, height: 150 }}>
              <canvas ref={canvasRef} width={400} height={150} />
            </div>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const imagen = canvas.toDataURL("image/png");
                    setDatos(prev => ({
                      ...prev,
                      FamiliaFirmaDigital: {
                        ...prev.FamiliaFirmaDigital,
                        imagen,
                      },
                    }));
                  }
                }}
                className="btn btn-primary mt-2"
              >
                Guardar Firma
              </button>
              <button
                type="button"
                onClick={() => {
                  signaturePadRef.current?.clear();
                  setDatos(prev => ({
                    ...prev,
                    FamiliaFirmaDigital: {
                      ...prev.FamiliaFirmaDigital,
                      imagen: null,
                    },
                  }));
                }}
                className="btn btn-secondary mt-2 ms-2"
              >
                Limpiar Firma
              </button>
            </div>
            {datos.FamiliaFirmaDigital?.imagen && (
              <div style={{ marginTop: 10 }}>
                <p>Firma guardada:</p>
                <img
                  src={datos.FamiliaFirmaDigital.imagen}
                  alt="Firma digital"
                  style={{ border: "1px solid #ccc" }}
                />
              </div>
            )}
          </div>
        </FoldDownComponent>
      )}

      {loading && <p className="mensaje-cargando">Guardando datos...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="flex justify-center mt-8">
        <SubmitButton width="w-full" loading={loading}>
          Guardar Datos
        </SubmitButton>
      </div>
    </FormContainer>
  );
};

export default FamiliaFormulario;
