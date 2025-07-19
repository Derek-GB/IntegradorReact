import React, { useState, useEffect } from "react";

const FamiliaDatosPersonales = ({ datos = {}, setDatos }) => {
  const [edad, setEdad] = useState("");

  // Calcula la edad a partir de la fecha de nacimiento
  const calcularEdad = (fecha) => {
    if (!fecha) {
      setEdad("");
      return "";
    }
    const nacimiento = new Date(fecha);
    if (isNaN(nacimiento.getTime())) {
      setEdad("");
      return "";
    }
    const hoy = new Date();
    let edadCalc = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edadCalc--;
    }
    setEdad(edadCalc);
    return edadCalc;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;
    let nuevosDatos = { ...datos, [name]: nuevoValor };

    if (name === "fechaNacimiento") {
      const edadCalc = calcularEdad(value);
      nuevosDatos = { ...nuevosDatos, edad: edadCalc };
    }

    setDatos(nuevosDatos);
  };

  // Sincroniza edad si cambia desde fuera
  useEffect(() => {
    if (datos.edad !== undefined && datos.edad !== edad) {
      setEdad(datos.edad);
    }
  }, [datos.edad, edad]);

  // Asegura valor predeterminado para tipoIdentificacion
  useEffect(() => {
    if (!datos.tipoIdentificacion) {
      setDatos((prev) => ({ ...prev, tipoIdentificacion: "Cédula" }));
    }
  }, []);

  return (
    <details open>
      <summary><strong>Información Personal</strong></summary>
      <fieldset className="mt-2">
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <label htmlFor="primerApellido">Apellido 1:</label>
        <input
          id="primerApellido"
          name="primerApellido"
          type="text"
          value={datos.primerApellido || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <label htmlFor="segundoApellido">Apellido 2:</label>
        <input
          id="segundoApellido"
          name="segundoApellido"
          type="text"
          value={datos.segundoApellido || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <label htmlFor="tipoIdentificacion">Tipo de Identificación:</label>
        <select
          id="tipoIdentificacion"
          name="tipoIdentificacion"
          type="text"
          value={datos.tipoIdentificacion || "Cédula"}
          onChange={handleChange}
          className="form-select mb-2"
        >
          <option value="Cédula">Cédula</option>
          <option value="DIMEX">DIMEX</option>
          <option value="Permiso laboral">Permiso laboral</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="No presenta">No presenta</option>
        </select>

        <label htmlFor="numeroIdentificacion">Número de Identificación:</label>
        <input
          id="numeroIdentificacion"
          name="numeroIdentificacion"
          type="text"
          value={datos.numeroIdentificacion || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <label htmlFor="nacionalidad">Nacionalidad:</label>
        <input
          id="nacionalidad"
          name="nacionalidad"
          type="text"
          value={datos.nacionalidad || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <label htmlFor="parentesco">Parentesco:</label>
        <select
          id="parentesco"
          name="parentesco"
          value={datos.parentesco || "Padre"}
          onChange={handleChange}
          className="form-select mb-2"
        >
          <option>Padre</option>
          <option>Madre</option>
          <option>Hijo</option>
          <option>Hija</option>
        </select>

        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          value={datos.fechaNacimiento || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <label htmlFor="edad">Edad:</label>
        <input
          id="edad"
          type="text"
          value={edad}
          readOnly
          className="form-control mb-2"
        />

        <label htmlFor="sexo">Sexo:</label>
        <select
          id="sexo"
          name="sexo"
          value={datos.sexo || "Masculino"}
          onChange={handleChange}
          className="form-select mb-2"
        >
          <option>Masculino</option>
          <option>Femenino</option>
          <option>Otro</option>
        </select>

        <label htmlFor="genero">Género:</label>
        <select
          id="genero"
          name="genero"
          value={datos.genero || "Otro"}
          onChange={handleChange}
          className="form-select mb-2"
        >
          <option>Masculino</option>
          <option>No binario</option>
          <option>Femenino</option>
          <option></option>
          <option>Otro</option>
        </select>

        <label htmlFor="telefono">Teléfono:</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={datos.telefono || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="1234-5678"
        />

        <label htmlFor="contactoEmergencia">Contacto de Emergencia:</label>
        <input
          id="contactoEmergencia"
          name="contactoEmergencia"
          type="tel"
          value={datos.contactoEmergencia || ""}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="1234-5678"
        />

        <label htmlFor="esJefeFamilia">¿Es jefe de familia?</label>
        <input
          id="esJefeFamilia"
          type="checkbox"
          name="esJefeFamilia"
          checked={datos.esJefeFamilia || false}
          onChange={handleChange}
          className="form-check-input mb-2 ms-2"
        />

        <label htmlFor="estaACargoMenor">¿Está a cargo de un menor?</label>
        <input
          id="estaACargoMenor"
          type="checkbox"
          name="estaACargoMenor"
          checked={datos.estaACargoMenor || false}
          onChange={handleChange}
          className="form-check-input mb-2 ms-2"
        />

        <label htmlFor="observaciones">Observaciones:</label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={datos.observaciones || ""}
          onChange={handleChange}
          className="form-control mb-2"
        />
      </fieldset>
    </details>
  );
};

export default FamiliaDatosPersonales;
