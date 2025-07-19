import React, { useState } from "react";
import { useUbicaciones } from "../hooks/useUbicaciones";
import { alberguesAPI } from "../helpers/api";
import Alerta from "../components/Alerta";
import "../styles/busquedaAlbergue.css";

const BusquedaAlbergue = () => {
  const {
    provincias,
    cantones,
    distritos,
    setProvinciaId: setProvinciaIdHook,
    setCantonId: setCantonIdHook,
  } = useUbicaciones();

  const [idAlbergue, setIdAlbergue] = useState("");
  const [nombre, setNombre] = useState("");
  const [provinciaId, setProvinciaId] = useState("");
  const [cantonId, setCantonId] = useState("");
  const [distritoId, setDistritoId] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");

  const handleProvinciaChange = (e) => {
    const value = e.target.value;
    setProvinciaId(value);
    setProvinciaIdHook(value);

    // Limpiar cantón y distrito si cambia provincia
    setCantonId("");
    setDistritoId("");
    setCantonIdHook("");
  };

  const handleCantonChange = (e) => {
    const value = e.target.value;
    setCantonId(value);
    setCantonIdHook(value);

    // Limpiar distrito si cambia cantón
    setDistritoId("");
  };

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
      } else if (provinciaId || cantonId || distritoId) {
        // Obtener los nombres descriptivos según IDs seleccionados
        const provinciaObj = provincias.find(
          (p) => String(p.idProvincia) === String(provinciaId)
        );
        const cantonObj = cantones.find(
          (c) => String(c.idCanton) === String(cantonId)
        );
        const distritoObj = distritos.find(
          (d) => String(d.idDistrito) === String(distritoId)
        );

        // Prioridad distrito > cantón > provincia según tu SP
        const params = {
          distrito: distritoObj?.descripcion || "",
          canton: distritoObj ? "" : cantonObj?.descripcion || "",
          provincia: distritoObj || cantonObj ? "" : provinciaObj?.descripcion || "",
        };

        const res = await alberguesAPI.getByUbicacion(params);

        if (res?.data?.length > 0) {
          setResultados(res.data);
        } else {
          setError("No se encontraron albergues en esa ubicación.");
        }
      } else {
        setError("Por favor ingrese al menos un criterio de búsqueda.");
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
            onChange={handleProvinciaChange}
            value={provinciaId}
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
            onChange={handleCantonChange}
            disabled={!cantones.length}
            value={cantonId}
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
