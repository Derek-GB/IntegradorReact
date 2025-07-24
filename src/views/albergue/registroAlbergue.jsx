import React, { useEffect, useState } from 'react';
import {
  alberguesAPI,
  municipalidadAPI
} from '../../helpers/api';
import '../../styles/registroAlbergue.css';

export default function RegistroAlbergue() {
  const idUsuario = localStorage.getItem("idUsuario");
  const [form, setForm] = useState({});
  const [cantones, setCantones] = useState([]);
  const [municipalidades, setMunicipalidades] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const cantonesPorProvincia = {
    "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro"],
    "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
    "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
    "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
    "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
    "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"],
    "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const muniRes = await municipalidadAPI.getAll();
        console.log('Respuesta de municipalidadAPI.getAll():', muniRes);
        // Manejo robusto de la respuesta
        const lista = Array.isArray(muniRes) ? muniRes : muniRes.data ?? [];
        console.log('Lista de municipalidades después de procesamiento:', lista);
        setMunicipalidades(lista);
      } catch (error) {
        console.error('Error al cargar datos:', error.message);
        setMunicipalidades([]);
      }
    };

    cargarDatos();
  }, []);

  const handleProvinciaChange = (provincia) => {
    console.log('Provincia seleccionada:', provincia);
    setForm(prev => ({ ...prev, provincia, canton: '', distrito: '' }));
    const nuevosCantones = cantonesPorProvincia[provincia] || [];
    console.log('Cantones cargados para provincia:', nuevosCantones);
    setCantones(nuevosCantones);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo cambiado: ${name} = ${value}`);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposRequeridos = [
      'idAlbergue',                       // para idAlbergue (aunque es un poco inconsistente que el payload sea idAlbergue y aquí id)
      'nombreAlbergue',
      'especificacion',
      'tipoAlbergue',
      'tipoEstablecimiento',
      'estado',                   // para condicionAlbergue
      'regionCNE',                // region
      'provincia',
      'canton',
      'distrito',
      'direccion',
      'coordenadaX',
      'coordenadaY',
      'idMunicipalidad',
      'capacidad',
      'capacidadColectiva',
      'ocupacion',
      'egresos',
      'sospechososSanos',
      'cantidadFamilias',
      'areaTotal',
      'detalle_condicion',
      'seccion',
      'requerimientos_tecnicos',
      'costo_requerimientos_tecnicos',
      'cocina',
      'duchas',
      'serviciosSanitarios',
      'bodega',
      'menaje_mobiliario',
      'tanque_agua',
      'administrador',
      'telefono',
      'color',
      'otros',
      'idPedidoAbarrote',
      'idUsuarioCreacion'
    ];

    // Asegúrate que idPedidoAbarrote e idUsuarioCreacion tengan valor en form o validalos aparte
    // Por ejemplo, si idPedidoAbarrote es null y permites eso, quítalo de los requeridos

    const faltantes = camposRequeridos.filter(campo => {
      // Permitamos que idPedidoAbarrote sea null o undefined si es válido
      if (campo === 'idPedidoAbarrote') return false;
      if (campo === 'idUsuarioCreacion') return !idUsuario; // Si no hay idUsuario definido, marca como faltante
      return form[campo] === undefined || form[campo] === '';
    });

    if (faltantes.length > 0) {
      setMensaje("Completa todos los campos.");
      console.log('Campos faltantes:', faltantes);
      return;
    }

    const payload = {
      cocina: form.cocina === "true" || form.cocina === true,
      duchas: form.duchas === "true" || form.duchas === true,
      serviciosSanitarios: form.serviciosSanitarios === "true" || form.serviciosSanitarios === true,
      bodega: form.bodega === "true" || form.bodega === true,
      menajeMobiliario: form.menaje_mobiliario === "true" || form.menaje_mobiliario === true,
      tanqueAgua: form.tanque_agua === "true" || form.tanque_agua === true,

      areaTotalM2: parseFloat(form.areaTotal) || 0,
      capacidadPersonas: parseInt(form.capacidad, 10) || 0,
      capacidadColectiva: parseInt(form.capacidadColectiva, 10) || 0,
      cantidadFamilias: parseInt(form.cantidadFamilias, 10) || 0,
      ocupacion: parseInt(form.ocupacion, 10) || 0,
      egresos: parseInt(form.egresos, 10) || 0,
      sospechososSanos: parseInt(form.sospechososSanos, 10) || 0,
      otros: form.otros || "",

      provincia: form.provincia || "",
      canton: form.canton || "",
      distrito: form.distrito || "",
      direccion: form.direccion || "",

      idAlbergue: parseInt(form.idAlbergue) || 0,
      nombre: form.nombreAlbergue || "",
      region: form.regionCNE || "",
      coordenadaX: parseFloat(form.coordenadaX) || 0,
      coordenadaY: parseFloat(form.coordenadaY) || 0,
      tipoEstablecimiento: form.tipoEstablecimiento || "",
      tipoAlbergue: form.tipoAlbergue || "",
      condicionAlbergue: form.estado || "",
      especificacion: form.especificacion || "",
      detalleCondicion: form.detalle_condicion || "",
      administrador: form.administrador || "",
      telefono: form.telefono || "",
      seccion: form.seccion || "",
      requerimientosTecnicos: form.requerimientos_tecnicos || "",
      costoRequerimientosTecnicos: parseFloat(form.costo_requerimientos_tecnicos) || 0,

      idMunicipalidad: parseInt(form.idMunicipalidad, 10) || 0,
      color: form.color || "",
      idPedidoAbarrote: null,
      idUsuarioCreacion: parseInt(idUsuario, 10) || 0
    };


    console.log('Payload para envío:', payload);

    try {
      await alberguesAPI.create(payload);
      setMensaje("Albergue registrado correctamente");
      setForm({});
      setCantones([]);
    } catch (error) {
      console.error("Error al registrar:", error.message);
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        setMensaje("Error del servidor: " + JSON.stringify(error.response.data));
      } else {
        setMensaje("Error al registrar albergue.");
      }
    }

  };


  return (
    <div className="registro-albergue-fullscreen">
      <form className="registro-albergue-form" onSubmit={handleSubmit}>
        <legend><strong>Registro de Albergue</strong></legend>
        <legend><strong>Identificación del Albergue</strong></legend>
        <label>ID:
          <input name="idAlbergue" type="text" className="form-control mb-2" placeholder="ID numérico" value={form.idAlbergue || ''} onChange={handleChange} required />
        </label>
        <label>Nombre del Albergue:
          <input name="nombreAlbergue" type="text" className="form-control mb-2" placeholder="Nombre del albergue" value={form.nombreAlbergue || ''} onChange={handleChange} required />
        </label>
        <label>Especificación:
          <input name="especificacion" type="text" className="form-control mb-2" placeholder="Especificación" value={form.especificacion || ''} onChange={handleChange} required />
        </label>
        <label>Tipo de Albergue:
          <select name="tipoAlbergue" className="form-control mb-2" value={form.tipoAlbergue || ''} onChange={handleChange} required>
            <option value="">Seleccione el tipo de albergue</option>
            <option>Centro Educativo</option>
            <option>Salón Comunal</option>
            <option>Iglesia</option>
            <option>Redondel</option>
            <option>Gimnasio</option>
            <option>Casa de Acogida</option>
            <option>Zona de Refugio Temporal</option>
          </select>
        </label>
        <label>Tipo de Establecimiento:
          <select name="tipoEstablecimiento" className="form-control mb-2" value={form.tipoEstablecimiento || ''} onChange={handleChange} required>
            <option value="">Seleccione el tipo de establecimiento</option>
            <option>Albergue temporal o de emergencia</option>
          </select>
        </label>
        <label>Estado del Albergue:
          <select name="estado" className="form-control mb-2" value={form.estado || ''} onChange={handleChange} required>
            <option value="">Seleccione el estado</option>
            <option>Abierto</option>
            <option>Cerrado</option>
          </select>
        </label>
        <hr />

        <legend><strong>Ubicación Geográfica</strong></legend>
        <label>Región CNE:
          <select name="regionCNE" className="form-control mb-2" value={form.regionCNE || ''} onChange={handleChange} required>
            <option value="">Seleccione una región</option>
            <option>Región Central</option>
            <option>Región Chorotega</option>
            <option>Región Brunca</option>
            <option>Región Huetar Caribe</option>
            <option>Región Huetar Norte</option>
            <option>Región Pacífico Central</option>
          </select>
        </label>
        <label>Provincia:
          <select id="provincia" name="provincia" className="form-control mb-2" value={form.provincia || ''} onChange={e => handleProvinciaChange(e.target.value)} required>
            <option value="">Seleccione una provincia</option>
            <option value="San José">San José</option>
            <option value="Alajuela">Alajuela</option>
            <option value="Cartago">Cartago</option>
            <option value="Heredia">Heredia</option>
            <option value="Guanacaste">Guanacaste</option>
            <option value="Puntarenas">Puntarenas</option>
            <option value="Limón">Limón</option>
          </select>
        </label>
        <label>Cantón:
          <select id="canton" name="canton" className="form-control mb-2" value={form.canton || ''} onChange={handleChange} required>
            <option value="">Seleccione un cantón</option>
            {cantones.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>Distrito:
          <input name="distrito" type="text" className="form-control mb-2" placeholder="Distrito" value={form.distrito || ''} onChange={handleChange} required />
        </label>
        <label>Dirección:
          <textarea name="direccion" className="form-control mb-2" rows="3" placeholder="Dirección exacta" value={form.direccion || ''} onChange={handleChange} required />
        </label>
        <label>Coordenada X:
          <input name="coordenadaX" type="number" step="any" className="form-control mb-2" value={form.coordenadaX || ''} onChange={handleChange} required />
        </label>
        <label>Coordenada Y:
          <input name="coordenadaY" type="number" step="any" className="form-control mb-2" value={form.coordenadaY || ''} onChange={handleChange} required />
        </label>
        <label>Municipalidad:
          <select id="selectMunicipalidad" name="idMunicipalidad" className="form-control mb-2" value={form.idMunicipalidad || ''} onChange={handleChange} required>
            <option value="">Seleccione municipalidad</option>
            {municipalidades.map((m) => (
              <option key={m.id || m.ID} value={m.id || m.ID}>
                {m.nombre || m.Nombre || 'Sin nombre'}
              </option>
            ))}
          </select>
        </label>
        <hr />

        <legend><strong>Capacidad y Ocupación</strong></legend>
        <label>Capacidad Total de Personas:
          <input name="capacidad" type="number" className="form-control mb-2" min="0" value={form.capacidad || ''} onChange={handleChange} required />
        </label>
        <label>Capacidad Colectiva:
          <input name="capacidadColectiva" type="number" className="form-control mb-2" min="0" value={form.capacidadColectiva || ''} onChange={handleChange} required />
        </label>
        <label>Ocupación:
          <input name="ocupacion" type="number" className="form-control mb-2" min="0" value={form.ocupacion || ''} onChange={handleChange} required />
        </label>
        <label>Egresos:
          <input name="egresos" type="number" className="form-control mb-2" min="0" value={form.egresos || ''} onChange={handleChange} required />
        </label>
        <label>Sospechosos Sanos:
          <input name="sospechososSanos" type="number" className="form-control mb-2" min="0" value={form.sospechososSanos || ''} onChange={handleChange} required />
        </label>
        <label>Otros (observaciones):
          <input name="otros" type="text" className="form-control mb-2" value={form.otros || ''} onChange={handleChange} />
        </label>
        <label>Familias:
          <input name="cantidadFamilias" type="number" className="form-control mb-2" min="0" value={form.cantidadFamilias || ''} onChange={handleChange} required />
        </label>
        <label>Área Total (m²):
          <input name="areaTotal" type="number" className="form-control mb-2" min="0" value={form.areaTotal || ''} onChange={handleChange} required />
        </label>
        <hr />

        <legend><strong>Condición y Requerimientos Técnicos</strong></legend>
        <label>Detalle de Condición:
          <input name="detalle_condicion" type="text" className="form-control mb-2" value={form.detalle_condicion || ''} onChange={handleChange} required />
        </label>
        <label>Sección:
          <input name="seccion" type="text" className="form-control mb-2" value={form.seccion || ''} onChange={handleChange} required />
        </label>
        <label>Requerimientos Técnicos:
          <textarea name="requerimientos_tecnicos" className="form-control mb-2" rows="2" value={form.requerimientos_tecnicos || ''} onChange={handleChange} required />
        </label>
        <label>Costo Requerimientos Técnicos:
          <input name="costo_requerimientos_tecnicos" type="number" step="any" className="form-control mb-2" value={form.costo_requerimientos_tecnicos || ''} onChange={handleChange} required />
        </label>
        <hr />

        <legend><strong>Infraestructura</strong></legend>
        <label>Cocina:
          <select name="cocina" className="form-control mb-2" value={form.cocina || ''} onChange={handleChange} required>
            <option value="">¿Tiene cocina?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Duchas:
          <select name="duchas" className="form-control mb-2" value={form.duchas || ''} onChange={handleChange} required>
            <option value="">¿Tiene ducha?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Servicios Sanitarios:
          <select name="serviciosSanitarios" className="form-control mb-2" value={form.serviciosSanitarios || ''} onChange={handleChange} required>
            <option value="">Tiene servicios sanitarios?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Bodega:
          <select name="bodega" className="form-control mb-2" value={form.bodega || ''} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Menaje Mobiliario:
          <select name="menaje_mobiliario" className="form-control mb-2" value={form.menaje_mobiliario || ''} onChange={handleChange} required>
            <option value="">¿Tiene menaje?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Tanque de Agua:
          <select name="tanque_agua" className="form-control mb-2" value={form.tanque_agua || ''} onChange={handleChange} required>
            <option value="">¿Tiene tanque de agua?</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <hr />

        <legend><strong>Administrador y Contacto</strong></legend>
        <label>Administrador:
          <input name="administrador" type="text" className="form-control mb-2" value={form.administrador || ''} onChange={handleChange} required />
        </label>
        <label>Teléfono:
          <input name="telefono" type="tel" className="form-control mb-2" value={form.telefono || ''} onChange={handleChange} required />
        </label>
        <label>Color:
          <input name="color" type="text" className="form-control mb-2" value={form.color} onChange={handleChange} required />
        </label>
        <hr />

        <button type="submit" className="btn btn-primary">Registrar Albergue</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
}
