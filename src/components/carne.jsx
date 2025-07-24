import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const Carnes = ({ abierto, alAbrir }) => {
  const [tipoCarne, setTipoCarne] = useState('');
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);

  const handleAgregar = () => {
    const cantidadPersonas = parseInt(datosFormulario.cantidad);

    if (!tipoCarne || !cantidadPersonas || isNaN(cantidadPersonas)) {
      alert('Seleccione tipo de carne y asegúrese que hay cantidad de personas definida en el menú principal.');
      return;
    }

    const cantidadKg = ((cantidadPersonas * 125) / 1000).toFixed(2);
    agregarItem({ seccion: 'Carnes', tipo: tipoCarne, unidad: 'kg', cantidad: cantidadKg });
    setTipoCarne('');
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Carnes</strong></summary>
      <div>
        <p>* Se calculan automáticamente 125 gramos por persona. *</p>

        <label className='labelAbarrote'>Tipo de carne:</label>
        <select className='selectAbarrote' value={tipoCarne} onChange={e => setTipoCarne(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="Pollo">Pollo</option>
          <option value="Cerdo">Cerdo</option>
          <option value="Res">Res</option>
        </select>

<button type="button" onClick={handleAgregar}>Agregar</button>

<div>
  <h4>Resumen Carnes</h4>
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
