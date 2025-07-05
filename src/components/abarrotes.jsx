import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const productosAbarrotes = [
  { nombre: "Arroz 80% grano entero", unidad: "kg" },
  { nombre: "Frijoles", unidad: "kg" },
  { nombre: "Azúcar", unidad: "kg" },
  { nombre: "Aceite de soya", unidad: "litros" },
  { nombre: "Café", unidad: "kg" },
  { nombre: "Espagueti", unidad: "kg" },
  { nombre: "Atún en trozos", unidad: "latas" },
  { nombre: "Avena en polvo", unidad: "kg" },
  { nombre: "Refresco", unidad: "paquetes" },
  { nombre: "Leche en polvo", unidad: "kg" },
  { nombre: "Agua dulce en polvo", unidad: "kg" },
  { nombre: "Pan Cuadrado", unidad: "paquetes" },
  { nombre: "Tortillas", unidad: "paquetes" },
  { nombre: "Pasta de tomate", unidad: "unidades" }
];

const Abarrotes = () => {
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
        const unidad = productosAbarrotes.find(p => p.nombre === nombre).unidad;
        agregarItem({ seccion: 'Abarrotes', tipo: nombre, unidad, cantidad });
      }
    });
    setSelecciones({});
  };

  return (
    <details>
      <summary><strong>Abarrotes</strong></summary>
      <div className="cuadro-grid">
        {productosAbarrotes.map(({ nombre, unidad }) => (
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
        <h4>Resumen Abarrotes</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Abarrotes').map((item, index) => (
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

export default Abarrotes;