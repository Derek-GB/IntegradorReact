import React from 'react';
import useResumenFinal from '../../hooks/abastecimineto/useResumenFinal';
import '../../styles/resumenFinal.css';

const ResumenFinal = () => {
  const {
    items,
    datosFormulario,
    agrupados,
    guardarDatos,
    descargarResumen
  } = useResumenFinal();

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

 {}
 <div className="botones mt-4 flex justify-center gap-4"> {}
 {}
 <button
 onClick={guardarDatos}
 className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md flex-1"
 >
 Guardar datos
 </button>
 {}
 <button
 onClick={descargarResumen}
 className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md flex-1" 
 >
 Descargar Formulario
 </button>
 </div>
 </div>
 );
};

export default ResumenFinal;