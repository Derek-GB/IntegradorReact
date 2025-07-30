import { useContext } from "react";
import { contextoAbastecimiento } from "../../context/contextoAbastecimiento";
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { useNavigate } from "react-router-dom";

const useResumenFinal = () => {
  const { items, datosFormulario, eliminarItem, editarItem } = useContext(contextoAbastecimiento);
  const navigate = useNavigate();

  const agrupados = items.reduce((acc, item) => {
    if (!acc[item.seccion]) acc[item.seccion] = [];
    acc[item.seccion].push(item);
    return acc;
  }, {});

  const descargarResumen = () => {
    if (items.length === 0) {
      showCustomToast("No hay datos para descargar.", 'error');
      return;
    }

    const encabezado = "Sección,Tipo,Unidad,Cantidad";
    const cuerpo = items
      .map((i) => `${i.seccion},${i.tipo},${i.unidad},${i.cantidad}`)
      .join("\n");
    const texto = `${encabezado}\n${cuerpo}`;

    const blob = new Blob([texto], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resumen_abastecimiento.csv";
    a.click();
    URL.revokeObjectURL(url);

    showCustomToast("Descarga completada.", 'success');
  };

  return {
    items,
    datosFormulario,
    agrupados,
    descargarResumen,
    eliminarItem,
    editarItem,
    navigate,
  };
};

export default useResumenFinal;
