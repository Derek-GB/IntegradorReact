import React, { useContext } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';
import { useNavigate } from 'react-router-dom';
import '../../styles/resumenFinal.css';

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

 {/* Modificaciones aquí para los botones */}
 <div className="botones mt-4 flex justify-center gap-4"> {/* Añadimos 'flex justify-center gap-4' */}
 {/* Botón "Guardar datos" */}
 <button
 onClick={guardarDatos}
 className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md flex-1" // Cambiamos 'w-full mb-2' por 'flex-1'
 >
 Guardar datos
 </button>
 {/* Botón "Descargar Formulario" */}
 <button
 onClick={descargarResumen}
 className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg shadow-md flex-1" // Cambiamos 'w-full' por 'flex-1'
 >
 Descargar Formulario
 </button>
 </div>
 </div>
 );
};

export default ResumenFinal;