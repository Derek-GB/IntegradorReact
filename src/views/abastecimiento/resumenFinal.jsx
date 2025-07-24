// src/components/ResumenFinal.jsx
import React, { useContext } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';
import { useNavigate } from 'react-router-dom';
import '../../styles/resumenFinal.css'; // Asegúrate de tener o crear este archivo CSS

const ResumenFinal = () => {
  const { items, datosFormulario } = useContext(contextoAbastecimiento);
  const navigate = useNavigate();

  const agrupados = items.reduce((acc, item) => {
    if (!acc[item.seccion]) acc[item.seccion] = [];
    acc[item.seccion].push(item);
    return acc;
  }, {});

  const guardarDatos = () => {
    alert('Datos guardados exitosamente.');
    console.log('Datos:', { datosFormulario, productos: items });
  };

  const descargarResumen = () => {
    const texto = items.map(i =>
      `${i.seccion},${i.tipo},${i.unidad},${i.cantidad}`
    ).join('\n');
    const blob = new Blob([texto], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumen_abastecimiento.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="resumen-container">
      <section className="seccion">
        <h2>Datos del Formulario</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo de Comida</th>
              <th>Cantidad de Personas</th>
              <th>Nombre del Albergue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{datosFormulario?.fecha || '-'}</td>
              <td>{datosFormulario?.tipo || '-'}</td>
              <td>{datosFormulario?.cantidad || '-'}</td>
              <td>{datosFormulario?.albergue || '-'}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="seccion">
        <h2>Productos Registrados</h2>
        <table className="tabla">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Producto</th>
              <th>Unidad</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(agrupados).map(([categoria, productos]) =>
              productos.map((item, index) => (
                <tr key={`${categoria}-${index}`}>
                  <td>{categoria}</td>
                  <td>{item.tipo}</td>
                  <td>{item.unidad}</td>
                  <td>{item.cantidad}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <div className="botones">
        <button onClick={guardarDatos} className="btn-amarillo">Guardar datos</button>
        <button onClick={descargarResumen} className="btn-amarillo">Descargar Formulario</button>
      </div>
    </div>
  );
};

export default ResumenFinal;
