import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const gramosPorPersona = 120; // gramos por persona para todas las verduras

const Verduras = ({ abierto, alAbrir }) => {
  const [tipoVerdura, setTipoVerdura] = useState('');
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);

  const cantidadPersonas = parseInt(datosFormulario.cantidad) || 0;

  const handleAgregar = () => {
    if (!tipoVerdura) {
      alert("Seleccione una verdura");
      return;
    }
    if (cantidadPersonas <= 0) {
      alert("Debe definir la cantidad de personas en el menú principal.");
      return;
    }

    // Calcular cantidad en kg: (gramosPorPersona * cantidadPersonas) / 1000
    const cantidadKg = ((gramosPorPersona * cantidadPersonas) / 1000).toFixed(2);

    agregarItem({
      seccion: 'Verduras',
      tipo: tipoVerdura,
      unidad: 'kg',
      cantidad: cantidadKg
    });

    setTipoVerdura('');
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Verduras</strong></summary>
      <div>
        <label className='labelAbarrote' htmlFor="tipoVerdura">Verdura:</label>
        <select
          className='selectAbarrote'
          id="tipoVerdura"
          value={tipoVerdura}
          onChange={e => setTipoVerdura(e.target.value)}
        >
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
            <td><button onClick={() => eliminarItem(index)}><i class="material-icons">delete</i></button></td>              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Verduras;
