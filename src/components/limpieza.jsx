import React, { useState, useContext } from 'react';
import { contextoAbastecimiento } from '../context/contextoAbastecimiento';

const productosLimpieza = [
  { nombre: "Bolsas para basura Grande", unidad: "paquete", gramosPorPersona: null, conversion: 10 }, // paquete de al menos 10 unidades (cantidad = cantidad personas / 10)
  { nombre: "Bolsas para basura medianas", unidad: "paquete", gramosPorPersona: null, conversion: 10 },
  { nombre: "Papel Higiénico", unidad: "rollo", gramosPorPersona: 1 / 1 }, // 1 rollo
  { nombre: "Pasta dental", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón en polvo", unidad: "kg", gramosPorPersona: 10 / 1000 }, // 10 gramos = 0.01 kg por persona
  { nombre: "Cloro", unidad: "litro", gramosPorPersona: 1 / 50 }, // 20 ml = 0.02 litros por persona, ajustado a 1/50 = 0.02
  { nombre: "Jabón de baño", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Guantes de Cocina (Hule)", unidad: "par", gramosPorPersona: null, conversion: 1 },
  { nombre: "Jabón lavamanos", unidad: "litro", gramosPorPersona: 10 / 1000 }, // 10 gramos ~ 0.01 litros, ajusta si tienes mejor dato
  { nombre: "Jabón Lavaplatos Caja", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desinfectante", unidad: "litro", gramosPorPersona: 1 / 50 }, // 20 ml = 0.02 litros, igual que cloro
  { nombre: "Esponja lava platos", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Fosforos", unidad: "caja", gramosPorPersona: null, conversion: 1 },
  { nombre: "Desodorante unisex", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Champú", unidad: "litro", gramosPorPersona: 10 / 1000 }, // 10 gramos ~ 0.01 litros
  { nombre: "Escoba", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Trapeador piso", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Limpiones", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Trapos o mechas", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Toallas de papel", unidad: "rollo", gramosPorPersona: 1 / 1 }, // 1 rollo por persona
  { nombre: "Bomba desatorar servicios", unidad: "unidad", gramosPorPersona: null, conversion: 1 },
  { nombre: "Toalla sanitaria", unidad: "paquete", gramosPorPersona: null, conversion: 10 }, // paquete de al menos 10 unidades
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
  const { agregarItem, eliminarItem, items, datosFormulario } = useContext(contextoAbastecimiento);
  const [selecciones, setSelecciones] = useState({});

  const personas = parseInt(datosFormulario.cantidad) || 0;

  const handleCheck = (nombre) => {
    setSelecciones(prev => ({
      ...prev,
      [nombre]: { checked: !prev[nombre]?.checked }
    }));
  };

  const agregarSeleccionados = () => {
    if (personas <= 0) {
      alert("Debe definir la cantidad de personas en el menú principal.");
      return;
    }

    Object.entries(selecciones).forEach(([nombre, { checked }]) => {
      if (checked) {
        const producto = productosLimpieza.find(p => p.nombre === nombre);
        let cantidad = 1; // default

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
      }
    });
    setSelecciones({});
  };

  return (
    <details open={abierto}>
      <summary onClick={alAbrir}><strong>Limpieza</strong></summary>
      <div className="cuadro-grid">
        {productosLimpieza.map(({ nombre }) => (
          <div key={nombre} className="producto">
            <label className='labelAbarrote'>
              <input
                className='inputAbarrote'
                type="checkbox"
                checked={selecciones[nombre]?.checked || false}
                onChange={() => handleCheck(nombre)}
              />
              {nombre}
            </label>
          </div>
        ))}
      </div>

      <button type="button" onClick={agregarSeleccionados}>Agregar</button>

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
                <td><button onClick={() => eliminarItem(index)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default Limpieza;
