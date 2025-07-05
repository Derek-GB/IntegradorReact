import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const productosLimpieza = [
  { nombre: "Bolsas para basura Grande", unidad: "paquete" },
  { nombre: "Papel Higiénico", unidad: "rollo" },
  { nombre: "Pasta dental", unidad: "unidad" },
  { nombre: "Cloro", unidad: "litro" },
  { nombre: "Jabón en polvo", unidad: "kg" },
  { nombre: "Desinfectante", unidad: "litro" },
  { nombre: "Jabón lavamanos", unidad: "litro" },
  { nombre: "Champu", unidad: "litro" },
  { nombre: "Cepillo dental", unidad: "unidad" },
  { nombre: "Toalla sanitaria", unidad: "paquete" },
  { nombre: "Pañales niño M unidades", unidad: "unidad" },
  { nombre: "Escoba", unidad: "unidad" },
  { nombre: "Trapeador piso", unidad: "unidad" },
  { nombre: "Toallas de papel", unidad: "rollo" }
];

const Limpieza = () => {
  const { agregarItem, eliminarItem, items } = useContext(contextoAbastecimiento);
  const [selecciones, setSelecciones] = useState({});

  const handleCheck = (nombre) => {
    setSelecciones(prev => ({
      ...prev,
      [nombre]: { checked: !prev[nombre]?.checked, cantidad: 1 }
    }));
  };

  const handleCantidad = (nombre, cantidad) => {
    setSelecciones(prev => ({
      ...prev,
      [nombre]: { ...prev[nombre], cantidad }
    }));
  };

  const agregarSeleccionados = () => {
    Object.entries(selecciones).forEach(([nombre, { checked, cantidad }]) => {
      if (checked && cantidad > 0) {
        const unidad = productosLimpieza.find(p => p.nombre === nombre).unidad;
        agregarItem({ seccion: 'Limpieza', tipo: nombre, unidad, cantidad });
      }
    });
    setSelecciones({});
  };

  return (
    <details>
      <summary><strong>Limpieza</strong></summary>
      <div className="cuadro-grid">
        {productosLimpieza.map(({ nombre, unidad }) => (
          <div key={nombre} className="producto">
            <label>
              <input
                type="checkbox"
                checked={selecciones[nombre]?.checked || false}
                onChange={() => handleCheck(nombre)}
              />
              {nombre}
            </label>
            <input
              type="number"
              min="1"
              value={selecciones[nombre]?.cantidad || ''}
              onChange={e => handleCantidad(nombre, e.target.value)}
              disabled={!selecciones[nombre]?.checked}
              placeholder={unidad}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={agregarSeleccionados}>Agregar</button>

      <div className="card">
        <h4>Resumen Limpieza</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Limpieza').map((item, index) => (
              <tr key={index}>
                <td>{item.tipo}</td>
                <td>{item.unidad}</td>
                <td>{item.cantidad}</td>
                <td><button onClick={() => eliminarItem(index)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Limpieza;