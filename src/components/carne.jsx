import React, { useState, useEffect, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const carnesProductos = [
  { nombre: "Res", gramosPorPersona: 150 },
  { nombre: "Cerdo", gramosPorPersona: 150 },
  { nombre: "Pollo", gramosPorPersona: 150 },
];

const Carnes = ({ abierto, alAbrir }) => {
  const [tipoCarne, setTipoCarne] = useState('');
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
    if (!tipoCarne || personas <= 0) {
      alert('Seleccione tipo de carne y asegúrese que la cantidad de personas está definida en el menú principal.');
      return;
    }

    const producto = carnesProductos.find(p => p.nombre === tipoCarne);
    if (!producto) return;

    const gramosTotales = producto.gramosPorPersona * personas;
    const cantidadKg = (gramosTotales / 1000).toFixed(2);

    agregarItem({
      seccion: 'Carnes',
      tipo: tipoCarne,
      unidad: 'kg',
      cantidad: cantidadKg,
    });

    setTipoCarne('');
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Carnes</strong></summary>
      <div>
        <label className='labelAbarrote' htmlFor="tipoCarne">Tipo de carne:</label>
        <select
          className='selectAbarrote'
          id="tipoCarne"
          value={tipoCarne}
          onChange={e => setTipoCarne(e.target.value)}
        >
          <option value="">Seleccione</option>
          {carnesProductos.map(p => (
            <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
          ))}
        </select>

        <button type="button" onClick={handleAgregar}>Agregar</button>
      </div>

      <div className="card">
        <h4>Resumen Carnes</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Carnes').map((item, index) => (
              <tr key={index}>
                <td>{item.tipo}</td>
                <td>{item.unidad}</td>
                <td>{item.cantidad}</td>
                <td><button onClick={() => eliminarItem(idx)}><i class="material-icons">delete</i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Carnes;
