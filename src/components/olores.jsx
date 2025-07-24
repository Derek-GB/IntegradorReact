import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const productosOlores = [
  { nombre: 'Plátano', unidad: 'Unidad', factor: 0.25 },
  { nombre: 'Cebolla', unidad: 'kg', factor: 0.02 },
  { nombre: 'Chile Dulce', unidad: 'Unidad', factor: 0.05 },
  { nombre: 'Tomate', unidad: 'kg', factor: 0.05 },
  { nombre: 'Pepino', unidad: 'kg', factor: 0.05 },
  { nombre: 'Repollo', unidad: 'kg', factor: 0.05 },
  { nombre: 'Ajo', unidad: 'kg', factor: 0.005 },
  { nombre: 'Culantro rollo', unidad: 'Rollo', factor: 0.01 },
  { nombre: 'Apio', unidad: 'kg', factor: 0.01 },
  { nombre: 'Salsa Lizano', unidad: 'Litro', factor: 0.005 },
  { nombre: 'Vinagre', unidad: 'Litro', factor: 0.003 },
  { nombre: 'Oregano', unidad: 'Rollo', factor: 0.003 },
  { nombre: 'Pimienta', unidad: 'kg', factor: 0.001 },
  { nombre: 'Comino', unidad: 'kg', factor: 0.001 },
  { nombre: 'Salsa de Tomate', unidad: 'Litro', factor: 0.005 },
  { nombre: 'Mayonesa', unidad: 'Litro', factor: 0.005 },
  { nombre: 'Sal', unidad: 'kg', factor: 0.005 },
  { nombre: 'Mantequilla', unidad: 'kg', factor: 0.005 },
  { nombre: 'Achiote', unidad: 'Caja', factor: 0.001 },
  { nombre: 'Consome', unidad: 'kg', factor: 0.005 }
];

const Olores = ({ abierto, alAbrir }) => {
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);
  const [selecciones, setSelecciones] = useState({});

  const cantidad = parseInt(datosFormulario?.cantidad) || 0;

  const handleCheck = (nombre) => {
    setSelecciones(prev => ({
      ...prev,
      [nombre]: {
        ...prev[nombre],
        checked: !prev[nombre]?.checked
      }
    }));
  };

  const agregarSeleccionados = () => {
    if (!cantidad || cantidad <= 0) {
      alert('Debe definir la cantidad de personas en el menú principal.');
      return;
    }

    Object.entries(selecciones).forEach(([nombre, { checked }]) => {
      if (checked) {
        const producto = productosOlores.find(p => p.nombre === nombre);
        if (producto) {
          const cantidadCalculada = (cantidad * producto.factor).toFixed(2);
          agregarItem({
            seccion: 'Olores',
            tipo: producto.nombre,
            unidad: producto.unidad,
            cantidad: cantidadCalculada
          });
        }
      }
    });

    setSelecciones({});
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Olores y otros</strong></summary>
      <div className="cuadro-grid">
        {productosOlores.map(({ nombre }) => (
          <div key={nombre} className="producto">
            <label className='labelAbarrote'>
              <input
                className='inputAbarrote'
                type="checkbox"
                checked={selecciones[nombre]?.checked || false}
                onChange={() => handleCheck(nombre)}
              />
              {nombre}
            </label>
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
            <td><button onClick={() => eliminarItem(index)}><i class="material-icons">delete</i></button></td>              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Olores;
