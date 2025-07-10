import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const productosOlores = [
  { nombre: 'Plátano', unidad: 'Unidad' },
  { nombre: 'Cebolla', unidad: 'kg' },
  { nombre: 'Chile Dulce', unidad: 'Unidad' },
  { nombre: 'Tomate', unidad: 'kg' },
  { nombre: 'Pepino', unidad: 'kg' },
  { nombre: 'Repollo', unidad: 'kg' },
  { nombre: 'Ajo', unidad: 'kg' },
  { nombre: 'Culantro rollo', unidad: 'Rollo' },
  { nombre: 'Apio', unidad: 'kg' },
  { nombre: 'Salsa Lizano', unidad: 'Litro' },
  { nombre: 'Vinagre', unidad: 'Litro' },
  { nombre: 'Oregano', unidad: 'Rollo' },
  { nombre: 'Pimienta', unidad: 'kg' },
  { nombre: 'Comino', unidad: 'kg' },
  { nombre: 'Salsa de Tomate', unidad: 'Litro' },
  { nombre: 'Mayonesa', unidad: 'Litro' },
  { nombre: 'Sal', unidad: 'kg' },
  { nombre: 'Mantequilla', unidad: 'kg' },
  { nombre: 'Achiote', unidad: 'Caja' },
  { nombre: 'Consome', unidad: 'kg' }
];

const Olores = () => {
  const { agregarItem, eliminarItem, items } = useContext(contextoAbastecimiento);
  const [selecciones, setSelecciones] = useState({});

  const handleCheck = (nombre) => {
    setSelecciones(prev => ({
      ...prev,
      [nombre]: { ...prev[nombre], checked: !prev[nombre]?.checked, cantidad: 1 }
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
        const unidad = productosOlores.find(p => p.nombre === nombre).unidad;
        agregarItem({
          seccion: 'Olores',
          tipo: nombre,
          unidad,
          cantidad: cantidad
        });
      }
    });
    setSelecciones({});
  };

  return (
    <details>
      <summary><strong>Olores y otros</strong></summary>
      <div className="cuadro-grid">
        {productosOlores.map(({ nombre }) => (
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
              onChange={(e) => handleCantidad(nombre, e.target.value)}
              disabled={!selecciones[nombre]?.checked}
              placeholder="Cantidad"
            />
          </div>
        ))}
      </div>

      <button type="button" onClick={agregarSeleccionados}>Agregar</button>

      <div className="card">
        <h4>Resumen Olores</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Olores').map((item, index) => (
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

export default Olores;