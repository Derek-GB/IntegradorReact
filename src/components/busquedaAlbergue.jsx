import React, { useState } from "react";
import { useUbicaciones } from "../hooks/useUbicaciones";
import { alberguesAPI } from "../helpers/api";
import "../styles/busquedaAlbergue.css";

const BusquedaAlbergue = () => {
  const { provincias, cantones, distritos, setProvinciaId, setCantonId } = useUbicaciones();

  const [idAlbergue, setIdAlbergue] = useState("");
  const [nombre, setNombre] = useState("");
  const [distritoId, setDistritoId] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResultados([]);

    try {
      // Ejemplo de búsqueda: prioriza id, luego nombre y luego filtros de ubicación
      if (idAlbergue.trim() !== "") {
        const res = await alberguesAPI.getById(idAlbergue.trim());
        if (res?.data?.length > 0) {
          setResultados(res.data);
        } else {
          setError("No se encontró albergue con ese ID.");
        }
      } else if (nombre.trim() !== "") {
        const res = await alberguesAPI.getByNombre(nombre.trim());
        if (res?.data?.length > 0) {
          setResultados(res.data);
        } else {
          setError("No se encontró albergue con ese nombre.");
        }
      } else if (provincias.length > 0) {
        // Aquí podrías hacer una búsqueda con provincia, cantón y distrito si quieres
        // Ejemplo ficticio:
        // const res = await alberguesAPI.getByUbicacion(provinciaId, cantonId, distritoId);
        // setResultados(res.data);
        setError("Por favor ingrese ID o Nombre para buscar."); // Por ahora limitamos búsqueda
      } else {
        setError("Por favor ingrese ID o Nombre para buscar.");
      }
    } catch (err) {
      setError(String(err) || "Error al buscar albergue.");
    }
  };

  return (
    <div className="busqueda-container">
      <div className="header">
        <h2 className="titulo">Búsqueda de Albergue</h2>
      </div>

      <form className="formulario-horizontal" onSubmit={handleSubmit} noValidate>
        <div className="campo-horizontal">
          <input
            type="text"
            className="form-control"
            placeholder="ID Albergue"
            value={idAlbergue}
            onChange={(e) => setIdAlbergue(e.target.value)}
          />
        </div>

        <div className="campo-horizontal">
          <select
            className="form-select"
            onChange={(e) => setProvinciaId(e.target.value)}
            defaultValue=""
          >
            <option value="">Provincia</option>
            {provincias.map((p) => (
              <option key={p.idProvincia} value={p.idProvincia}>
                {p.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-horizontal">
          <select
            className="form-select"
            onChange={(e) => setCantonId(e.target.value)}
            disabled={!cantones.length}
            defaultValue=""
          >
            <option value="">Cantón</option>
            {cantones.map((c) => (
              <option key={c.idCanton} value={c.idCanton}>
                {c.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-horizontal">
          <select
            className="form-select"
            onChange={(e) => setDistritoId(e.target.value)}
            disabled={!distritos.length}
            value={distritoId}
          >
            <option value="">Distrito</option>
            {distritos.map((d) => (
              <option key={d.idDistrito} value={d.idDistrito}>
                {d.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="campo-horizontal nombre-busqueda">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo-horizontal">
          <button type="submit" className="btn-buscar">
            Buscar
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {!error && resultados.length === 0 && (
        <p style={{ marginTop: "1rem", textAlign: "center", color: "#666" }}>
          Ingrese un criterio y presione Buscar para ver resultados.
        </p>
      )}

      {resultados.length > 0 && (
        <div className="tabla-container">
          <table className="tabla-albergues">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Región</th>
                <th>Provincia</th>
                <th>Cantón</th>
                <th>Distrito</th>
                <th>Dirección</th>
                <th>Tipo Establecimiento</th>
                <th>Tipo Albergue</th>
                <th>Condición</th>
                <th>Administrador</th>
                <th>Teléfono</th>
                <th>Capacidad Personas</th>
                <th>Capacidad Colectiva</th>
                <th>Cantidad Familias</th>
                <th>Ocupación</th>
                <th>Cocina</th>
                <th>Duchas</th>
                <th>Servicios Sanitarios</th>
                <th>Bodega</th>
                <th>Menaje Mobiliario</th>
                <th>Tanque Agua</th>
                <th>Área Total (m²)</th>
                <th>Municipalidad</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((a) => (
                <tr key={a.IdAlbergue || a.id}>
                  <td>{a.IdAlbergue || a.id}</td>
                  <td>{a.Nombre}</td>
                  <td>{a.Region}</td>
                  <td>{a.provincia}</td>
                  <td>{a.canton}</td>
                  <td>{a.distrito}</td>
                  <td>{a.direccion}</td>
                  <td>{a.tipoEstablecimiento}</td>
                  <td>{a.tipoAlbergue}</td>
                  <td>{a.condicionAlbergue}</td>
                  <td>{a.administrador}</td>
                  <td>{a.telefono}</td>
                  <td>{a.capacidadPersonas}</td>
                  <td>{a.capacidadColectiva}</td>
                  <td>{a.cantidadFamilias}</td>
                  <td>{a.ocupacion}</td>
                  <td>{a.cocina ? "Sí" : "No"}</td>
                  <td>{a.duchas ? "Sí" : "No"}</td>
                  <td>{a.serviciosSanitarios ? "Sí" : "No"}</td>
                  <td>{a.bodega ? "Sí" : "No"}</td>
                  <td>{a.menajeMobiliario ? "Sí" : "No"}</td>
                  <td>{a.tanqueAgua ? "Sí" : "No"}</td>
                  <td>{a.areaTotalM2}</td>
                  <td>{a.municipalidad}</td>
                  <td style={{ backgroundColor: a.color }}>{a.color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusquedaAlbergue;
