import { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../../context/contextoAbastecimiento';

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
  { nombre: "Papel Higiénico", unidad: "rollo", gramosPorPersona: 1 },
  { nombre: "Pasta dental", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón en polvo", unidad: "kg", gramosPorPersona: 0.01 },
  { nombre: "Cloro", unidad: "litro", gramosPorPersona: 0.02 },
  { nombre: "Jabón de baño", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Guantes de Cocina (Hule)", unidad: "par", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón lavamanos", unidad: "litro", gramosPorPersona: 0.01 },
  { nombre: "Jabón Lavaplatos Caja", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desinfectante", unidad: "litro", gramosPorPersona: 0.02 },
  { nombre: "Esponja lava platos", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Fosforos", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desodorante unisex", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Champú", unidad: "litro", gramosPorPersona: 0.01 },
  { nombre: "Escoba", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Trapeador piso", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Limpiones", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Trapos o mechas", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Toallas de papel", unidad: "rollo", gramosPorPersona: 1 },
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

  // CARNES
  const handleAgregarCarne = () => {
    if (!tipoCarne || personas <= 0) {
      alert('Seleccione 2 tipo de carne y asegúrese que la cantidad de personas está definida en el menú principal.');
      return;
    }
    const carnesAgregadas = items.filter(i => i.seccion === 'Carnes');
    if (carnesAgregadas.length >= 2) {
      alert('Solo se pueden agregar 2 tipos de carne.');
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

  // PROTEINAS
  const handleAgregarProteina = () => {
    if (!tipoProteina || personas <= 0) {
      alert('Seleccione proteína y asegúrese que hay cantidad de personas definida en el menú principal.');
      return;
    }
    const proteinasAgregadas = items.filter(i => i.seccion === 'Proteínas');
    if (proteinasAgregadas.length >= 1) {
      alert('Solo se puede agregar una proteína.');
      return;
    }
    let unidad = 'Unidad';
    let cantidad = 1;
    switch (tipoProteina) {
      case 'Huevos':
        unidad = 'Unidad';
        cantidad = personas;
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

  // VERDURAS
  const gramosPorPersonaVerdura = 120;
  const handleAgregarVerdura = () => {
    if (!tipoVerdura) {
      alert("Seleccione dos verduras");
      return;
    }
    if (personas <= 0) {
      alert("Debe definir la cantidad de personas en el menú principal.");
      return;
    }
    const verdurasAgregadas = items.filter(i => i.seccion === 'Verduras');
    const tiposUnicos = [...new Set(verdurasAgregadas.map(i => i.tipo))];
    if (tiposUnicos.includes(tipoVerdura)) {
      alert('Esta verdura ya fue agregada.');
      return;
    }
    if (tiposUnicos.length >= 2) {
      alert('Solo se pueden agregar hasta 2 tipos de verdura.');
      return;
    }
    const cantidadKg = ((gramosPorPersonaVerdura * personas) / 1000).toFixed(2);
    agregarItem({
      seccion: 'Verduras',
      tipo: tipoVerdura,
      unidad: 'kg',
      cantidad: cantidadKg
    });
    setTipoVerdura('');
  };

  // CHECKBOXES
  const calcularCantidad = (producto) => {
    if (!personas || personas <= 0) return 0;
    if (producto.factor) return (producto.factor * personas).toFixed(2);
    if (producto.gramosPorPersona) return ((producto.gramosPorPersona * personas) / 1000).toFixed(2);
    if (producto.mililitrosPorPersona) return ((producto.mililitrosPorPersona * personas) / 1000).toFixed(2);
    if (producto.paquetesPorPersona) return personas;
    if (producto.rebanadasPorPersona) return personas * producto.rebanadasPorPersona;
    if (producto.unidadesPorPersona) return personas * producto.unidadesPorPersona;
    if (producto.conversion) return Math.ceil(personas / producto.conversion);

    return 1;
  };

  const handleAgregarProducto = (categoria, producto) => {
    if (items.some(i => i.seccion === categoria && i.tipo === producto.nombre)) return;
    const cantidad = calcularCantidad(producto);
    if (!cantidad || cantidad <= 0) {
      alert("Debe definir la cantidad de personas en el menú principal.");
      return;
    }
    agregarItem({
      seccion: categoria,
      tipo: producto.nombre,
      unidad: producto.unidad,
      cantidad
    });
  };

  return {
    // Estados
    openResumenParcial,
    openResumenFinal,
    tipoCarne,
    tipoProteina,
    tipoVerdura,
    seccionAbierta,
    personas,
    modalStyle,
    
    // Datos
    carnesProductos,
    proteinasProductos,
    verdurasProductos,
    categorias,
    items,
    
    // Manejadores de estado
    setTipoCarne,
    setTipoProteina,
    setTipoVerdura,
    
    // Manejadores de modales
    handleOpenResumenParcial,
    handleCloseResumenParcial,
    handleOpenResumenFinal,
    handleCloseResumenFinal,
    
    // Manejadores de funcionalidad
    toggleSeccion,
    handleAgregarCarne,
    handleAgregarProteina,
    handleAgregarVerdura,
    handleAgregarProducto,
    eliminarItem,
    
    // Funciones de cálculo
    calcularCantidad
  };
};