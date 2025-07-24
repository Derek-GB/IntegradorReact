import React, { useContext, useEffect } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const productosLimpieza = [
  { nombre: "Bolsas para basura Grande", unidad: "paquete", gramosPorPersona: null, conversion: 10 },
  { nombre: "Bolsas para basura medianas", unidad: "paquete", gramosPorPersona: null, conversion: 10 },
  { nombre: "Papel Higiénico", unidad: "rollo", gramosPorPersona: 1 },
  { nombre: "Pasta dental", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón en polvo", unidad: "kg", gramosPorPersona: 10 / 1000 },
  { nombre: "Cloro", unidad: "litro", gramosPorPersona: 1 / 50 },
  { nombre: "Jabón de baño", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Guantes de Cocina (Hule)", unidad: "par", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón lavamanos", unidad: "litro", gramosPorPersona: 10 / 1000 },
  { nombre: "Jabón Lavaplatos Caja", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desinfectante", unidad: "litro", gramosPorPersona: 1 / 50 },
  { nombre: "Esponja lava platos", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Fosforos", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desodorante unisex", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Champú", unidad: "litro", gramosPorPersona: 10 / 1000 },
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

const Limpieza = ({ abierto, alAbrir }) => {
  const { agregarItem, eliminarItem, limpiarItems, items, datosFormulario } = useContext(contextoAbastecimiento);
  const personas = parseInt(datosFormulario?.cantidad) || 0;

  useEffect(() => {
    limpiarItems();
  }, []);

  const productosAgregados = items
    .filter(i => i.seccion === 'Limpieza')
    .map(i => i.tipo);

  const handleCheck = (nombre) => {
    if (personas <= 0) {
      alert("Debe definir la cantidad de personas en el menú principal.");
      return;
    }

    if (productosAgregados.includes(nombre)) return;

    const producto = productosLimpieza.find(p => p.nombre === nombre);
    let cantidad = 1;

    if (producto.gramosPorPersona) {
      cantidad = (producto.gramosPorPersona * personas).toFixed(2);
    } else if (producto.conversion) {
      cantidad = Math.ceil(personas / producto.conversion);
    }

    agregarItem({
      seccion: 'Limpieza',
      tipo: nombre,
      unidad: producto.unidad,
      cantidad
    });
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Limpieza</strong></summary>

      <div className="cuadro-grid">
        {productosLimpieza.map(({ nombre }) => (
          !productosAgregados.includes(nombre) && (
            <div key={nombre} className="producto">
              <label className='labelAbarrote'>
                <input
                  type="checkbox"
                  onChange={() => handleCheck(nombre)}
                />
                {nombre}
              </label>
            </div>
          )
        ))}
      </div>

      <div className="card">
        <h4>Resumen Limpieza</h4>
        <table>
          <thead>
            <tr><th>Producto</th><th>Unidad</th><th>Cantidad</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {items.filter(i => i.seccion === 'Limpieza').map((item, index) => (
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

export default Limpieza;
