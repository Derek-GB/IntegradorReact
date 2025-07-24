import React, { useState, useEffect, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const Proteinas = ({ abierto, alAbrir }) => {
  const [tipoProteina, setTipoProteina] = useState('');
  const [personas, setPersonas] = useState(0);
  const { agregarItem, eliminarItem, items } = useContext(contextoAbastecimiento);

  useEffect(() => {
    const datos = localStorage.getItem('datosFormulario');
    if (datos) {
      const datosParseados = JSON.parse(datos);
      setPersonas(Number(datosParseados.cantidad) || 0);
    }
  }, []);

  const handleAgregar = () => {
    if (!tipoProteina || personas <= 0) {
      alert('Seleccione proteína y asegúrese que hay cantidad de personas definida en el menú principal.');
      return;
    }

    let unidad = 'Unidad';
    let cantidad = 1;

    switch (tipoProteina) {
      case 'Huevos':
        unidad = 'Cartón (30 unidades)';
        cantidad = Math.ceil(personas / 30);
        break;
      case 'Mortadela':
        unidad = 'kg';
        cantidad = ((personas * 25) / 1000).toFixed(2);
        break;
      case 'Salchichón':
        unidad = 'kg';
        cantidad = ((personas * 125) / 1000).toFixed(2);
        break;
      default:
        cantidad = 1;
        break;
    }

    agregarItem({
      seccion: 'Proteínas',
      tipo: tipoProteina,
      unidad,
      cantidad
    });

    setTipoProteina('');
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Proteínas</strong></summary>
      <div>
        <label className='labelAbarrote' htmlFor="tipoProteina">Proteína:</label>
        <select
          className='selectAbarrote'
          id="tipoProteina"
          value={tipoProteina}
          onChange={e => setTipoProteina(e.target.value)}
        >
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
