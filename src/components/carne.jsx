import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const Carnes = () => {
  const [personas, setPersonas] = useState('');
  const [tipoCarne, setTipoCarne] = useState('');
  const { agregarItem, eliminarItem, items } = useContext(contextoAbastecimiento);

  const handleAgregar = () => {
    if (!personas || !tipoCarne) return;
    const cantidadKg = ((parseInt(personas) * 120) / 1000).toFixed(2);
    agregarItem({ seccion: 'Carnes', tipo: tipoCarne, unidad: 'kg', cantidad: cantidadKg });
    setPersonas('');
    setTipoCarne('');
  };

  return (
    <details open>
      <summary><strong>Carnes</strong></summary>
      <div>
        <label>Cantidad de personas:</label>
        <input type="number" value={personas} onChange={e => setPersonas(e.target.value)} />
        <p>* Se calculan automáticamente 120 gramos por persona. *</p>

        <label>Tipo de carne:</label>
        <select value={tipoCarne} onChange={e => setTipoCarne(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="Pollo">Pollo</option>
          <option value="Cerdo">Cerdo</option>
          <option value="Res">Res</option>
        </select>

        <button type="button" onClick={handleAgregar}>Agregar</button>
      </div>

      <div>
        <h4>Resumen</h4>
        <table>
          <thead>
            <tr><th>Tipo</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Carnes').map((item, idx) => (
              <tr key={idx}>
                <td>{item.tipo}</td>
                <td>{item.unidad}</td>
                <td>{item.cantidad}</td>
                <td><button onClick={() => eliminarItem(idx)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Carnes;