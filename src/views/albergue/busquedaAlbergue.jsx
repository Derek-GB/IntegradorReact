import React, { useState } from "react";
import { useUbicaciones } from "../../hooks/useUbicaciones";
import { alberguesAPI } from "../../helpers/api";
import Alerta from "../../components/Alerta";
import "../../styles/busquedaAlbergue.css";

const BusquedaAlbergue = () => {
  const { provincias, cantones, distritos, setProvinciaId, setCantonId } = useUbicaciones();

  const [idAlbergue, setIdAlbergue] = useState("");
  const [nombre, setNombre] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [cantonSeleccionado, setCantonSeleccionado] = useState("");
  const [distritoSeleccionado, setDistritoSeleccionado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResultados([]);

    try {
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
      } else if (distritoSeleccionado) {
        const res = await alberguesAPI.getByDistrito(distritoSeleccionado);
        if (res?.data?.length > 0) {
          setResultados(res.data);
        } else {
          setError("No se encontró albergue en ese distrito.");
        }
      } else if (cantonSeleccionado) {
        const res = await alberguesAPI.getByCanton(cantonSeleccionado);
        if (res?.data?.length > 0) {
          setResultados(res.data);
        } else {
          setError("No se encontró albergue en ese cantón.");
        }
      } else if (provinciaSeleccionada) {
        const res = await alberguesAPI.getByProvincia(provinciaSeleccionada);
        if (res?.data?.length > 0) {
          setResultados(res.data);
        } else {
          setError("No se encontró albergue en esa provincia.");
        }
      } else {
        setError("Por favor ingrese ID, Nombre o seleccione una ubicación.");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No se encontró un albergue con esos datos.");
      } else if (err.message && err.message.includes("Albergue no encontrado")) {
        setError("No se encontró un albergue con esos datos.");
      } else {
        setError(String(err) || "Error al buscar albergue.");
      }
    }
  };

  return (
    <div className="busqueda-container">
      <div className="header">
        <h2 className="titulo">Búsqueda de Albergue</h2>
      </div>

      <form className="formulario-horizontal" onSubmit={handleSubmit} noValidate>
        <div className="fila-formulario">
          <div className="campo-horizontal campo-pequeno">
            <input
              type="text"
              className="form-control"
              placeholder="ID Albergue"
              value={idAlbergue}
              onChange={(e) => setIdAlbergue(e.target.value)}
            />
          </div>
          <div className="campo-horizontal campo-pequeno">
            <select
              className="form-select"
              onChange={(e) => {
                const idSeleccionado = parseInt(e.target.value, 10);
                setProvinciaId(idSeleccionado);
                const provincia = provincias.find((p) => p.idProvincia === idSeleccionado);
                setProvinciaSeleccionada(provincia?.descripcion || "");
              }}
              value={provincias.find(p => p.descripcion === provinciaSeleccionada)?.idProvincia || ""}
            >
              <option value="">Provincia</option>
              {provincias.map((p) => (
                <option key={p.idProvincia} value={p.idProvincia}>
                  {p.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="campo-horizontal campo-pequeno">
            <select
              className="form-select"
              onChange={(e) => {
                const idSeleccionado = parseInt(e.target.value, 10);
                setCantonId(idSeleccionado);
                const canton = cantones.find((c) => c.idCanton === idSeleccionado);
                setCantonSeleccionado(canton?.descripcion || "");
              }}
              value={cantones.find(c => c.descripcion === cantonSeleccionado)?.idCanton || ""}
            >
              <option value="">Cantón</option>
              {cantones.map((c) => (
                <option key={c.idCanton} value={c.idCanton}>
                  {c.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="campo-horizontal campo-pequeno">
            <select
              className="form-select"
              onChange={(e) => {
                const idSeleccionado = parseInt(e.target.value, 10);
                const distrito = distritos.find((d) => d.idDistrito === idSeleccionado);
                setDistritoSeleccionado(distrito?.descripcion || "");
              }}
              value={distritos.find(d => d.descripcion === distritoSeleccionado)?.idDistrito || ""}
            >
              <option value="">Distrito</option>
              {distritos.map((d) => (
                <option key={d.idDistrito} value={d.idDistrito}>
                  {d.descripcion}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="fila-formulario fila-formulario-centro">
          <div className="campo-horizontal">
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
        </div>
      </form>

      {error && <Alerta tipo="error" mensaje={error} />}

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
