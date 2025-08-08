import { useState, useContext, useEffect } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';
import { consumiblesAPI } from '../../helpers/api.js';

export const useFormularioAbarrotes = () => {
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);

  // Estados para cada categoría
  const [carnesProductos, setCarnesProductos] = useState([]);
  const [proteinaProductos, setProteinaProductos] = useState([]);
  const [verdurasProductos, setVerdurasProductos] = useState([]);
  const [oloresProductos, setOloresProductos] = useState([]);
  const [abarrotesProductos, setAbarrotesProductos] = useState([]);
  const [limpiezaProductos, setLimpiezaProductos] = useState([]);

  // Estados para UI y selecciones
  const [tipoCarne, setTipoCarne] = useState('');
  const [tipoProteina, setTipoProteina] = useState('');
  const [tipoVerdura, setTipoVerdura] = useState('');

  const [openResumenParcial, setOpenResumenParcial] = useState(false);
  const [openResumenFinal, setOpenResumenFinal] = useState(false);
  const [seccionAbierta, setSeccionAbierta] = useState('Carnes');

  // Número de personas para cálculos
  const personas = parseInt(datosFormulario?.cantidad) || 0;

  // Estilos modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await consumiblesAPI.getAll();
        console.log('Consumibles completos:', data);
        const consumibles = data.data || data || [];

        setCarnesProductos(
          consumibles
            .filter(item => item.nombreCategoria === 'Carnes')
            .map(c => ({
              nombre: c.nombreConsumible,
              gramosPorPersona: c.cantidadPorPersona ? parseFloat(c.cantidadPorPersona) : 120,
              unidad: c.nombreUnidadMedida || 'kg',
            }))
        );

        setProteinaProductos(
          consumibles
            .filter(item => item.nombreCategoria === 'Proteina')
            .map(p => ({
              nombre: p.nombreConsumible,
              gramosPorPersona: p.cantidadPorPersona ? parseFloat(p.cantidadPorPersona) : 100,
              unidad: p.nombreUnidadMedida || 'Unidad',
            }))
        );

        setVerdurasProductos(
          consumibles
            .filter(item => item.nombreCategoria === 'Verduras')
            .map(v => ({
              nombre: v.nombreConsumible,
              gramosPorPersona: v.cantidadPorPersona ? parseFloat(v.cantidadPorPersona) : 120,
              unidad: v.nombreUnidadMedida || 'kg',
            }))
        );

        setOloresProductos(
          consumibles
            .filter(item => item.nombreCategoria === 'Olores y otros')
            .map(o => ({
              nombre: o.nombreConsumible,
              factor: o.factor ? parseFloat(o.factor) : 0.01,
              unidad: o.nombreUnidadMedida || 'Unidad',
            }))
        );

        setAbarrotesProductos(
          consumibles
            .filter(item => item.nombreCategoria === 'Abarrotes')
            .map(a => ({
              nombre: a.nombreConsumible,
              gramosPorPersona: a.cantidadPorPersona ? parseFloat(a.cantidadPorPersona) : 100,
              mililitrosPorPersona: a.mililitrosPorPersona ? parseFloat(a.mililitrosPorPersona) : undefined,
              paquetesPorPersona: a.paquetesPorPersona ? parseFloat(a.paquetesPorPersona) : undefined,
              rebanadasPorPersona: a.rebanadasPorPersona ? parseFloat(a.rebanadasPorPersona) : undefined,
              unidadesPorPersona: a.unidadesPorPersona ? parseFloat(a.unidadesPorPersona) : undefined,
              unidad: a.nombreUnidadMedida || 'Unidad',
            }))
        );

        // Aquí el filtro corregido para Productos de Limpieza
        setLimpiezaProductos(
          consumibles
            .filter(item => item.nombreCategoria?.toLowerCase().includes('limpieza'))
            .map(l => ({
              nombre: l.nombreConsumible,
              gramosPorPersona: l.cantidadPorPersona ? parseFloat(l.cantidadPorPersona) : 100,
              mililitrosPorPersona: l.mililitrosPorPersona ? parseFloat(l.mililitrosPorPersona) : undefined,
              paquetesPorPersona: l.paquetesPorPersona ? parseFloat(l.paquetesPorPersona) : undefined,
              rebanadasPorPersona: l.rebanadasPorPersona ? parseFloat(l.rebanadasPorPersona) : undefined,
              unidadesPorPersona: l.unidadesPorPersona ? parseFloat(l.unidadesPorPersona) : undefined,
              unidad: l.nombreUnidadMedida || 'Unidad',
            }))
        );
      } catch (error) {
        console.error('Error cargando productos:', error);
        showCustomToast('Error', 'No se pudieron cargar los productos desde el servidor.');
      }
    }
    fetchProductos();
  }, []);

  const calcularCantidad = (producto) => {
    if (!personas || personas <= 0) return 0;
    if (producto.factor !== undefined) return (producto.factor * personas).toFixed(2);
    if (producto.gramosPorPersona !== undefined) return ((producto.gramosPorPersona * personas) / 1000).toFixed(2);
    if (producto.mililitrosPorPersona !== undefined) return ((producto.mililitrosPorPersona * personas) / 1000).toFixed(2);
    if (producto.paquetesPorPersona !== undefined) return producto.paquetesPorPersona * personas;
    if (producto.rebanadasPorPersona !== undefined) return personas * producto.rebanadasPorPersona;
    if (producto.unidadesPorPersona !== undefined) return personas * producto.unidadesPorPersona;
    return 1;
  };

  const handleToggleProducto = (categoria, producto) => {
    const index = items.findIndex(i => i.seccion === categoria && i.tipo === producto.nombre);
    if (index !== -1) {
      eliminarItem(index);
    } else {
      const cantidad = calcularCantidad(producto);
      if (!cantidad || cantidad <= 0) {
        showCustomToast('Error', 'Debe definir la cantidad de personas en el menú principal.');
        return;
      }
      agregarItem({
        tipoComida: categoria,
        seccion: categoria,
        tipo: producto.nombre,
        unidad: producto.unidad || 'Unidad',
        cantidad,
        cantidadPersonas: personas
      });
    }
  };

  const handleAgregarCarne = () => {
    if (!tipoCarne || personas <= 0) {
      showCustomToast('Warning', 'Seleccione carne y defina cantidad de personas.');
      return;
    }
    const carnesAgregadas = items.filter(i => i.seccion === 'Carnes');
    if (carnesAgregadas.length >= 2) {
      showCustomToast('Warning', 'Solo 2 tipos de carne permitidos.');
      return;
    }
    if (carnesAgregadas.some(i => i.tipo === tipoCarne)) {
      showCustomToast('Warning', 'Esta carne ya fue agregada.');
      return;
    }
    const producto = carnesProductos.find(p => p.nombre === tipoCarne);
    if (!producto) return;

    const cantidadKg = (producto.gramosPorPersona * personas) / 1000;
    if (agregarProducto('Carnes', producto, cantidadKg)) {
      setTipoCarne('');
    }
  };

  const handleAgregarProteina = () => {
    if (!tipoProteina || personas <= 0) {
      showCustomToast('Warning', 'Seleccione proteína y defina cantidad de personas.');
      return;
    }
    const proteinasAgregadas = items.filter(i => i.seccion === 'Proteina');
    if (proteinasAgregadas.length >= 1) {
      showCustomToast('Warning', 'Solo una proteína permitida.');
      return;
    }
    if (proteinasAgregadas.some(i => i.tipo === tipoProteina)) {
      showCustomToast('Warning', 'Esta proteína ya fue agregada.');
      return;
    }
    const producto = proteinaProductos.find(p => p.nombre === tipoProteina);
    if (!producto) return;

    const cantidadKg = (producto.gramosPorPersona * personas) / 1000;
    if (agregarProducto('Proteina', producto, cantidadKg)) {
      setTipoProteina('');
    }
  };

  const handleAgregarVerdura = () => {
    if (!tipoVerdura || personas <= 0) {
      showCustomToast('Warning', 'Seleccione verdura y defina cantidad de personas.');
      return;
    }
    const verdurasAgregadas = items.filter(i => i.seccion === 'Verduras');
    const tiposUnicos = [...new Set(verdurasAgregadas.map(i => i.tipo))];
    if (tiposUnicos.length >= 2) {
      showCustomToast('Warning', 'Solo 2 tipos de verdura permitidos.');
      return;
    }
    if (tiposUnicos.includes(tipoVerdura)) {
      showCustomToast('Warning', 'Esta verdura ya fue agregada.');
      return;
    }
    const producto = verdurasProductos.find(p => p.nombre === tipoVerdura);
    if (!producto) return;

    const cantidadKg = (producto.gramosPorPersona * personas) / 1000;
    if (agregarProducto('Verduras', producto, cantidadKg)) {
      setTipoVerdura('');
    }
  };

  const agregarProducto = (categoria, producto, cantidadCalculada) => {
    const cantidad = parseFloat(cantidadCalculada);
    if (items.some(i => i.seccion === categoria && i.tipo === producto.nombre)) {
      showCustomToast('Warning', `El producto "${producto.nombre}" ya fue agregado.`);
      return false;
    }
    if (!cantidad || cantidad <= 0) {
      showCustomToast('Error', 'Debe definir la cantidad de personas en el menú principal.');
      return false;
    }
    agregarItem({
      tipoComida: categoria,
      seccion: categoria,
      tipo: producto.nombre,
      unidad: producto.unidad || 'Unidad',
      cantidad,
      cantidadPersonas: personas
    });
    return true;
  };

  const toggleSeccion = (nombre) => {
    setSeccionAbierta(prev => (prev === nombre ? '' : nombre));
  };

  const handleOpenResumenParcial = () => setOpenResumenParcial(true);
  const handleCloseResumenParcial = () => setOpenResumenParcial(false);
  const handleOpenResumenFinal = () => setOpenResumenFinal(true);
  const handleCloseResumenFinal = () => setOpenResumenFinal(false);

  const categorias = {
    Carnes: carnesProductos,
    Proteina: proteinaProductos,
    Verduras: verdurasProductos,
    "Olores y otros": oloresProductos,
    Abarrotes: abarrotesProductos,
    "Productos de Limpieza": limpiezaProductos,
  };

  return {
    openResumenParcial,
    openResumenFinal,
    tipoCarne,
    tipoProteina,
    tipoVerdura,
    seccionAbierta,
    personas,
    modalStyle,

    carnesProductos,
    proteinaProductos,
    verdurasProductos,
    oloresProductos,
    abarrotesProductos,
    limpiezaProductos,
    categorias,
    items,

    setTipoCarne,
    setTipoProteina,
    setTipoVerdura,

    handleOpenResumenParcial,
    handleCloseResumenParcial,
    handleOpenResumenFinal,
    handleCloseResumenFinal,

    toggleSeccion,
    handleAgregarCarne,
    handleAgregarProteina,
    handleAgregarVerdura,
    handleToggleProducto,
    eliminarItem,
    calcularCantidad,
  };
};
