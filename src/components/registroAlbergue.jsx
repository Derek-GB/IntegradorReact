import React, { useEffect, useState } from 'react';

import axios from 'axios';

const RegistroAlbergue = () => {
  const [form, setForm] = useState({});
  const [cantones, setCantones] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [capacidades, setCapacidades] = useState([]);
  const [infraestructuras, setInfraestructuras] = useState([]);
  const [municipalidades, setMunicipalidades] = useState([]);

  const cantonesPorProvincia = {
    "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro"],
    "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
    "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
    "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
    "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
    "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"],
    "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
  };

  const llenarSelect = async (url, setter) => {
    try {
      const res = await axios.get(url);
      const datos = Array.isArray(res.data) ? res.data : res.data.data || [];
      setter(datos);
    } catch (err) {
      console.error('Error cargando datos:', err);
    }
  };

  useEffect(() => {
    llenarSelect('https://apiintegrador-production-8ef8.up.railway.app/api/Ubicaciones/all', setUbicaciones);
    llenarSelect('https://apiintegrador-production-8ef8.up.railway.app/api/capacidadAlbergues/all', setCapacidades);
    llenarSelect('https://apiintegrador-production-8ef8.up.railway.app/api/infraestructuraAlbergues/all', setInfraestructuras);
    llenarSelect('https://apiintegrador-production-8ef8.up.railway.app/api/municipalidad/all', setMunicipalidades);
  }, []);

  const handleProvinciaChange = (provincia) => {
    setForm(prev => ({ ...prev, provincia }));
    setCantones(cantonesPorProvincia[provincia] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      idAlbergue: form.id,
      nombre: form.nombreAlbergue,
      region: form.regionCNE,
      coordenadaX: parseFloat(form.coordenadaX),
      coordenadaY: parseFloat(form.coordenadaY),
      idUbicacion: parseInt(form.idUbicacion),
      tipo_establecimiento: "defecto",
      tipo_albergue: form.tipoAlbergue,
      condicion_albergue: form.estado,
      especificacion: form.especificacion,
      detalle_condicion: form.detalle_condicion,
      administrador: form.administrador,
      telefono: form.telefono,
      idCapacidad: parseInt(form.idCapacidad),
      seccion: form.seccion,
      requerimientos_tecnicos: form.requerimientos_tecnicos,
      costo_requerimientos_tecnicos: parseFloat(form.costo_requerimientos_tecnicos),
      idInfraestructura: parseInt(form.idInfraestructura),
      idMunicipalidad: parseInt(form.idMunicipalidad),
      color: "verde"
    };

    axios.post("https://apiintegrador-production-8ef8.up.railway.app/api/albergues", payload)
      .then(() => {
        alert("Albergue registrado correctamente");
        setForm({});
      })
      .catch(err => {
        console.error("Error al registrar:", err);
        alert("Error al registrar albergue.");
      });
  };

  return (
    <div className="container main-content">
      <h2>Registro de Albergue</h2>
      <form onSubmit={handleSubmit}>
        <details open>
          <summary><strong>Información del Albergue</strong></summary>
          <fieldset className="mt-2">
            <label>ID:</label>
            <input name="id" type="number" value={form.id || ''} onChange={handleChange} required />

            <label>Especificación:</label>
            <input name="especificacion" type="text" value={form.especificacion || ''} onChange={handleChange} required />

            <label>Detalle de Condición:</label>
            <input name="detalle_condicion" type="text" value={form.detalle_condicion || ''} onChange={handleChange} required />

            <label>Sección:</label>
            <input name="seccion" type="text" value={form.seccion || ''} onChange={handleChange} required />

            <label>Requerimientos Técnicos:</label>
            <textarea name="requerimientos_tecnicos" value={form.requerimientos_tecnicos || ''} onChange={handleChange} required />

            <label>Coordenada X:</label>
            <input name="coordenadaX" type="number" step="any" value={form.coordenadaX || ''} onChange={handleChange} required />

            <label>Coordenada Y:</label>
            <input name="coordenadaY" type="number" step="any" value={form.coordenadaY || ''} onChange={handleChange} required />

            <label>Nombre del Albergue:</label>
            <input name="nombreAlbergue" type="text" value={form.nombreAlbergue || ''} onChange={handleChange} required />

            <label>Región CNE:</label>
            <select name="regionCNE" value={form.regionCNE || ''} onChange={handleChange} required>
              <option value="">Seleccione una región</option>
              {["Región Central", "Región Chorotega", "Región Brunca", "Región Huetar Caribe", "Región Huetar Norte", "Región Pacífico Central"].map(r => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <label>Provincia:</label>
            <select name="provincia" value={form.provincia || ''} onChange={e => handleProvinciaChange(e.target.value)} required>
              <option value="">Seleccione una provincia</option>
              {Object.keys(cantonesPorProvincia).map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <label>Cantón:</label>
            <select name="canton" value={form.canton || ''} onChange={handleChange} required>
              <option value="">Seleccione un cantón</option>
              {cantones.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <label>Distrito:</label>
            <input name="distrito" type="text" value={form.distrito || ''} onChange={handleChange} required />

            <label>Dirección:</label>
            <textarea name="direccion" value={form.direccion || ''} onChange={handleChange} required />

            <label>Capacidad Total:</label>
            <input name="capacidad" type="number" min="0" value={form.capacidad || ''} onChange={handleChange} required />

            <label>Costo Requerimientos Técnicos:</label>
            <input name="costo_requerimientos_tecnicos" type="number" step="any" value={form.costo_requerimientos_tecnicos || ''} onChange={handleChange} required />

                    <label>Estado del Albergue:</label>
        <select name="estado" value={form.estado || ''} onChange={handleChange} required>
          <option value="">Seleccione el estado</option>
          <option>Abierto</option>
          <option>Cerrado</option>
        </select>

        <label>Tipo de Albergue:</label>
        <select name="tipoAlbergue" value={form.tipoAlbergue || ''} onChange={handleChange} required>
          <option value="">Seleccione el tipo de albergue</option>
          <option>Centro Educativo</option>
          <option>Salón Comunal</option>
          <option>Iglesia</option>
          <option>Redondel</option>
          <option>Gimnasio</option>
          <option>Casa de Acogida</option>
          <option>Zona de Refugio Temporal</option>
        </select>

        <label>Tipo de Establecimiento:</label>
        <select name="tipoEstablecimiento" value={form.tipoEstablecimiento || ''} onChange={handleChange}>
          <option value="">Seleccione el tipo de establecimiento</option>
        </select>

        <label>Ubicación:</label>
        <select name="idUbicacion" value={form.idUbicacion || ''} onChange={handleChange} required>
          <option value="">Seleccione una ubicación</option>
          {ubicaciones.map(u => (
            <option key={u.id} value={u.id}>
              {`${u.provincia} / ${u.canton} / ${u.distrito} / ${u.ubicacion}`}
            </option>
          ))}
        </select>

        <label>Capacidad:</label>
        <select name="idCapacidad" value={form.idCapacidad || ''} onChange={handleChange} required>
          <option value="">Seleccione una capacidad</option>
          {capacidades.map(c => (
            <option key={c.id} value={c.id}>
              {`ID ${c.id} - Personas: ${c.capacidadPersonas}, Colectiva: ${c.capacidadColectiva}, Familias: ${c.cantidadFamilias}`}
            </option>
          ))}
        </select>

        <label>Infraestructura:</label>
        <select name="idInfraestructura" value={form.idInfraestructura || ''} onChange={handleChange} required>
          <option value="">Seleccione una infraestructura</option>
          {infraestructuras.map(i => (
            <option key={i.id} value={i.id}>
              {`ID ${i.id} - Cocina: ${i.cocina}, Ducha: ${i.duchas}, SS: ${i.serviciosSanitarios}, Área: ${i.areaTotalM2} m²`}
            </option>
          ))}
        </select>

        <label>Municipalidad:</label>
        <select name="idMunicipalidad" value={form.idMunicipalidad || ''} onChange={handleChange} required>
          <option value="">Seleccione una municipalidad</option>
          {municipalidades.map(m => (
            <option key={m.id} value={m.id}>
              {`ID ${m.id} - ${m.nombre}`}
            </option>
          ))}
        </select>

        <label>Administrador:</label>
        <input name="administrador" type="text" value={form.administrador || ''} onChange={handleChange} required />

        <label>Teléfono:</label>
        <input name="telefono" type="tel" value={form.telefono || ''} onChange={handleChange} required pattern="[0-9]{4}-[0-9]{4}" />

        <label>Cantidad de Familias:</label>
        <input name="cantidadFamilias" type="number" min="0" value={form.cantidadFamilias || ''} onChange={handleChange} required />

        <label>Área Total (m²):</label>
        <input name="areaTotal" type="number" min="0" value={form.areaTotal || ''} onChange={handleChange} required />
      </fieldset>
    </details>
    <button type="submit" className="btn btn-primary mt-3">Registrar</button>
  </form>
</div>
);
}

export default RegistroAlbergue;