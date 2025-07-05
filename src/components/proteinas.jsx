import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const Proteinas = () => {
  const [tipoProteina, setTipoProteina] = useState('');
  const { agregarItem, eliminarItem, items } = useContext(contextoAbastecimiento);

  const handleAgregar = () => {
    if (!tipoProteina) return;

    let unidad = 'Unidad';
    switch (tipoProteina) {
      case 'Huevos':
        unidad = 'Unidad';
        break;
      case 'Mortadela':
        unidad = 'Paquete';
        break;
      case 'Salchichón':
        unidad = 'Paquete';
        break;
      default:
        unidad = 'Unidad';
    }

    agregarItem({
      seccion: 'Proteínas',
      tipo: tipoProteina,
      unidad,
      cantidad: 1
    });

    setTipoProteina('');
  };

  return (
    <details>
      <summary><strong>Proteínas</strong></summary>
      <div>
        <label htmlFor="tipoProteina">Proteína:</label>
        <select id="tipoProteina" value={tipoProteina} onChange={e => setTipoProteina(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="Huevos">Huevos</option>
          <option value="Mortadela">Mortadela</option>
          <option value="Salchichón">Salchichón</option>
        </select>

        <button type="button" onClick={handleAgregar}>Agregar</button>
      </div>

      <div className="card">
        <h4>Resumen Proteínas</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Proteínas').map((item, index) => (
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

export default Proteinas;