import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Agrega esto arriba
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import FoldDownComponent from "../../components/otros/FoldDownComponent.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import useIntegrante from "../../hooks/familia/useIntegrante.js";
import { personasAPI } from "../../helpers/api.js";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const FamiliaFormulario = () => {
  const cantidad = parseInt(localStorage.getItem("cantidadIntegrantes")) || 0;
  const [indice, setIndice] = useState(0);

  const [datosIntegrantes, setDatosIntegrantes] = useState(
    Array(cantidad).fill(null).map(() => ({
      FamiliaDatosPersonales: {},
      FamiliaCondicionesEspeciales: {},
      FamiliaCaracteristicasPoblacionales: {},
      FamiliaFirmaDigital: {},
    }))
  );

  const [datos, setDatos] = useState(datosIntegrantes[indice] || {
    FamiliaDatosPersonales: {},
    FamiliaCondicionesEspeciales: {},
    FamiliaCaracteristicasPoblacionales: {},
    FamiliaFirmaDigital: {},
  });

  const guardarDatosIntegrante = () => {
    setDatosIntegrantes(prev => {
      const nuevos = [...prev];
      nuevos[indice] = { ...datos };
      return nuevos;
    });
  };

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
      guardarDatosIntegrante();
      setError(null);
      setSuccess(null);
      const nuevoIndice = indice + 1;
      setIndice(nuevoIndice);
      cargarDatosIntegrante(nuevoIndice);
    } else {
      guardarDatosIntegrante();
      handleSubmit();
    }
  };

  const handleRegresar = () => {
    if (indice > 0) {
      guardarDatosIntegrante();
      setError(null);
      setSuccess(null);
      const nuevoIndice = indice - 1;
      setIndice(nuevoIndice);
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
    limpiarFirma
  } = useIntegrante(datos, setDatos);

  const dp = datos.FamiliaDatosPersonales;
  const ce = datos.FamiliaCondicionesEspeciales;
  const cp = datos.FamiliaCaracteristicasPoblacionales;
  const fd = datos.FamiliaFirmaDigital;

  const obtenerFechaMaxima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  const codigoFamilia = localStorage.getItem("codigoFamilia") || "";
  const idFamilia = Number(localStorage.getItem("idFamilia"));
  const idUsuario = Number(localStorage.getItem("idUsuario")) || 42; // fallback a 42 si no hay nada


  const verificarJefeFamilia = () => {
    let jefeExistente = false;
    let indiceJefe = -1;
    for (let i = 0; i < datosIntegrantes.length; i++) {
      if (i !== indice) {
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

  const handleJefeFamiliaChange = (e) => {
    const nuevoValor = e.target.value;
    if (nuevoValor === "Sí") {
      const { jefeExistente, indiceJefe } = verificarJefeFamilia();
      if (jefeExistente) {
        showCustomToast(
          "Jefe de familia existente",
          `Ya existe un jefe de familia en el integrante ${indiceJefe + 1}. `,
          "info"
        );

        if (confirmar) {
          confirmarCambioJefe();
        }
        return;
      }
    }
    handleChange(e, "FamiliaDatosPersonales");
  };

  const confirmarCambioJefe = () => {
    const { indiceJefe } = verificarJefeFamilia();
    setDatosIntegrantes(prev => {
      const nuevos = [...prev];
      if (nuevos[indiceJefe] && nuevos[indiceJefe].FamiliaDatosPersonales) {
        nuevos[indiceJefe].FamiliaDatosPersonales.esJefeFamilia = false;
      }
      return nuevos;
    });
    setDatos(prev => ({
      ...prev,
      FamiliaDatosPersonales: {
        ...prev.FamiliaDatosPersonales,
        esJefeFamilia: "Sí"
      }
    }));

  };





  const construirPersonaPayload = (datosIntegrantes, idFamilia) => {
    const formData = new FormData();

    const personasArray = datosIntegrantes.map((integrante, idx) => {
      const dp = integrante.FamiliaDatosPersonales;
      const ce = integrante.FamiliaCondicionesEspeciales;
      const cp = integrante.FamiliaCaracteristicasPoblacionales;
      const fd = integrante.FamiliaFirmaDigital;

      // Generar nombre único para la firma
      let firmaFileName = "";
      if (fd.imagen) {
        const identificacion = dp.numeroIdentificacion || `sinid_${idx + 1}`;
        const timestamp = Date.now();
        firmaFileName = `firma_${identificacion}_${timestamp}.png`;
      }

      // Construir el objeto persona
      const persona = {
        tieneCondicionSalud: ce.tieneCondicionSalud ?? true,
        descripcionCondicionSalud: ce.descripcionCondicionSalud || ce.otrasCondiciones || null,
        discapacidad: ce.discapacidad ?? false,
        tipoDiscapacidad: ce.tipoDiscapacidad || null,
        subtipoDiscapacidad: ce.subtipoDiscapacidad || null,
        paisOrigen: cp.paises || null,
        autoidentificacionCultural: cp.autoidentificacionCultural || null,
        puebloIndigena: cp.grupoIndigena || null,
        idFamilia: idFamilia,
        nombre: dp.nombre || "",
        primerApellido: dp.primerApellido || "",
        segundoApellido: dp.segundoApellido || "",
        tipoIdentificacion: dp.tipoIdentificacion || "Cédula",
        numeroIdentificacion: dp.numeroIdentificacion || "",
        nacionalidad: dp.nacionalidad || "",
        parentesco: dp.parentesco || "",
        esJefeFamilia: dp.esJefeFamilia === true || dp.esJefeFamilia === "Sí",
        fechaNacimiento: dp.fechaNacimiento || "",
        genero: dp.genero || "",
        sexo: dp.sexo || "",
        telefono: dp.telefono || "",
        contactoEmergencia: dp.contactoEmergencia || null,
        observaciones: dp.observaciones || null,
        estaACargoMenor: Boolean(dp.estaACargoMenor),
        idUsuarioCreacion: idUsuario,
      };

      // Solo agrega la propiedad firma si hay firma
      if (firmaFileName) {
        persona.firma = firmaFileName;
      }

      return persona;
    });

    formData.append("personas", JSON.stringify(personasArray));

    datosIntegrantes.forEach((integrante, idx) => {
      const dp = integrante.FamiliaDatosPersonales;
      const fd = integrante.FamiliaFirmaDigital;
      if (fd.imagen) {
        const identificacion = dp.numeroIdentificacion || `sinid_${idx + 1}`;
        const timestamp = Date.now();
        const firmaFileName = `firma_${identificacion}_${timestamp}.png`;
        const pngBlob = convertirBase64APng(fd.imagen);
        formData.append("firma", pngBlob, firmaFileName);
      }
    });

    return formData;
  };

  const crearPersonasConFirmas = async (formData) => {
    const res = await personasAPI.create(formData);
    return res;
  };

  const navigate = useNavigate(); // Agrega esto dentro del componente

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);


    const regexIdentificacion = /^\d{9}$/;
    const regexTelefono = /^\d{4}-\d{4}$/;

    if (!regexIdentificacion.test(dp.numeroIdentificacion || "")) {
      showCustomToast(
        "Dato inválido",
        "El número de identificación debe tener exactamente 9 dígitos.",
        "error"
      );
      setLoading(false);
      return;
    }

    if (!regexTelefono.test(dp.telefono || "")) {
      showCustomToast(
        "Dato inválido",
        "El teléfono debe tener el formato 8888-8888.",
        "error"
      );
      setLoading(false);
      return;
    }


    const nuevosIntegrantes = [...datosIntegrantes];
    nuevosIntegrantes[indice] = { ...datos };

    try {
      const formData = construirPersonaPayload(nuevosIntegrantes, idFamilia);
      const res = await crearPersonasConFirmas(formData);

      if (res?.success) {
        showCustomToast(
          "Persona agregada correctamente",
          "La persona fue registrada exitosamente.",
          "success"
        );
        setTimeout(() => {
          navigate("/preFormulario.jsx");
        }, 2000);
      } else {
        showCustomToast(
          "No se pudo registrar",
          res?.errores?.[0]?.error || "No se pudo registrar la persona.",
          "error"
        );
      }
    } catch (err) {
      showCustomToast(
        "No se pudo registrar",
        err.message || "No se pudo registrar la persona.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const convertirBase64APng = (base64String) => {
    const base64Data = base64String.replace(/^data:image\/[^;]+;base64,/, '');
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' });
  };

  return (
    <FormContainer
      title={`Formulario de Registro Familiar - Integrante ${indice + 1} de ${cantidad}`}
    >
      {/* Información Personal */}
      <FoldDownComponent title="Información Personal" open>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputField
            label="ID Familia"
            name="idFamilia"
            value={codigoFamilia || ""}
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
            required
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
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, ""); // solo dígitos
              if (val.length > 9) val = val.slice(0, 9); // máximo 9
              handleChange(
                { target: { name: e.target.name, value: val } },
                "FamiliaDatosPersonales"
              );
            }}
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
            required
          />
          <SelectField
            label="Usted diría que se identifica como (Género)"
            name="genero"
            value={dp.genero || "Prefiero no decir"}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["Hombre", "Mujer", "Hombre trans/transmasculino", "Mujer trans/transfemenina", "No se identifica con ninguna de las anteriores", "Otro", "Prefiero no decir"]}
            required
          />
          <SelectField
            label="Sexo"
            name="sexo"
            value={dp.sexo || ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["Masculino", "Femenino", "Intersexo", "Prefiero no decir"]}
            required
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
            required
          />
          <InputField
            label="Teléfono"
            name="telefono"
            value={dp.telefono || ""}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, ""); // solo dígitos
              if (val.length > 8) val = val.slice(0, 8); // máximo 8 dígitos
              if (val.length > 4) {
                val = val.slice(0, 4) + "-" + val.slice(4); // formato ####-####
              }
              handleChange(
                { target: { name: e.target.name, value: val } },
                "FamiliaDatosPersonales"
              );
            }}
            placeholder="8888-8888"
            required
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
            value={dp.estaACargoMenor ?? ""}
            onChange={e => handleChange(e, "FamiliaDatosPersonales")}
            options={["No", "Sí"]}
            required
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

          {/* Discapacidad */}
          <label className="text-teal-600 font-bold select-none">¿Tiene alguna discapacidad?</label>
          <div className="flex items-center gap-6 col-span-2 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="discapacidad"
                checked={ce.discapacidad === true}
                onChange={() =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      discapacidad: true,
                      tipoDiscapacidad: "",
                      subtipoDiscapacidad: "",
                    },
                  }))
                }
                className="form-radio h-5 w-5 text-teal-600 border-teal-600 focus:ring-teal-500"
              />
              <span className="text-teal-600 font-semibold select-none">Sí</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="discapacidad"
                checked={ce.discapacidad === false}
                onChange={() =>
                  setDatos(prev => ({
                    ...prev,
                    FamiliaCondicionesEspeciales: {
                      ...prev.FamiliaCondicionesEspeciales,
                      discapacidad: false,
                      tipoDiscapacidad: "",
                      subtipoDiscapacidad: "",
                    },
                  }))
                }
                className="form-radio h-5 w-5 text-teal-600 border-teal-600 focus:ring-teal-500"
              />
              <span className="text-teal-600 font-semibold select-none">No</span>
            </label>
          </div>
          {/* Si tiene discapacidad, mostrar tipo y subtipo */}
          {ce.discapacidad === true && (
            <>
              <SelectField
                label="Tipo de discapacidad"
                name="tipoDiscapacidad"
                value={ce.tipoDiscapacidad || ""}
                onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                options={[
                  "Motora", "Visual", "Auditiva", "Intelectual", "Psicosocial", "Otra"
                ]}
                required
              />
              <SelectField
                label="Subtipo de discapacidad"
                name="subtipoDiscapacidad"
                value={ce.subtipoDiscapacidad || ""}
                onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                options={[
                  "Parcial", "Total", "Temporal", "Permanente", "Otra"
                ]}
                required
              />
              {ce.subtipoDiscapacidad === "Otra" && (
                <InputField
                  label="Especifique otro subtipo"
                  name="otroSubtipoDiscapacidad"
                  value={ce.otroSubtipoDiscapacidad || ""}
                  onChange={e => handleChange(e, "FamiliaCondicionesEspeciales")}
                />
              )}
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

      {/* Navegación entre integrantes y guardado */}
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

