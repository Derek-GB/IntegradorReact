import React, { useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

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

const Abarrotes = ({ abierto, alAbrir }) => {
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);

  const personas = parseInt(datosFormulario?.cantidad) || 0;

  const calcularCantidad = (producto) => {
    if (!personas || personas <= 0) return 0;
    if (producto.gramosPorPersona) return ((producto.gramosPorPersona * personas) / 1000).toFixed(2);
    if (producto.mililitrosPorPersona) return ((producto.mililitrosPorPersona * personas) / 1000).toFixed(2);
    if (producto.paquetesPorPersona) return personas;
    if (producto.rebanadasPorPersona) return personas * producto.rebanadasPorPersona;
    if (producto.unidadesPorPersona) return personas * producto.unidadesPorPersona;
    return 0;
  };

 
  const yaAgregado = (nombre) => {
    return items.some(i => i.seccion === 'Abarrotes' && i.tipo === nombre);
  };

  const handleAgregar = (nombre) => {
    if (yaAgregado(nombre)) return; 
    const producto = productosAbarrotes.find(p => p.nombre === nombre);
    const cantidad = calcularCantidad(producto);

    if (cantidad > 0) {
      agregarItem({
        seccion: 'Abarrotes',
        tipo: nombre,
        unidad: producto.unidad,
        cantidad
      });
    } else {
      alert("Debe definir la cantidad de personas en el menú principal.");
    }
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Abarrotes</strong></summary>

      <div className="cuadro-grid">
        {productosAbarrotes.map(({ nombre }) => {
          
          if (yaAgregado(nombre)) return null;

          return (
            <div key={nombre} className="producto">
              <label className="labelAbarrote" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  onChange={() => handleAgregar(nombre)}
                />
                {nombre}
              </label>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h4>Resumen Abarrotes</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Abarrotes').map((item, index) => (
              <tr key={index}>
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
    </details>
  );
};

export default Abarrotes;
