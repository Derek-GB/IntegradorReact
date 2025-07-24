import React, { useState, useEffect, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const gramosPorPersona = 120;

const Verduras = ({ abierto, alAbrir }) => {
  const [tipoVerdura, setTipoVerdura] = useState('');
  const { agregarItem, eliminarItem, limpiarItems, items, datosFormulario } = useContext(contextoAbastecimiento);

  const cantidadPersonas = parseInt(datosFormulario.cantidad) || 0;

  useEffect(() => {
    limpiarItems(); 
  }, []);

  const handleAgregar = () => {
    if (!tipoVerdura) {
      alert("Seleccione una verdura");
      return;
    }

    if (cantidadPersonas <= 0) {
      alert("Debe definir la cantidad de personas en el menú principal.");
      return;
    }

    // Obtener verduras ya agregadas
    const verdurasAgregadas = items.filter(i => i.seccion === 'Verduras');
    const tiposUnicos = [...new Set(verdurasAgregadas.map(i => i.tipo))];

    if (tiposUnicos.includes(tipoVerdura)) {
      alert('Esta verdura ya fue agregada.');
      return;
    }

    if (tiposUnicos.length >= 2) {
      alert('Solo se pueden agregar hasta 2 tipos de verdura.');
      return;
    }

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
                <td>
                  <button onClick={() => eliminarItem(index)}>
                    <i className="material-icons">delete</i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Verduras;
