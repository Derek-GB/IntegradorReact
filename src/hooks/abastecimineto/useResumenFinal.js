
import { useContext } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';
import { useNavigate } from 'react-router-dom';

export default function useResumenFinal() {
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

  return {
    items,
    datosFormulario,
    agrupados,
    guardarDatos,
    descargarResumen,
    navigate
  };
}
