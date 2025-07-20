import React, { useState } from "react";
import { familiasAPI } from "../helpers/api";
import Alerta from "./Alerta";
import "../styles/busquedaFamilia.css";

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
      const id = identificacion.trim();
      const res = await familiasAPI.getById(id);

      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setFamilia(res.data);
        setError("");
      } else {
        setError("No se encontró una familia con ese número de identificación.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No se encontró un Jefe de familia con ese número de identificación.");
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

      {/* Formulario de búsqueda */}
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
          <button type="submit" className="btn-buscar">
            Buscar
          </button>
        </div>
      </form>

      {error && <Alerta tipo="error" mensaje={error} />}

      {familia && familia.length > 0 && (
        <>
          <div className="detalles-generales" style={{ marginBottom: "20px" }}>
            <h2>Detalles de la Familia</h2>
            <div className="formulario-horizontal">
              <div className="campo-horizontal">
                <label>Código de Familia:</label>
                <input value={familia[0].codigoFamilia || ""} disabled className="form-control" />
              </div>

              <div className="campo-horizontal">
                <label>Nombre del Jefe de Familia:</label>
                <input value={familia[0].nombreCompletoJefe || ""} disabled className="form-control" />
              </div>

              <div className="campo-horizontal">
                <label>Ubicación:</label>
                <input
                  value={`${familia[0].provincia || ""}, ${familia[0].canton || ""}, ${familia[0].distrito || ""}`}
                  disabled
                  className="form-control"
                />
              </div>

              <div className="campo-horizontal">
                <label>Dirección Exacta:</label>
                <input value={familia[0].direccionExacta || ""} disabled className="form-control" />
              </div>

              <div className="campo-horizontal">
                <label>Nombre del Albergue:</label>
                <input value={familia[0].nombreAlbergue || ""} disabled className="form-control" />
              </div>

              <div className="campo-horizontal">
                <label>Cantidad de Personas:</label>
                <input value={familia.length} disabled className="form-control" />
              </div>
            </div>
          </div>

          {/* ✅ Contenedor visual + scroll interno */}
          <div className="tabla-container">
            <div className="tabla-scroll">
              <table className="tabla-albergues">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Completo</th>
                    <th>Tipo Identificación</th>
                    <th>Número Identificación</th>
                    <th>Fecha Nacimiento</th>
                    <th>Nacionalidad</th>
                    <th>Parentesco</th>
                    <th>Sexo</th>
                    <th>Género</th>
                    <th>Condición de Salud</th>
                    <th>Discapacidad</th>
                    <th>Tipo Discapacidad</th>
                    <th>Subtipo Discapacidad</th>
                    <th>Tipo Condición Poblacional</th>
                    <th>Contacto de Emergencia</th>
                  </tr>
                </thead>
                <tbody>
                  {familia.map((p, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{p.nombreCompletoIntegrante || ""}</td>
                      <td>{p.tipoIdentificacion || ""}</td>
                      <td>{p.numeroIdentificacion || ""}</td>
                      <td>{p.fechaNacimiento ? p.fechaNacimiento.split("T")[0] : ""}</td>
                      <td>{p.nacionalidad || ""}</td>
                      <td>{p.parentesco || ""}</td>
                      <td>{p.sexo || ""}</td>
                      <td>{p.genero || ""}</td>
                      <td>{p.tieneCondicionSalud === 1 ? "Sí" : "No"}</td>
                      <td>{p.discapacidad === 1 ? "Sí" : "No"}</td>
                      <td>{p.discapacidad === 1 ? p.tipoDiscapacidad || "" : "-"}</td>
                      <td>{p.discapacidad === 1 ? p.subtipoDiscapacidad || "" : "-"}</td>
                      <td>{p.tipoCondicionPoblacional || ""}</td>
                      <td>{p.contactoEmergencia || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusquedaFamilia;
