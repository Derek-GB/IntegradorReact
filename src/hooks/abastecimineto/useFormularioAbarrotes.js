import { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';

// Productos por categoría
const carnesProductos = [
  { nombre: "Pollo", gramosPorPersona: 120 },
  { nombre: "Carne de res", gramosPorPersona: 120 },
  { nombre: "Carne de cerdo", gramosPorPersona: 120 }
];

const proteinasProductos = [
  { nombre: 'Huevos', unidad: 'Unidad', factor: 1 },
  { nombre: 'Mortadela', unidad: 'kg', gramosPorPersona: 25 },
  { nombre: 'Salchichón', unidad: 'kg', gramosPorPersona: 125 }
];

const verdurasProductos = [
  { nombre: 'Yuca', unidad: 'kg', gramosPorPersona: 120 },
  { nombre: 'Papa', unidad: 'kg', gramosPorPersona: 120 },
  { nombre: 'Camote', unidad: 'kg', gramosPorPersona: 120 },
  { nombre: 'Chayote', unidad: 'kg', gramosPorPersona: 120 }
];

const productosOlores = [
  { nombre: 'Plátano', unidad: 'Unidad', factor: 0.25 },
  { nombre: 'Cebolla', unidad: 'kg', factor: 0.02 },
  { nombre: 'Chile Dulce', unidad: 'Unidad', factor: 0.05 },
  { nombre: 'Tomate', unidad: 'kg', factor: 0.05 },
  { nombre: 'Pepino', unidad: 'kg', factor: 0.05 },
  { nombre: 'Repollo', unidad: 'kg', factor: 0.05 },
  { nombre: 'Ajo', unidad: 'kg', factor: 0.005 },
  { nombre: 'Culantro rollo', unidad: 'Rollo', factor: 0.01 },
  { nombre: 'Apio', unidad: 'kg', factor: 0.01 },
  { nombre: 'Salsa Lizano', unidad: 'Litro', factor: 0.005 },
  { nombre: 'Vinagre', unidad: 'Litro', factor: 0.003 },
  { nombre: 'Oregano', unidad: 'Rollo', factor: 0.003 },
  { nombre: 'Pimienta', unidad: 'kg', factor: 0.001 },
  { nombre: 'Comino', unidad: 'kg', factor: 0.001 },
  { nombre: 'Salsa de Tomate', unidad: 'Litro', factor: 0.005 },
  { nombre: 'Mayonesa', unidad: 'Litro', factor: 0.005 },
  { nombre: 'Sal', unidad: 'kg', factor: 0.005 },
  { nombre: 'Mantequilla', unidad: 'kg', factor: 0.005 },
  { nombre: 'Achiote', unidad: 'Caja', factor: 0.001 },
  { nombre: 'Consome', unidad: 'kg', factor: 0.005 }
];

const productosAbarrotes = [
  { nombre: "Arroz 80% grano entero", unidad: "kg", gramosPorPersona: 266 },
  { nombre: "Frijoles", unidad: "kg", gramosPorPersona: 106 },
  { nombre: "Azúcar", unidad: "kg", gramosPorPersona: 33.3 },
  { nombre: "Aceite de soya", unidad: "L", mililitrosPorPersona: 33 },
  { nombre: "Café", unidad: "kg", gramosPorPersona: 33.3 },
  { nombre: "Espagueti", unidad: "kg", gramosPorPersona: 33.3 },
  { nombre: "Atún en trozos", unidad: "latas", gramosPorPersona: 21.3 },
  { nombre: "Avena en polvo", unidad: "kg", gramosPorPersona: 26.6 },
  { nombre: "Refresco", unidad: "paquetes", paquetesPorPersona: 1 },
  { nombre: "Leche en polvo", unidad: "kg", gramosPorPersona: 52 },
  { nombre: "Agua dulce en polvo", unidad: "kg", gramosPorPersona: 13.3 },
  { nombre: "Pan Cuadrado", unidad: "rebanadas", rebanadasPorPersona: 2 },
  { nombre: "Tortillas", unidad: "unidades", unidadesPorPersona: 2 },
  { nombre: "Pasta de tomate", unidad: "kg", gramosPorPersona: 33.3 }
];

const productosLimpieza = [
  { nombre: "Bolsas para basura Grande", unidad: "paquete", gramosPorPersona: null, conversion: 10 },
  { nombre: "Bolsas para basura medianas", unidad: "paquete", gramosPorPersona: null, conversion: 10 },
  { nombre: "Papel Higiénico", unidad: "rollo", gramosPorPersona: null, conversion: 1 },
  { nombre: "Pasta dental", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón en polvo", unidad: "kg", gramosPorPersona: null, conversion: 0.01 },
  { nombre: "Cloro", unidad: "litro", gramosPorPersona: null, conversion: 0.02 },
  { nombre: "Jabón de baño", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Guantes de Cocina (Hule)", unidad: "par", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón lavamanos", unidad: "litro", gramosPorPersona: null, conversion: 0.01 },
  { nombre: "Jabón Lavaplatos Caja", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desinfectante", unidad: "litro", gramosPorPersona: null, conversion: 0.02 },
  { nombre: "Esponja lava platos", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Fosforos", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desodorante unisex", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Champú", unidad: "litro", gramosPorPersona: null, conversion: 0.01 },
  { nombre: "Escoba", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Trapeador piso", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Limpiones", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Trapos o mechas", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Toallas de papel", unidad: "rollo", gramosPorPersona: null, conversion: 1 },
  { nombre: "Bomba desatorar servicios", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Toalla sanitaria", unidad: "paquete", gramosPorPersona: null, conversion: 10 },
  { nombre: "Pañales niño M unidades", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Pañales niño L unidades", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Pañales niño XL unidades", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Pañales niño XXL unidades", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Recarga de Gas de 25 lb", unidad: "recarga", gramosPorPersona: null, conversion: 1 },
  { nombre: "Cepillo Dental", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Platos Desechables", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Vaso Desechable", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Cuchara Desechables", unidad: "unidad", gramosPorPersona: null, conversion: 1 }
];

// Categorías con sus productos
const categorias = {
  Carnes: carnesProductos,
  Proteínas: proteinasProductos,
  Verduras: verdurasProductos,
  Olores: productosOlores,
  Abarrotes: productosAbarrotes,
  Limpieza: productosLimpieza
};

export const useFormularioAbarrotes = () => {
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);

  // Estados para modales
  const [openResumenParcial, setOpenResumenParcial] = useState(false);
  const [openResumenFinal, setOpenResumenFinal] = useState(false);

  // Estados para tipos seleccionados
  const [tipoCarne, setTipoCarne] = useState('');
  const [tipoProteina, setTipoProteina] = useState('');
  const [tipoVerdura, setTipoVerdura] = useState('');

  // Estado para sección abierta
  const [seccionAbierta, setSeccionAbierta] = useState('carnes');

  const personas = parseInt(datosFormulario?.cantidad) || 0;

  // Manejadores de modales
  const handleOpenResumenParcial = () => setOpenResumenParcial(true);
  const handleCloseResumenParcial = () => setOpenResumenParcial(false);
  const handleOpenResumenFinal = () => setOpenResumenFinal(true);
  const handleCloseResumenFinal = () => setOpenResumenFinal(false);

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

  const toggleSeccion = (nombre) => {
    setSeccionAbierta(prev => (prev === nombre ? '' : nombre));
  };

  // Función común para agregar producto validando duplicados
  const agregarProducto = (categoria, producto, cantidadCalculada) => {
    if (items.some(i => i.seccion === categoria && i.tipo === producto.nombre)) {
      showCustomToast('Warning', `El producto "${producto.nombre}" ya fue agregado.`);
      return false;
    }
    if (!cantidadCalculada || cantidadCalculada <= 0) {
      showCustomToast('Error', "Debe definir la cantidad de personas en el menú principal.");
      return false;
    }
    agregarItem({
      tipoComida: categoria,
      seccion: categoria,
      tipo: producto.nombre,
      unidad: producto.unidad || 'Unidad',
      cantidad: cantidadCalculada,
      cantidadPersonas: personas
    });
    return true;
  };

  // CARNES
  const handleAgregarCarne = () => {
    if (!tipoCarne || personas <= 0) {
      showCustomToast('Warning', 'Seleccione 2 tipos de carne y asegúrese que la cantidad de personas está definida en el menú principal.');
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

    const gramosTotales = producto.gramosPorPersona * personas;
    const cantidadKg = (gramosTotales / 1000).toFixed(2);

    if (agregarProducto('Carnes', producto, cantidadKg)) {
      setTipoCarne('');
    }
  };

  // PROTEINAS
  const handleAgregarProteina = () => {
    if (!tipoProteina || personas <= 0) {
      showCustomToast('Warning', 'Seleccione proteína y asegúrese que hay cantidad de personas definida.');
      return;
    }
    const proteinasAgregadas = items.filter(i => i.seccion === 'Proteínas');
    if (proteinasAgregadas.length >= 1) {
      showCustomToast('Warning', 'Solo una proteína permitida.');
      return;
    }
    if (proteinasAgregadas.some(i => i.tipo === tipoProteina)) {
      showCustomToast('Warning', 'Esta proteína ya fue agregada.');
      return;
    }
    const producto = proteinasProductos.find(p => p.nombre === tipoProteina);
    if (!producto) return;

    let cantidad;
    switch (tipoProteina) {
      case 'Huevos':
        cantidad = personas;
        break;
      case 'Mortadela':
        cantidad = ((personas * 25) / 1000).toFixed(2);
        break;
      case 'Salchichón':
        cantidad = ((personas * 125) / 1000).toFixed(2);
        break;
      default:
        cantidad = 1;
    }
    if (agregarProducto('Proteínas', producto, cantidad)) {
      setTipoProteina('');
    }
  };

  // VERDURAS
  const handleAgregarVerdura = () => {
    if (!tipoVerdura) {
      showCustomToast('Warning', "Seleccione una verdura.");
      return;
    }
    if (personas <= 0) {
      showCustomToast('Warning', "Debe definir la cantidad de personas en el menú principal.");
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

    const cantidadKg = ((producto.gramosPorPersona * personas) / 1000).toFixed(2);
    if (agregarProducto('Verduras', producto, cantidadKg)) {
      setTipoVerdura('');
    }
  };

  // Cálculo genérico de cantidad para otras categorías
  const calcularCantidad = (producto) => {
    if (!personas || personas <= 0) return 0;

    if (producto.factor !== undefined) {
      return (producto.factor * personas).toFixed(2);
    }
    if (producto.gramosPorPersona !== undefined) {
      return ((producto.gramosPorPersona * personas) / 1000).toFixed(2);
    }
    if (producto.mililitrosPorPersona !== undefined) {
      return ((producto.mililitrosPorPersona * personas) / 1000).toFixed(2);
    }
    if (producto.paquetesPorPersona !== undefined) {
      return personas;
    }
    if (producto.rebanadasPorPersona !== undefined) {
      return personas * producto.rebanadasPorPersona;
    }
    if (producto.unidadesPorPersona !== undefined) {
      return personas * producto.unidadesPorPersona;
    }
    if (producto.conversion !== undefined) {
      return Math.ceil(personas / producto.conversion);
    }

    return 1;
  };

  // Maneja agregar producto de otras categorías (Olores, Abarrotes, Limpieza)
  const handleAgregarProducto = (categoria, producto) => {
    if (items.some(i => i.seccion === categoria && i.tipo === producto.nombre)) {
      showCustomToast('Warning', `El producto "${producto.nombre}" ya fue agregado.`);
      return;
    }
    const cantidad = calcularCantidad(producto);
    if (!cantidad || cantidad <= 0) {
      showCustomToast('Error', "Debe definir la cantidad de personas en el menú principal.");
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
    proteinasProductos,
    verdurasProductos,
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
    handleAgregarProducto,
    eliminarItem,

    calcularCantidad
  };
};
