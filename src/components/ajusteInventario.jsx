import React, { useState } from "react";
import "../styles/ajusteInventario.css";

export default function AjusteInventario() {
  const [idProducto, setIdProducto] = useState("");
  const [motivo, setMotivo] = useState("");
  const [arti, setArti] = useState("");
  const [cantidadReal, setCantidadReal] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Simulación de búsqueda de producto por ID
  const handleBuscarIdProducto = () => {
    // Aquí puedes abrir un modal o buscar en una lista real
    // Por ahora solo simula un resultado
    setIdProducto("12345");
    setArti("Ejemplo Artículo");
    setMensaje("Producto encontrado y seleccionado.");
  };

  const handleBuscarArticulo = () => {
    setArti("Ejemplo Artículo");
    setMensaje("Artículo encontrado y seleccionado.");
  };

  const handleAjuste = (e) => {
    e.preventDefault();
    if (!idProducto || !motivo || !arti || !cantidadReal || !fecha) {
      setMensaje("Completa todos los campos.");
      return;
    }
    setMensaje("Ajuste registrado correctamente.");
    setIdProducto("");
    setMotivo("");
    setArti("");
    setCantidadReal("");
    setFecha("");
  };

  return (
    <div className="ajuste-inventario-fullscreen">
      <form className="ajuste-inventario-form" onSubmit={handleAjuste}>
        <h2>Ajuste de Inventario</h2>
        <label>
          Buscar producto:
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={idProducto}
              onChange={(e) => setProducto(e.target.value)}
              placeholder="Buscar producto"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={handleBuscarIdProducto}
              title="Buscar producto"
              className="boton-buscar-id"
            >
              +
            </button>
          </div>
        </label>
        Motivo:
        <input
          type="text"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Motivo del ajuste"
        />
        <label>
          Articulo:
          <input
            type="text"
            value={arti}
            onChange={(e) => setArti(e.target.value)}
            placeholder="Nombre del artículo"
            readOnly
          />
        </label>
        <label>
          Cantidad real:
          <input
            type="number"
            value={cantidadReal}
            onChange={(e) => setCantidadReal(e.target.value)}
            placeholder="Cantidad real"
          />
        </label>
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>
        <button type="submit">Registrar Ajuste</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}