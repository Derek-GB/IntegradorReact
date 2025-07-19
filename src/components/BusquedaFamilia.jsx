import React, { useState } from "react";
import { familiasAPI } from "../helpers/api";
import Alerta from "./Alerta";
import "../styles/busquedaAlbergue.css";

const BusquedaFamilia = () => {
  const [identificacion, setIdentificacion] = useState("");
  const [familia, setFamilia] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFamilia(null);

    if (!identificacion.trim()) {
      setError("Por favor ingrese un número de identificación.");
      return;
    }

    try {
      const res = await familiasAPI.getById(identificacion.trim());
      if (res && res.codigoFamilia) {
        setFamilia(res);
      } else {
        setError("No se encontró una familia con ese número de identificación.");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No se encontró una familia con ese número de identificación.");
      } else {
        setError(err.message || "Error al buscar la familia.");
      }
    }
  };

  return (
    <div className="busqueda-container">
      <div className="header">
        <h2 className="titulo">Buscar Familia</h2>
      </div>

      <form className="formulario-horizontal" onSubmit={handleSubmit} noValidate>
        <div className="campo-horizontal">
          <input
            type="text"
            className="form-control"
            placeholder="Número de Identificación"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />
        </div>

        <div className="campo-horizontal">
          <button type="submit" className="btn-buscar">Buscar</button>
        </div>
      </form>

      {error && <Alerta tipo="error" mensaje={error} />}



      {familia && (
        <div className="tabla-container">
          <h2>Detalles de la Familia</h2>

          <div className="campo-horizontal">
            <label>Código de Familia:</label>
            <input value={familia.codigoFamilia || ""} disabled />
          </div>

          <div className="campo-horizontal">
            <label>Ubicación:</label>
            <input value={familia.ubicacion || ""} disabled />
          </div>

          <div className="campo-horizontal">
            <label>Cantidad de Personas:</label>
            <input value={familia.integrantes?.length || 0} disabled />
          </div>

          {familia.integrantes?.map((p, index) => (
            <fieldset key={index} style={{ marginTop: "20px" }}>
              <legend>Integrante #{index + 1}</legend>

              <label>Nombre Completo:</label>
              <input value={p.nombreCompleto || ""} disabled />

              <label>Tipo de Identificación:</label>
              <input value={p.tipoIdentificacion || ""} disabled />

              <label>Número de Identificación:</label>
              <input value={p.numeroIdentificacion || ""} disabled />

              <label>Nacionalidad:</label>
              <input value={p.nacionalidad || ""} disabled />

              <label>Parentesco:</label>
              <input value={p.parentesco || ""} disabled />

              <label>Género:</label>
              <input value={p.genero || ""} disabled />

              <label>Sexo:</label>
              <input value={p.sexo || ""} disabled />

              <label>Fecha de Nacimiento:</label>
              <input value={p.fechaNacimiento || ""} disabled />

              <label>Condiciones Especiales:</label>
              <input value={p.condicionesEspeciales || ""} disabled />

              <label>Características Poblacionales:</label>
              <input value={p.caracteristicasPoblacionales || ""} disabled />

              <label>Contacto de Emergencia:</label>
              <input value={p.contactoEmergencia || ""} disabled />
            </fieldset>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusquedaFamilia;
