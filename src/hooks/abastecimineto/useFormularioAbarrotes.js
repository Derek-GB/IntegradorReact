import { useState, useContext, useEffect } from "react";
import { contextoAbastecimiento } from "../../context/contextoAbastecimiento";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";
import { consumiblesAPI } from "../../helpers/api.js";

export const useFormularioAbarrotes = () => {
  const { agregarItem, eliminarItem, items, datosFormulario, limpiarItems } = useContext(contextoAbastecimiento);
  const [carnesProductos, setCarnesProductos] = useState([]);
  const [proteinaProductos, setProteinaProductos] = useState([]);
  const [verdurasProductos, setVerdurasProductos] = useState([]);
  const [oloresProductos, setOloresProductos] = useState([]);
  const [abarrotesProductos, setAbarrotesProductos] = useState([]);
  const [limpiezaProductos, setLimpiezaProductos] = useState([]);
  const [tipoCarne, setTipoCarne] = useState("");
  const [tipoProteina, setTipoProteina] = useState("");
  const [tipoVerdura, setTipoVerdura] = useState("");
  const [openResumenParcial, setOpenResumenParcial] = useState(false);
  const [openResumenFinal, setOpenResumenFinal] = useState(false);
  const [seccionAbierta, setSeccionAbierta] = useState("Carnes");
  const personas = parseInt(datosFormulario?.cantidad) || 0;

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "80vh",
    overflowY: "auto",
  };

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await consumiblesAPI.getAll();
        const consumibles = data.data || data || [];

        // Carnes
        setCarnesProductos(
          consumibles
            .filter((item) => item.nombreCategoria === "Carnes")
            .map((c) => ({
              nombre: c.nombreConsumible,
              gramosPorPersona: c.cantidadPorPersona ? parseFloat(c.cantidadPorPersona) : 120,
              unidad: c.nombreUnidadMedida || "kg",
            }))
        );

        // Proteínas
        setProteinaProductos(
          consumibles
            .filter((item) => item.nombreCategoria === "Proteina")
            .map((p) => {
              if (p.nombreConsumible.toLowerCase().includes("huevo")) {
                return {
                  nombre: p.nombreConsumible,
                  unidadesPorPersona: p.unidadesPorPersona ? parseFloat(p.unidadesPorPersona) : 1, 
                  unidad: p.nombreUnidadMedida || "Unidad",
                };
              } else if (p.nombreConsumible.toLowerCase().includes("mortadela")) {
                return {
                  nombre: p.nombreConsumible,
                  gramosPorPersona: p.cantidadPorPersona ? parseFloat(p.cantidadPorPersona) : 25,
                  unidad: p.nombreUnidadMedida || "kg",
                };
              } else if (p.nombreConsumible.toLowerCase().includes("salchichón")) {
                return {
                  nombre: p.nombreConsumible,
                  gramosPorPersona: p.cantidadPorPersona ? parseFloat(p.cantidadPorPersona) : 125,
                  unidad: p.nombreUnidadMedida || "kg",
                };
              }
              return {
                nombre: p.nombreConsumible,
                gramosPorPersona: p.cantidadPorPersona ? parseFloat(p.cantidadPorPersona) : 100,
                unidad: p.nombreUnidadMedida || "Unidad",
              };
            })
        );

        // Verduras
        setVerdurasProductos(
          consumibles
            .filter((item) => item.nombreCategoria === "Verduras")
            .map((v) => ({
              nombre: v.nombreConsumible,
              gramosPorPersona: v.cantidadPorPersona ? parseFloat(v.cantidadPorPersona) : 120,
              unidad: v.nombreUnidadMedida || "kg",
            }))
        );

        // Olores y otros
        setOloresProductos(
          consumibles
            .filter((item) => item.nombreCategoria === "Olores y otros")
            .map((o) => {
              let valor = 0;
              switch (o.nombreConsumible.toLowerCase()) {
                case "plátano": valor = 333; break;
                case "chile dulce": valor = 100; break;
                case "tomate": valor = 200; break;
                case "pepino": valor = 125; break;
                case "repollo": valor = 60; break;
                case "ajo": valor = 100; break;
                case "culantro rollo": valor = 10; break;
                case "apio": valor = 5; break;
                case "salsa lizano": valor = 20; break;
                case "vinagre": valor = 20; break;
                case "orégano": valor = 10; break;
                case "pimienta": valor = 2; break;
                case "comino": valor = 2; break;
                case "salsa de tomate": valor = 20; break;
                case "mayonesa": valor = 20; break;
                case "sal": valor = 166.7; break;
                case "mantequilla": valor = 10; break;
                case "achiote": valor = 100; break;
                case "consomé": valor = 10; break;
              }
              return {
                nombre: o.nombreConsumible,
                gramosPorPersona: o.cantidadPorPersona ? parseFloat(o.cantidadPorPersona) : valor,
                unidad: o.nombreUnidadMedida || "Unidad",
              };
            })
        );

        // Abarrotes
        setAbarrotesProductos(
          consumibles
            .filter((item) => item.nombreCategoria === "Abarrotes")
            .map((a) => {
              let valor = 0;
              switch (a.nombreConsumible.toLowerCase()) {
                case "arroz grano entero": valor = 266; break;
                case "frijoles": valor = 106; break;
                case "azúcar": valor = 53; break;
                case "aceite de soya": valor = 33; break;
                case "café": valor = 21.3; break;
                case "té en bolsas": valor = 0.21; break;
                case "atún en trozos": valor = 21.3; break;
                case "avena en polvo": valor = 26.6; break;
                case "refresco": valor = 1000; break;
                case "leche en polvo": valor = 52; break;
                case "agua dulce en polvo": valor = 53; break;
                case "pan cuadrado": valor = 2; break;
                case "tortillas": valor = 2; break;
                case "pasta de tomate": valor = 33.3; break;
              }
              return {
                nombre: a.nombreConsumible,
                gramosPorPersona: a.cantidadPorPersona ? parseFloat(a.cantidadPorPersona) : valor,
                unidad: a.nombreUnidadMedida || "Unidad",
              };
            })
        );

        // Productos de Limpieza
        setLimpiezaProductos(
          consumibles
            .filter((item) => item.nombreCategoria?.toLowerCase().includes("limpieza"))
            .map((l) => {
              let valor = 0;
              switch (l.nombreConsumible.toLowerCase()) {
                case "papel higiénico rollo": valor = 0.5; break;
                case "pasta dental": valor = 0.5; break;
                case "jabón de baño": valor = 0.33; break;
                case "cloro": valor = 0.01; break;
                case "jabón lavaplatos": valor = 0.02; break;
                case "bolsas plásticas": valor = 2; break;
              }
              return {
                nombre: l.nombreConsumible,
                unidadesPorPersona: l.unidadesPorPersona ? parseFloat(l.unidadesPorPersona) : valor,
                unidad: l.nombreUnidadMedida || "Unidad",
              };
            })
        );

      } catch (error) {
        console.error("Error cargando productos:", error);
        showCustomToast("Error", "No se pudieron cargar los productos desde el servidor.");
      }
    }
    fetchProductos();
  }, []);

  const toggleSeccion = (nombre) => {
    setSeccionAbierta((prev) => (prev === nombre ? "" : nombre));
  };

  const handleOpenResumenParcial = () => setOpenResumenParcial(true);
  const handleCloseResumenParcial = () => setOpenResumenParcial(false);
  const handleOpenResumenFinal = () => setOpenResumenFinal(true);
  const handleCloseResumenFinal = () => setOpenResumenFinal(false);

  const agregarProducto = (categoria, producto, cantidadCalculada) => {
    const cantidad = parseFloat(cantidadCalculada);
    if (items.some((i) => i.seccion === categoria && i.tipo === producto.nombre)) {
      showCustomToast("Advertencia", `Producto "${producto.nombre}" ya agregado.`);
      return false;
    }
    if (!cantidad || cantidad <= 0) {
      showCustomToast("Error", "Debe definir la cantidad de personas en el menú principal.");
      return false;
    }
    agregarItem({
      tipoComida: categoria,
      seccion: categoria,
      tipo: producto.nombre,
      unidad: producto.unidad || "Unidad",
      cantidad,
      cantidadPersonas: personas,
    });
    return true;
  };

  const handleAgregarCarne = () => {
    if (!tipoCarne || personas <= 0) {
      showCustomToast("Error", "Seleccione carne y defina cantidad de personas.");
      return;
    }
    const carnesAgregadas = items.filter((i) => i.seccion === "Carnes");
    if (carnesAgregadas.length >= 2) {
      showCustomToast("Advertencia", "Solo 2 tipos de carne permitidos.");
      return;
    }
    if (carnesAgregadas.some((i) => i.tipo === tipoCarne)) {
      showCustomToast("Advertencia", "Esta carne ya fue agregada.");
      return;
    }
    const producto = carnesProductos.find((p) => p.nombre === tipoCarne);
    if (!producto) return;

    const cantidadKg = (producto.gramosPorPersona * personas) / 1000;
    if (agregarProducto("Carnes", producto, cantidadKg)) {
      setTipoCarne("");
    }
  };

  const handleAgregarProteina = () => {
    if (!tipoProteina || personas <= 0) {
      showCustomToast("Error", "Seleccione proteína y defina cantidad de personas.");
      return;
    }
    const proteinasAgregadas = items.filter((i) => i.seccion === "Proteina");
    if (proteinasAgregadas.length >= 1) {
      showCustomToast("Advertencia", "Solo una proteína permitida.");
      return;
    }
    if (proteinasAgregadas.some((i) => i.tipo === tipoProteina)) {
      showCustomToast("Advertencia", "Proteína ya agregada.");
      return;
    }
    const producto = proteinaProductos.find((p) => p.nombre === tipoProteina);
    if (!producto) return;

    let cantidad;
    if (producto.unidadesPorPersona !== undefined) {
      cantidad = producto.unidadesPorPersona * personas;
    } else {
      cantidad = (producto.gramosPorPersona * personas) / 1000;
    }

    if (agregarProducto("Proteina", producto, cantidad)) {
      setTipoProteina("");
    }
  };

  const handleAgregarVerdura = () => {
    if (!tipoVerdura || personas <= 0) {
      showCustomToast("Error", "Seleccione verdura y defina cantidad de personas.");
      return;
    }
    const verdurasAgregadas = items.filter((i) => i.seccion === "Verduras");
    const tiposUnicos = [...new Set(verdurasAgregadas.map((i) => i.tipo))];
    if (tiposUnicos.length >= 2) {
      showCustomToast("Advertencia", "Solo 2 tipos de verdura permitidos.");
      return;
    }
    if (tiposUnicos.includes(tipoVerdura)) {
      showCustomToast("Advertencia", "Verdura ya agregada.");
      return;
    }
    const producto = verdurasProductos.find((p) => p.nombre === tipoVerdura);
    if (!producto) return;

    const cantidadKg = (producto.gramosPorPersona * personas) / 1000;
    if (agregarProducto("Verduras", producto, cantidadKg)) {
      setTipoVerdura("");
    }
  };

  const handleToggleProducto = (categoria, producto) => {
    const yaAgregado = items.find((i) => i.seccion === categoria && i.tipo === producto.nombre);
    if (yaAgregado) {
      eliminarItem(yaAgregado);
    } else {
      const cantidad = calcularCantidad(producto);
      if (!cantidad || cantidad <= 0) {
        showCustomToast("Error", "Debe definir la cantidad de personas en el menú principal.");
        return;
      }
      agregarItem({
        tipoComida: categoria,
        seccion: categoria,
        tipo: producto.nombre,
        unidad: producto.unidad || "Unidad",
        cantidad,
        cantidadPersonas: personas,
      });
    }
  };

  const calcularCantidad = (producto) => {
    if (!personas || personas <= 0) return 0;
    if (producto.factor !== undefined) return (producto.factor * personas).toFixed(2);
    if (producto.gramosPorPersona !== undefined) return ((producto.gramosPorPersona * personas) / 1000).toFixed(2);
    if (producto.mililitrosPorPersona !== undefined) return ((producto.mililitrosPorPersona * personas) / 1000).toFixed(2);
    if (producto.paquetesPorPersona !== undefined) return producto.paquetesPorPersona * personas;
    if (producto.rebanadasPorPersona !== undefined) return personas * producto.rebanadasPorPersona;
    if (producto.unidadesPorPersona !== undefined) return personas * producto.unidadesPorPersona;
    if (producto.conversion !== undefined) return Math.ceil(personas / producto.conversion);
    return 1;
  };

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
    resetFormulario: limpiarItems,
  };
};
