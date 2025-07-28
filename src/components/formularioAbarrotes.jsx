import React, { useContext, useState } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';
import { Modal, Box, Button } from '@mui/material';
import ResumenParcial from '../views/abastecimiento/resumenParcial';
import ResumenFinal from '../views/abastecimiento/resumenFinal';

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

const FormularioAbastecimiento = () => {
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);

// MODALES
  const [openResumenParcial, setOpenResumenParcial] = useState(false);
  const [openResumenFinal, setOpenResumenFinal] = useState(false);
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

  const [tipoCarne, setTipoCarne] = useState('');
  const [tipoProteina, setTipoProteina] = useState('');
  const [tipoVerdura, setTipoVerdura] = useState('');

  // ABRIR UNA SECCION A LA VEZ
  const [seccionAbierta, setSeccionAbierta] = useState('carnes');

  const personas = parseInt(datosFormulario?.cantidad) || 0;

  const toggleSeccion = (nombre) => {
    setSeccionAbierta(prev => (prev === nombre ? '' : nombre));
  };

  // CARNES
  const handleAgregarCarne = () => {
    if (!tipoCarne || personas <= 0) {
      alert('Seleccione tipo de carne y asegúrese que la cantidad de personas está definida en el menú principal.');
      return;
    }
    const carnesAgregadas = items.filter(i => i.seccion === 'Carnes');
    if (carnesAgregadas.length >= 1) {
      alert('Solo se puede agregar un tipo de carne.');
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
      alert("Seleccione una verdura");
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

  //CHECKBOXES
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

  return (
    <div>
      {/* Sección Carnes */}
      <div style={{border: '1px solid #ccc', marginBottom: '10px'}}>
        <div
          onClick={() => toggleSeccion('Carnes')}
          style={{cursor: 'pointer', fontWeight: 'bold', padding: '10px', userSelect: 'none', backgroundColor: '#eee'}}
        >
          Carnes {seccionAbierta === 'Carnes' ? '▲' : '▼'}
        </div>
        {seccionAbierta === 'Carnes' && (
          <div style={{padding: '10px'}}>
            <p>* Se calculan automáticamente 120 gramos por persona. *</p>
            <label className='labelAbarrote' htmlFor="tipoCarne">Tipo de carne:</label>
            <select
              className='selectAbarrote'
              id="tipoCarne"
              value={tipoCarne}
              onChange={e => setTipoCarne(e.target.value)}
            >
              <option value="">Seleccione</option>
              {carnesProductos.map(p => (
                <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
              ))}
            </select>
            <button type="button" onClick={handleAgregarCarne}>Agregar</button>
            <div className="card" style={{marginTop: '10px'}}>
              <h4>Resumen Carnes</h4>
              <table>
                <thead>
                  <tr><th>Tipo</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
                </thead>
                <tbody>
                  {items.filter(i => i.seccion === 'Carnes').map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.tipo}</td>
                      <td>{item.unidad}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        <button onClick={() => eliminarItem(idx)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Sección Proteínas */}
      <div style={{border: '1px solid #ccc', marginBottom: '10px'}}>
        <div
          onClick={() => toggleSeccion('Proteínas')}
          style={{cursor: 'pointer', fontWeight: 'bold', padding: '10px', userSelect: 'none', backgroundColor: '#eee'}}
        >
          Proteínas {seccionAbierta === 'Proteínas' ? '▲' : '▼'}
        </div>
        {seccionAbierta === 'Proteínas' && (
          <div style={{padding: '10px'}}>
            <label className='labelAbarrote' htmlFor="tipoProteina">Proteína:</label>
            <select
              className='selectAbarrote'
              id="tipoProteina"
              value={tipoProteina}
              onChange={e => setTipoProteina(e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="Huevos">Huevos</option>
              <option value="Mortadela">Mortadela</option>
              <option value="Salchichón">Salchichón</option>
            </select>
            <button type="button" onClick={handleAgregarProteina}>Agregar</button>
            <div className="card" style={{marginTop: '10px'}}>
              <h4>Resumen Proteínas</h4>
              <table>
                <thead>
                  <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
                </thead>
                <tbody>
                  {items.filter(i => i.seccion === 'Proteínas').map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.tipo}</td>
                      <td>{item.unidad}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        <button onClick={() => eliminarItem(idx)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Sección Verduras */}
      <div style={{border: '1px solid #ccc', marginBottom: '10px'}}>
        <div
          onClick={() => toggleSeccion('Verduras')}
          style={{cursor: 'pointer', fontWeight: 'bold', padding: '10px', userSelect: 'none', backgroundColor: '#eee'}}
        >
          Verduras {seccionAbierta === 'Verduras' ? '▲' : '▼'}
        </div>
        {seccionAbierta === 'Verduras' && (
          <div style={{padding: '10px'}}>
            <label className='labelAbarrote' htmlFor="tipoVerdura">Verdura:</label>
            <select
              className='selectAbarrote'
              id="tipoVerdura"
              value={tipoVerdura}
              onChange={e => setTipoVerdura(e.target.value)}
            >
              <option value="">Seleccione</option>
              {verdurasProductos.map(p => (
                <option key={p.nombre} value={p.nombre}>{p.nombre}</option>
              ))}
            </select>
            <button type="button" onClick={handleAgregarVerdura}>Agregar</button>
            <div className="card" style={{marginTop: '10px'}}>
              <h4>Resumen Verduras</h4>
              <table>
                <thead>
                  <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
                </thead>
                <tbody>
                  {items.filter(i => i.seccion === 'Verduras').map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.tipo}</td>
                      <td>{item.unidad}</td>
                      <td>{item.cantidad}</td>
                      <td>
                        <button onClick={() => eliminarItem(idx)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Otras Categorías con checkboxes */}
      {Object.entries(categorias).map(([categoria, productos]) => {
        if (['Carnes', 'Proteínas', 'Verduras'].includes(categoria)) return null;
        return (
          <div key={categoria} style={{border: '1px solid #ccc', marginBottom: '10px'}}>
            <div
              onClick={() => toggleSeccion(categoria)}
              style={{cursor: 'pointer', fontWeight: 'bold', padding: '10px', userSelect: 'none', backgroundColor: '#eee'}}
            >
              {categoria} {seccionAbierta === categoria ? '▲' : '▼'}
            </div>
            {seccionAbierta === categoria && (
              <div style={{padding: '10px'}}>
                <div className="cuadro-grid">
                  {productos.map((producto) => {
                    const yaAgregado = items.some(i => i.seccion === categoria && i.tipo === producto.nombre);
                    if (yaAgregado) return null;
                    return (
                      <div key={producto.nombre} className="producto">
                        <label className="labelAbarrote">
                          <input
                            type="checkbox"
                            onChange={() => handleAgregarProducto(categoria, producto)}
                          />
                          {producto.nombre}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <div className="card" style={{marginTop: '10px'}}>
                  <h4>Resumen {categoria}</h4>
                  <table>
                    <thead>
                      <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
                    </thead>
                    <tbody>
                      {items.filter(i => i.seccion === categoria).map((item, index) => (
                        <tr key={`${item.tipo}-${index}`}>
                          <td>{item.tipo}</td>
                          <td>{item.unidad}</td>
                          <td>{item.cantidad}</td>
                          <td>
                            <button onClick={() => eliminarItem(index)}>
                              <i className="material-icons">delete</i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                 <div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    {/* Botones para abrir modales resumen, por ejemplo al inicio o al final del formulario */}
    <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
      <button className="btn-resumen" onClick={handleOpenResumenParcial}>
        Ver Resumen Parcial
      </button>
      <button className="btn-resumen-final" onClick={handleOpenResumenFinal}>
        Ver Resumen Final
      </button>
    </div>
    {/* Modal Resumen Parcial */}
    <Modal open={openResumenParcial} onClose={handleCloseResumenParcial}>
      <Box sx={modalStyle}>
        {/* Pasamos función para abrir resumen final desde resumen parcial, si quieres */}
        <ResumenParcial onVerResumenFinal={() => {
          setOpenResumenParcial(false);
          setOpenResumenFinal(true);
        }} />
        <Button onClick={handleCloseResumenParcial} variant="contained" sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
    {/* Modal Resumen Final */}
    <Modal open={openResumenFinal} onClose={handleCloseResumenFinal}>
      <Box sx={modalStyle}>
        <ResumenFinal />
        <Button onClick={handleCloseResumenFinal} variant="contained" sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  </div>
  );
};
export default FormularioAbastecimiento;
