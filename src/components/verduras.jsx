import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const Verduras = () => {
  const [tipoVerdura, setTipoVerdura] = useState('');
  const { agregarItem, eliminarItem, items } = useContext(contextoAbastecimiento);

  const handleAgregar = () => {
    if (!tipoVerdura) return;
    agregarItem({
      seccion: 'Verduras',
      tipo: tipoVerdura,
      unidad: 'kg',
      cantidad: 1
    });
    setTipoVerdura('');
  };

  return (
    <details>
      <summary><strong>Verduras</strong></summary>
      <div>
        <label htmlFor="tipoVerdura">Verdura:</label>
        <select id="tipoVerdura" value={tipoVerdura} onChange={e => setTipoVerdura(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="Yuca">Yuca</option>
          <option value="Papa">Papa</option>
          <option value="Camote">Camote</option>
          <option value="Chayote">Chayote</option>
        </select>
        <button type="button" onClick={handleAgregar}>Agregar</button>
      </div>

      <div className="card">
        <h4>Resumen Verduras</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Verduras').map((item, index) => (
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

export default Verduras;