import React, { useEffect, useState } from 'react';
import {
  alberguesAPI,
  ubicacionesAPI,
  capacidadAlberguesAPI,
  infraestructuraAlberguesAPI,
  municipalidadAPI
} from '../helpers/api';
import '../styles/registroAlbergue.css';

export default function RegistroAlbergue() {
  const idUsuario = localStorage.getItem("idUsuario");
  const [form, setForm] = useState({});
  const [cantones, setCantones] = useState([]);
const [ubicaciones, setUbicaciones] = useState([]);
  const [capacidades, setCapacidades] = useState([]);
  const [infraestructuras, setInfraestructuras] = useState([]);
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
      const [ubiRes, capRes, infraRes, muniRes] = await Promise.all([
        ubicacionesAPI.getAll(),
        capacidadAlberguesAPI.getAll(),
        infraestructuraAlberguesAPI.getAll(),
        municipalidadAPI.getAll()
      ]);

      setUbicaciones(ubiRes.data.ubicaciones || []);
      setCapacidades(capRes.data.capacidades || []);
      setInfraestructuras(infraRes.data.infraestructuras || []);
      setMunicipalidades(muniRes.data.municipalidades || []);
    } catch (error) {
      console.error('Error al cargar datos:', error.message);
    }
  };

  cargarDatos();
}, []);


  const handleProvinciaChange = (provincia) => {
    setForm(prev => ({ ...prev, provincia }));
    setCantones(cantonesPorProvincia[provincia] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposRequeridos = [
      'id', 'nombreAlbergue', 'especificacion', 'tipoAlbergue', 'tipoEstablecimiento',
      'estado', 'regionCNE', 'provincia', 'canton', 'distrito', 'direccion',
      'coordenadaX', 'coordenadaY', 'idUbicacion', 'idMunicipalidad', 'capacidad',
      'capacidadColectiva', 'ocupacion', 'egresos', 'sospechososSanos', 'cantidadFamilias',
      'areaTotal', 'idCapacidad', 'detalle_condicion', 'seccion', 'requerimientos_tecnicos',
      'costo_requerimientos_tecnicos', 'idInfraestructura', 'cocina', 'duchas',
      'serviciosSanitarios', 'bodega', 'menaje_mobiliario', 'tanque_agua', 'administrador',
      'telefono'
    ];
    const faltantes = camposRequeridos.filter(campo => !form[campo]);
    if (faltantes.length > 0) {
      setMensaje("Completa todos los campos.");
      return;
    }

    const payload = {
  idAlbergue: parseInt(form.id),
  nombre: form.nombreAlbergue,
  region: form.regionCNE,
  coordenadaX: parseFloat(form.coordenadaX),
  coordenadaY: parseFloat(form.coordenadaY),
  provincia: form.provincia,
  canton: form.canton,
  distrito: form.distrito,
  direccion: form.direccion,
  tipoEstablecimiento: form.tipoEstablecimiento || "defecto",
  tipoAlbergue: form.tipoAlbergue,
  condicionAlbergue: form.estado,
  especificacion: form.especificacion,
  detalleCondicion: form.detalle_condicion,
  administrador: form.administrador,
  telefono: form.telefono,
  seccion: form.seccion,
  requerimientosTecnicos: form.requerimientos_tecnicos,
  costoRequerimientosTecnicos: parseFloat(form.costo_requerimientos_tecnicos),
  idMunicipalidad: parseInt(form.idMunicipalidad),
  capacidadPersonas: parseInt(form.capacidad),
  capacidadColectiva: parseInt(form.capacidadColectiva),
  ocupacion: parseInt(form.ocupacion),
  egresos: parseInt(form.egresos),
  sospechososSanos: parseInt(form.sospechososSanos),
  cantidadFamilias: parseInt(form.cantidadFamilias),
  areaTotalM2: parseInt(form.areaTotal),
  cocina: form.cocina === "true",
  duchas: form.duchas === "true",
  serviciosSanitarios: form.serviciosSanitarios === "true",
  bodega: form.bodega === "true",
  menajeMobiliario: form.menaje_mobiliario === "true",
  tanqueAgua: form.tanque_agua === "true",
  otros: form.otros || "",
  color: "verde",
  idPedidoAbarrote: null,       // si no tienes estos datos, puedes enviarlos como 0 o quitarlos según API
  idUsuarioCreacion: idUsuario
};


    try {
      await alberguesAPI.create(payload);
      setMensaje("Albergue registrado correctamente");
      setForm({});
    } catch (error) {
      console.error("Error al registrar:", error.message);
      setMensaje("Error al registrar albergue.");
    }
  };

  return (
    <div className="registro-albergue-fullscreen">
      <form className="registro-albergue-form" onSubmit={handleSubmit}>
        <legend><strong>Registro de Albergue</strong></legend>
        <legend><strong>Identificación del Albergue</strong></legend>
        <label>ID:
          <input name="id" type="number" className="form-control mb-2" placeholder="ID numérico" value={form.id || ''} onChange={handleChange} required />
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
        <label>Ubicación:
          <select id="selectUbicacion" name="idUbicacion" className="form-control mb-2" value={form.idUbicacion || ''} onChange={handleChange} required>
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map(u => (
              <option key={u.id} value={u.id}>
                {`${u.provincia} / ${u.canton} / ${u.distrito} / ${u.ubicacion}`}
              </option>
            ))}
          </select>
        </label>
        <label>Municipalidad:
          <select id="selectMunicipalidad" name="idMunicipalidad" className="form-control mb-2" value={form.idMunicipalidad || ''} onChange={handleChange} required>
            <option value="">Seleccione una municipalidad</option>
            {municipalidades.map(m => (
              <option key={m.id} value={m.id}>
                {`ID ${m.id} - ${m.nombre}`}
              </option>
            ))}
          </select>
        </label>
        <hr />

        <legend><strong>Capacidad y Ocupación</strong></legend>
        <label>Capacidad Total de Personas:
          <input name="capacidad" type="number" className="form-control mb-2" min="0" placeholder="Ej: 150" value={form.capacidad || ''} onChange={handleChange} required />
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
        <label>Capacidad Detallada:
          <select id="selectCapacidad" name="idCapacidad" className="form-control mb-2" value={form.idCapacidad || ''} onChange={handleChange} required>
            <option value="">Seleccione una capacidad</option>
            {capacidades.map(c => (
              <option key={c.id} value={c.id}>
                {`ID ${c.id} - Personas: ${c.capacidadPersonas}, Colectiva: ${c.capacidadColectiva}, Familias: ${c.cantidadFamilias}`}
              </option>
            ))}
          </select>
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
        <label>Infraestructura Asociada:
          <select id="selectInfraestructura" name="idInfraestructura" className="form-control mb-2" value={form.idInfraestructura || ''} onChange={handleChange} required>
            <option value="">Seleccione una infraestructura</option>
            {infraestructuras.map(i => (
              <option key={i.id} value={i.id}>
                {`ID ${i.id} - Cocina: ${i.cocina}, Ducha: ${i.duchas}, SS: ${i.serviciosSanitarios}, Área: ${i.areaTotalM2} m²`}
              </option>
            ))}
          </select>
        </label>
        <label>Cocina:
          <select name="cocina" className="form-control mb-2" value={form.cocina || ''} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Duchas:
          <select name="duchas" className="form-control mb-2" value={form.duchas || ''} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Servicios Sanitarios:
          <select name="serviciosSanitarios" className="form-control mb-2" value={form.serviciosSanitarios || ''} onChange={handleChange} required>
            <option value="">Seleccione</option>
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
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <label>Tanque de Agua:
          <select name="tanque_agua" className="form-control mb-2" value={form.tanque_agua || ''} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <hr />

        <legend><strong>Administrador</strong></legend>
        <label>Nombre del Administrador:
          <input name="administrador" type="text" className="form-control mb-2" value={form.administrador || ''} onChange={handleChange} required />
        </label>
        <label>Teléfono:
          <input name="telefono" type="text" className="form-control mb-2" value={form.telefono || ''} onChange={handleChange} required />
        </label>
        <hr />

        <button type="submit" className="btn btn-primary">Registrar Albergue</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
