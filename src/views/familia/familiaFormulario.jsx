import React, { useState } from "react";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import FoldDownComponent from "../../components/otros/FoldDownComponent.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import useIntegrante from "../../hooks/familia/useIntegrante.js";
import { personasAPI,firmasDigitalesAPI } from "../../helpers/api.js";
import Alerta from "../../components/Alerta.jsx"; // Importar el componente Alerta

const FamiliaFormulario = () => {
  const cantidad = parseInt(localStorage.getItem("cantidadIntegrantes")) || 0;
  const [indice, setIndice] = useState(0);
  
  // Estados para la alerta
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("warning");
  
  // Array para guardar los datos de cada integrante
  const [datosIntegrantes, setDatosIntegrantes] = useState(
    Array(cantidad).fill(null).map(() => ({
      FamiliaDatosPersonales: {},
      FamiliaCondicionesEspeciales: {},
      FamiliaCaracteristicasPoblacionales: {},
      FamiliaFirmaDigital: {},
    }))
  );

  // Estado actual basado en el índice
  const [datos, setDatos] = useState(datosIntegrantes[indice] || {
    FamiliaDatosPersonales: {},
    FamiliaCondicionesEspeciales: {},
    FamiliaCaracteristicasPoblacionales: {},
    FamiliaFirmaDigital: {},
  });

  // Función para guardar los datos del integrante actual
  const guardarDatosIntegrante = () => {
    setDatosIntegrantes(prev => {
      const nuevos = [...prev];
      nuevos[indice] = { ...datos };
      return nuevos;
    });
  };

  // Función para cargar los datos del integrante
  const cargarDatosIntegrante = (indiceIntegrante) => {
    const datosIntegrante = datosIntegrantes[indiceIntegrante];
    if (datosIntegrante) {
      setDatos(datosIntegrante);
    } else {
      setDatos({
        FamiliaDatosPersonales: {},
        FamiliaCondicionesEspeciales: {},
        FamiliaCaracteristicasPoblacionales: {},
        FamiliaFirmaDigital: {},
      });
    }
  };

  const handleSiguiente = () => {
    if (indice < cantidad - 1) {
      // Guardar los datos del integrante actual
      guardarDatosIntegrante();
      
      // Limpiar mensajes de estado
      setError(null);
      setSuccess(null);
      
      // Avanzar al siguiente integrante
      const nuevoIndice = indice + 1;
      setIndice(nuevoIndice);
      
      // Cargar los datos del siguiente integrante (puede estar vacío)
      cargarDatosIntegrante(nuevoIndice);
    } else {
      // Guardar datos actuales antes de enviar
      guardarDatosIntegrante();
      // Ejecutar la lógica de guardar cuando sea el último integrante
      handleSubmit();
    }
  };

  const handleRegresar = () => {
    if (indice > 0) {
      // Guardar los datos del integrante actual
      guardarDatosIntegrante();
      
      // Limpiar mensajes de estado
      setError(null);
      setSuccess(null);
      
      // Regresar al integrante anterior
      const nuevoIndice = indice - 1;
      setIndice(nuevoIndice);
      
      // Cargar los datos del integrante anterior
      cargarDatosIntegrante(nuevoIndice);
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    edad,
    handleChange,
    paises,
    gruposIndigenasCR,
    canvasRef,
    signaturePadRef,
    guardarFirma,
    limpiarFirma,
  } = useIntegrante(datos, setDatos);

  const dp = datos.FamiliaDatosPersonales;
  const ce = datos.FamiliaCondicionesEspeciales;
  const cp = datos.FamiliaCaracteristicasPoblacionales;
  const fd = datos.FamiliaFirmaDigital;

  // Función para obtener la fecha máxima (hoy)
  const obtenerFechaMaxima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  // Corregir la obtención del código de familia
  const codigoFamilia = localStorage.getItem("codigoFamilia") || "";

  const updateCampo = (campo, valor) => {
    setDatos(prev => ({
      ...prev,
      FamiliaDatosPersonales: {
        ...prev.FamiliaDatosPersonales,
        [campo]: valor,
      },
    }));
  };
  

  const obtenerIdUsuario = () => localStorage.getItem("idUsuario") || "";

  // Función para verificar si ya existe un jefe de familia
  const verificarJefeFamilia = () => {
    let jefeExistente = false;
    let indiceJefe = -1;
    
    // Revisar en los datos guardados de otros integrantes
    for (let i = 0; i < datosIntegrantes.length; i++) {
      if (i !== indice) { // Excluir el integrante actual
        const integranteDatos = datosIntegrantes[i];
        const esJefe = integranteDatos?.FamiliaDatosPersonales?.esJefeFamilia === "Sí" || 
                      integranteDatos?.FamiliaDatosPersonales?.esJefeFamilia === true;
        if (esJefe) {
          jefeExistente = true;
          indiceJefe = i;
          break;
        }
      }
    }
    
    return { jefeExistente, indiceJefe };
  };

  // Función modificada para manejar el cambio de jefe de familia
  const handleJefeFamiliaChange = (e) => {
    const nuevoValor = e.target.value;
    
    if (nuevoValor === "Sí") {
      const { jefeExistente, indiceJefe } = verificarJefeFamilia();
      
      if (jefeExistente) {
        // Mostrar alerta en lugar de window.confirm
        setMensajeAlerta(
          `Ya existe un jefe de familia en el integrante ${indiceJefe + 1}. ` +
          `¿Desea cambiar el jefe de familia al integrante actual?`
        );
        setTipoAlerta("warning");
        setMostrarAlerta(true);
        
        // No proceder automáticamente, esperar confirmación del usuario
        return;
      }
    }
    
    // Si no hay conflicto o está seleccionando "No", proceder normalmente
    handleChange(e, "FamiliaDatosPersonales");
  };

  // Función para confirmar el cambio de jefe de familia
  const confirmarCambioJefe = () => {
    const { indiceJefe } = verificarJefeFamilia();
    
    // Quitar el rol de jefe al integrante anterior
    setDatosIntegrantes(prev => {
      const nuevos = [...prev];
      if (nuevos[indiceJefe] && nuevos[indiceJefe].FamiliaDatosPersonales) {
        nuevos[indiceJefe].FamiliaDatosPersonales.esJefeFamilia = false;
      }
      return nuevos;
    });
    
    // Asignar el rol al integrante actual
    setDatos(prev => ({
      ...prev,
      FamiliaDatosPersonales: {
        ...prev.FamiliaDatosPersonales,
        esJefeFamilia: "Sí"
      }
    }));
    
    // Cerrar alerta y mostrar mensaje de éxito
    setMostrarAlerta(false);
    setMensajeAlerta("Jefe de familia cambiado exitosamente");
    setTipoAlerta("success");
    setMostrarAlerta(true);
  };

  // Función para cancelar el cambio
  const cancelarCambioJefe = () => {
    setMostrarAlerta(false);
    // No hacer nada más, mantener el valor anterior
  };

  // Validación adicional en validarDatos
  const validarDatos = (dp) => {
    if (!dp.nombre?.trim()) return "Falta el nombre.";
    if (!dp.numeroIdentificacion?.trim()) return "Falta el número de identificación.";
    if (!dp.tipoIdentificacion?.trim()) return "Falta el tipo de identificación.";
    return null;
  };
  

  // Validación adicional antes de enviar
  const validarJefeFamiliaGlobal = () => {
    const todosLosIntegrantes = [...datosIntegrantes];
    todosLosIntegrantes[indice] = datos; // Incluir el integrante actual
    
    let contadorJefes = 0;
    
    for (let i = 0; i < todosLosIntegrantes.length; i++) {
      const integranteDatos = todosLosIntegrantes[i];
      const esJefe = integranteDatos?.FamiliaDatosPersonales?.esJefeFamilia === "Sí" || 
                    integranteDatos?.FamiliaDatosPersonales?.esJefeFamilia === true;
      if (esJefe) {
        contadorJefes++;
      }
    }
    
    if (contadorJefes === 0) {
      return "Debe designar un jefe de familia.";
    }
    
    if (contadorJefes > 1) {
      return "Solo puede haber un jefe de familia por familia.";
    }
    
    return null;
  };

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

  // Nueva función para crear firma digital
  const crearFirmaDigital = async (idPersona, firma) => {
    const firmaPayload = {
      idPersona: idPersona,
      firma: firma
    };
    
    const res = await firmasDigitalesAPI.create(firmaPayload);
    return res;
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
    // Removemos la firma de aquí ya que va en el segundo POST
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

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validación de jefe de familia antes de enviar
    const errorJefe = validarJefeFamiliaGlobal();
    if (errorJefe) {
      setError("Error: " + errorJefe);
      setLoading(false);
      return;
    }

    // Usar los datos actuales para el último integrante
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
      // Procesar todos los integrantes guardados
      const todosLosIntegrantes = [...datosIntegrantes];
      todosLosIntegrantes[indice] = datos; // Incluir el último integrante actual

      for (let i = 0; i < todosLosIntegrantes.length; i++) {
        const integranteDatos = todosLosIntegrantes[i];
        const dpInt = integranteDatos.FamiliaDatosPersonales;
        const ceInt = integranteDatos.FamiliaCondicionesEspeciales;
        const cpInt = integranteDatos.FamiliaCaracteristicasPoblacionales;
        const fdInt = integranteDatos.FamiliaFirmaDigital;

        // Validar cada integrante
        const errorInt = validarDatos(dpInt);
        if (errorInt) {
          setError(`Error en integrante ${i + 1}: ${errorInt}`);
          setLoading(false);
          return;
        }

        // 1. Crear la persona
        const personaPayload = construirPersonaPayload(dpInt, ceInt, cpInt, fdInt, codigoFamilia, idUsuarioCreacion);
        const ids = await crearPersonas([personaPayload]);
        
        // 2. Si hay firma digital y se creó la persona exitosamente, crear la firma
        if (fdInt.imagen && ids.length > 0) {
          await crearFirmaDigital(ids[0], fdInt.imagen);
        }
      }
      
      setSuccess("¡Datos de todos los integrantes guardados correctamente!");
      
      // Mostrar mensaje de finalización
      setTimeout(() => {
        alert("Registro de integrantes completado.");
        // Aquí puedes navegar a otra página si lo deseas
      }, 1000);
      
    } catch (err) {
      setError("Error al guardar los datos: " + (err.message || err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer
      title={`Formulario de Registro Familiar - Integrante ${indice + 1} de ${cantidad}`}
    >
      {/* Mostrar alerta si está activa */}
      {mostrarAlerta && (
        <div className="mb-4">
          <Alerta
            mensaje={mensajeAlerta}
            tipo={tipoAlerta}
            duracion={tipoAlerta === "warning" ? 0 : 3000} // No cerrar automáticamente si es warning
            onClose={() => setMostrarAlerta(false)}
          />
          
          {/* Botones de confirmación solo para alertas de warning */}
          {tipoAlerta === "warning" && (
            <div className="flex justify-center gap-4 mt-4">
              <SubmitButton
                type="button"
                onClick={confirmarCambioJefe}
                width="w-auto"
                className="!bg-green-500 hover:!bg-green-600 !text-white"
              >
                Sí, cambiar jefe
              </SubmitButton>
              <SubmitButton
                type="button"
                onClick={cancelarCambioJefe}
                width="w-auto"
                className="!bg-red-500 hover:!bg-red-600 !text-white"
              >
                No, mantener actual
              </SubmitButton>
            </div>
          )}
        </div>
      )}

      {/* Información Personal */}
      <FoldDownComponent title="Información Personal" open>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Código de Familia"
            name="codigoFamilia"
            value={codigoFamilia}
            readOnly
          />
          <InputField
            label="Nombre"
            name="nombre"
            value={dp.nombre || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            required
          />
          <InputField
            label="Primer Apellido"
            name="primerApellido"
            value={dp.primerApellido || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            required
          />
          <InputField
            label="Segundo Apellido"
            name="segundoApellido"
            value={dp.segundoApellido || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
          />
          <SelectField
            label="Tipo de Identificación"
            name="tipoIdentificacion"
            value={dp.tipoIdentificacion || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["Cédula", "Pasaporte", "DIMEX"]}
            required
          />
          <InputField
            label="Número de Identificación"
            name="numeroIdentificacion"
            value={dp.numeroIdentificacion || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            required
          />
          <InputField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            type="date"
            value={dp.fechaNacimiento || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            max={obtenerFechaMaxima()}
          />
          <InputField
            label="Edad"
            name="edad"
            value={edad}
            readOnly
          />
          <InputField
            label="Nacionalidad"
            name="nacionalidad"
            value={dp.nacionalidad || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
          />
          <SelectField
            label="Usted diría que se identifica como (Género)"
            name="genero"
            value={dp.genero || "Prefiero no decir"}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["Hombre", "Mujer","Hombre trans/transmasculino","Mujer trans/transfemenina","No se identifica con ninguna de las anteriores","Otro", "Prefiero no decir"]}
          />
          
          <SelectField
            label="Sexo"
            name="sexo"
            value={dp.sexo || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["Masculino", "Femenino","Intersexo","Prefiero no decir"]}
          />
          
          <InputField
            label="Observaciones"
            name="observaciones"
            value={dp.observaciones || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            type="textarea"
          />
          <InputField
            label="Parentesco"
            name="parentesco"
            value={dp.parentesco || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
          />
          <InputField
            label="Teléfono"
            name="telefono"
            value={dp.telefono || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
          />
          <InputField
            label="Contacto de Emergencia"
            name="contactoEmergencia"
            value={dp.contactoEmergencia || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
          />
          <SelectField
            label="¿Es jefe de familia?"
            name="esJefeFamilia"
            value={dp.esJefeFamilia === true || dp.esJefeFamilia === "Sí" ? "Sí" : "No"}
            onChange={handleJefeFamiliaChange}
            options={["No", "Sí"]}
          />
          <SelectField
            label="¿Está a cargo de algún menor?"
            name="estaACargoMenor"
            value={
              dp.estaACargoMenor === true
                ? "Sí"
                : dp.estaACargoMenor === false
                  ? "No"
                  : ""
            }
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["Sí", "No"]}
          />
        </div>
      </FoldDownComponent>

      {/* Condiciones Especiales */}
      <FoldDownComponent title="Condiciones Especiales" open>
        <fieldset className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="text-teal-600 font-bold select-none">¿Tiene alguna condición especial?</label>
          <div className="flex items-center gap-6 col-span-2 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="condicion-si"
                type="radio"
                name="tieneCondicionSalud"
                checked={ce.tieneCondicionSalud === true}
                onChange={() =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      tieneCondicionSalud: true,
                    },
                  }))
                }
                className="form-radio h-5 w-5 text-teal-600 border-teal-600 focus:ring-teal-500"
              />
              <span className="text-teal-600 font-semibold select-none">Sí</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                id="condicion-no"
                type="radio"
                name="tieneCondicionSalud"
                checked={ce.tieneCondicionSalud === false}
                onChange={() =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      tieneCondicionSalud: false,
                    },
                  }))
                }
                className="form-radio h-5 w-5 text-teal-600 border-teal-600 focus:ring-teal-500"
              />
              <span className="text-teal-600 font-semibold select-none">No</span>
            </label>
          </div>
          {ce.tieneCondicionSalud === true && (
            <>
              <SelectField
                label="Tipo de condición especial"
                name="tipoDiscapacidad"
                value={ce.tipoDiscapacidad || ""}
                onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                options={[
                  "Embarazo", "Presión", "Hipertensión", "Diabetes",
                  "Problemas cardíacos", "Problemas respiratorios",
                  "Enfermedad renal", "Cáncer", "Otro"
                ]}
              />
              {ce.tipoDiscapacidad === "Otro" && (
                <InputField
                  label="Especifique otro tipo de condición"
                  name="otroTipoDiscapacidad"
                  value={ce.otroTipoDiscapacidad || ""}
                  onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                />
              )}
              <SelectField
                label="Subtipo de condición especial"
                name="subtipoDiscapacidad"
                value={ce.subtipoDiscapacidad || ""}
                onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                options={["Presión baja", "Presión alta", "Crónica", "Otro"]}
              />
              {ce.subtipoDiscapacidad === "Otro" && (
                <InputField
                  label="Especifique otro subtipo"
                  name="otroSubtipoDiscapacidad"
                  value={ce.otroSubtipoDiscapacidad || ""}
                  onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                />
              )}
              <InputField
                label="Describa brevemente la condición especial"
                name="descripcionCondicionSalud"
                value={ce.descripcionCondicionSalud || ""}
                onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                type="textarea"
              />
            </>
          )}
        </fieldset>
      </FoldDownComponent>

      {/* Características Poblacionales */}
      <FoldDownComponent title="Características Poblacionales" open>
        <fieldset className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 col-span-2">
            <input
              type="checkbox"
              id="indigena"
              name="indigena"
              checked={cp.indigena || false}
              onChange={e => handleChange(e, "FamiliaCaracteristicasPoblacionales")}
              className="form-checkbox h-5 w-5 text-teal-600 border-teal-600 focus:ring-teal-500 rounded transition-all duration-150"
            />
            <label htmlFor="indigena" className="text-teal-600 font-bold select-none">
              Población Indígena
            </label>
          </div>
          {cp.indigena && (
            <SelectField
              label="¿A qué pueblo indígena pertenece?"
              name="grupoIndigena"
              value={cp.grupoIndigena || ""}
              onChange={e => handleChange(e, "FamiliaCaracteristicasPoblacionales")}
              options={gruposIndigenasCR}
            />
          )}
          <SelectField
            label="¿Cómo se autoidentifica según su origen e identidad cultural?"
            name="autoidentificacionCultural"
            value={cp.autoidentificacionCultural || ""}
            onChange={e => handleChange(e, "FamiliaCaracteristicasPoblacionales")}
            options={[
              "china", "indígena", "afrodescendiente", "mestiza",
              "blanca", "otra", "NS/NR"
            ]}
          />
          <SelectField
            label="País de origen"
            name="paises"
            value={cp.paises || ""}
            onChange={e => handleChange(e, "FamiliaCaracteristicasPoblacionales")}
            options={paises}
          />
        </fieldset>
      </FoldDownComponent>

      {/* Firma Digital */}
      {dp.esJefeFamilia && (
        <FoldDownComponent title="Firma Digital" open>
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-lg shadow-md bg-white border border-gray-300 w-[400px] h-[150px] flex items-center justify-center">
              <canvas ref={canvasRef} width={400} height={150} className="rounded-lg" />
            </div>
            <div className="flex gap-4 mt-2">
              <SubmitButton
                type="button"
                width="w-auto"
                className="!bg-yellow-500 !text-black font-bold hover:!bg-yellow-600"
                onClick={guardarFirma}
              >
                Guardar Firma
              </SubmitButton>
              <SubmitButton
                type="button"
                width="w-auto"
                className="!bg-yellow-500 !text-black font-bold hover:!bg-yellow-600"
                onClick={limpiarFirma}
              >
                Limpiar Firma
              </SubmitButton>
            </div>
            {fd.imagen && (
              <div className="mt-4 w-[400px]">
                <p className="mb-2 text-sm text-gray-600">Firma guardada:</p>
                <img
                  src={fd.imagen}
                  alt="Firma digital"
                  className="border border-gray-300 rounded-lg w-full h-[150px] object-contain bg-white"
                />
              </div>
            )}
          </div>
        </FoldDownComponent>
      )}

      {loading && <p className="mensaje-cargando">Guardando datos...</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Botones de paginación con estados usando SubmitButton */}
      <div className="flex justify-center gap-4 mt-4">
        <SubmitButton
          type="button"
          onClick={handleRegresar}
          disabled={indice === 0 || loading}
          width="w-72"
          className="!bg-yellow-500 !text-black font-bold hover:!bg-yellow-600"
        >
          Regresar
        </SubmitButton>
        <SubmitButton
          type="button"
          onClick={handleSiguiente}
          disabled={loading}
          loading={loading}
          width="w-72"
          className="!bg-yellow-500 !text-black font-bold hover:!bg-yellow-600"
        >
          {indice < cantidad - 1 ? "Siguiente" : "Guardar Datos"}
        </SubmitButton>
      </div>
    </FormContainer>

  );
};

export default FamiliaFormulario;
