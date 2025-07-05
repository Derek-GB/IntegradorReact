import React, { useContext } from 'react';
import { AbastecimientoContext } from '../context/AbastecimientoContext';
import { useNavigate } from 'react-router-dom';

const ResumenFinal = () => {
  const { items } = useContext(AbastecimientoContext);
  const navigate = useNavigate();

  const agrupados = items.reduce((acc, item) => {
    if (!acc[item.seccion]) acc[item.seccion] = [];
    acc[item.seccion].push(item);
    return acc;
  }, {});

  const guardarDatos = () => {
    // Simula envío a backend
    console.log('Datos enviados:', items);
    alert('Datos guardados exitosamente.');
  };

  const descargarResumen = () => {
    const texto = items.map(i => `${i.seccion},${i.tipo},${i.unidad},${i.cantidad}`).join('\n');
    const blob = new Blob([texto], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resumen_abastecimiento.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="content-area">
      <header className="top-header">
        <h1>Resumen Total de Abastecimiento</h1>
        <button className="back-button" onClick={() => navigate('/formulario')}>
          <span className="material-icons">arrow_back</span>
        </button>
      </header>

      <main className="main-content">
        <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
          <h2 style={{ marginTop: '2rem' }}>Productos Registrados</h2>
          <table>
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
                  <tr key={index}>
                    <td>{categoria}</td>
                    <td>{item.tipo}</td>
                    <td>{item.unidad}</td>
                    <td>{item.cantidad}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="boton-resumen-final">
            <button onClick={guardarDatos}>Guardar datos</button>
            <button onClick={descargarResumen}>Descargar Formulario</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumenFinal;