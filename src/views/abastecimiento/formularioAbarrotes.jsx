import { Modal, Box, Button } from '@mui/material';
import ResumenParcial from './resumenParcial.jsx';
import ResumenFinal from './resumenFinal.jsx';
import { useFormularioAbarrotes } from '../../hooks/abastecimineto/useFormularioAbarrotes.js';

const FormularioAbastecimiento = () => {
  const {
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
  } = useFormularioAbarrotes();

  return (
    <div>
      {/* Sección Carnes */}
      <div style={{border: '1px solid #ccc', marginBottom: '10px'}}>
        <div
          onClick={() => toggleSeccion('Carnes')}
          className="cursor-pointer font-bold py-2 px-4 select-none bg-teal-700 text-white border-b-2 border-teal-800"
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
            <button
              type="button"
              onClick={handleAgregarCarne}
              className="mt-4 w-full bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
            >
              Agregar
            </button>
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
                        <button onClick={() => eliminarItem(idx)} className="bg-yellow-500 p-2">
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
          className="cursor-pointer font-bold py-2 px-4 select-none bg-teal-700 text-white border-b-2 border-teal-800"
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
            <button
              type="button"
              onClick={handleAgregarProteina}
              className="mt-4 w-full bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
            >
              Agregar
            </button>
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
                        <button onClick={() => eliminarItem(idx)} className="bg-yellow-500 p-2">
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
          className="cursor-pointer font-bold py-2 px-4 select-none bg-teal-700 text-white border-b-2 border-teal-800"
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
            <button
              type="button"
              onClick={handleAgregarVerdura}
              className="mt-4 w-full bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
            >
              Agregar
            </button>
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
                        <button onClick={() => eliminarItem(idx)} className="bg-yellow-500 p-2">
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
              className="cursor-pointer font-bold py-2 px-4 select-none bg-teal-700 text-white border-b-2 border-teal-800"
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
                            <button onClick={() => eliminarItem(index)} className="bg-yellow-500 p-2">
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
    {/* Botones para abrir modales resumen*/}
    <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenResumenParcial}>
        Ver Resumen Parcial
      </button>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenResumenFinal}>
        Ver Resumen Final
      </button>
    </div>
    {/* Modal Resumen Parcial */}
    <Modal open={openResumenParcial} onClose={handleCloseResumenParcial}>
      <Box sx={modalStyle}>
        {/* Pasamos función para abrir resumen final desde resumen parcial, si quieres */}
        <ResumenParcial onVerResumenFinal={() => {
          handleCloseResumenParcial();
          handleOpenResumenFinal();
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