// src/components/carne.jsx
import React, { useState, useContext } from "react";
import { contextoAbastecimiento } from "../context/contextoAbastecimiento  ";

const productosCarne = [
  { nombre: "Carne de res", unidad: "kg" },
  { nombre: "Carne de cerdo", unidad: "kg" },
  { nombre: "Pollo", unidad: "kg" },
  { nombre: "Pescado", unidad: "kg" },
];

const Carnes = () => {
  const { agregarItem } = useContext(contextoAbastecimiento);
  const [cantidades, setCantidades] = useState({});

  const handleChange = (nombre, cantidad) => {
    setCantidades({ ...cantidades, [nombre]: cantidad });
  };

  const handleAgregar = (producto) => {
    const cantidad = cantidades[producto.nombre];
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) return;

    const nuevoItem = {
      categoria: "Carnes",
      nombre: producto.nombre,
      cantidad,
      unidad: producto.unidad,
    };

    agregarItem(nuevoItem);
    setCantidades({ ...cantidades, [producto.nombre]: "" });
  };

  return (
    <div className="seccion">
      <h2>Carnes</h2>
      {productosCarne.map((producto, index) => (
        <div key={index} className="producto">
          <span>{producto.nombre} ({producto.unidad})</span>
          <input
            type="number"
            min="0"
            value={cantidades[producto.nombre] || ""}
            onChange={(e) => handleChange(producto.nombre, e.target.value)}
            placeholder="Cantidad"
          />
          <button onClick={() => handleAgregar(producto)}>Agregar</button>
        </div>
      ))}
    </div>
  );
};

export default Carnes;
