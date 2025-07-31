import React, { useEffect, useState } from 'react';
import {
  alberguesAPI,
  municipalidadAPI
} from '../../helpers/api';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster, { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';

export default function RegistroAlbergue() {
  const idUsuario = localStorage.getItem("idUsuario");
  const [form, setForm] = useState({});
  const [cantones, setCantones] = useState([]);
  const [municipalidades, setMunicipalidades] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const lista = Array.isArray(muniRes) ? muniRes : muniRes.data ?? [];
        setMunicipalidades(lista);
      } catch{
        setMunicipalidades([]);
      }
    };
    cargarDatos();
  }, []);

  const handleProvinciaChange = (provincia) => {
    setForm(prev => ({ ...prev, provincia, canton: '', distrito: '' }));
    setCantones(cantonesPorProvincia[provincia] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación básica
    const camposRequeridos = [
      'idAlbergue', 'nombreAlbergue', 'especificacion', 'tipoAlbergue', 'tipoEstablecimiento', 'estado',
      'regionCNE', 'provincia', 'canton', 'distrito', 'direccion', 'coordenadaX', 'coordenadaY',
      'idMunicipalidad', 'capacidad', 'capacidadColectiva', 'ocupacion', 'egresos', 'sospechososSanos',
      'cantidadFamilias', 'areaTotal', 'detalle_condicion', 'seccion', 'requerimientos_tecnicos',
      'costo_requerimientos_tecnicos', 'cocina', 'duchas', 'serviciosSanitarios', 'bodega',
      'menaje_mobiliario', 'tanque_agua', 'administrador', 'telefono', 'color'
    ];

    const faltantes = camposRequeridos.filter(campo => form[campo] === undefined || form[campo] === '');
    if (faltantes.length > 0) {
      showCustomToast("Error", "Completa todos los campos.", "error");
      setLoading(false);
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

    try {
      await alberguesAPI.create(payload);
      showCustomToast("Éxito", "Albergue registrado correctamente.", "success");
      setForm({});
      setCantones([]);
    } catch {
      showCustomToast("Error", "Error al registrar albergue.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Opciones para selects
  const tipoAlbergueOpts = [
    "Centro Educativo", "Salón Comunal", "Iglesia", "Redondel", "Gimnasio", "Casa de Acogida", "Zona de Refugio Temporal"
  ].map(nombre => ({ nombre }));

  const tipoEstablecimientoOpts = [
    "Albergue temporal o de emergencia"
  ].map(nombre => ({ nombre }));

  const estadoOpts = [
    "Abierto", "Cerrado"
  ].map(nombre => ({ nombre }));

  const regionCNEOpts = [
    "Región Central", "Región Chorotega", "Región Brunca", "Región Huetar Caribe", "Región Huetar Norte", "Región Pacífico Central"
  ].map(nombre => ({ nombre }));

  const provinciaOpts = Object.keys(cantonesPorProvincia).map(nombre => ({ nombre }));

  const cocinaOpts = [
    { nombre: "Sí", value: "true" },
    { nombre: "No", value: "false" }
  ];

  return (
    <>
      <FormContainer
        title="Registro de Albergue"
        onSubmit={handleSubmit}
        size="lg"
      >
        {/* Identificación */}
        <fieldset>
          <legend className="font-bold text-lg mb-4 text-[#00897B]">Identificación del Albergue</legend>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <InputField
                label="ID"
                name="idAlbergue"
                value={form.idAlbergue || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Nombre del Albergue"
                name="nombreAlbergue"
                value={form.nombreAlbergue || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Especificación"
                name="especificacion"
                value={form.especificacion || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <SelectField
                label="Tipo de Albergue"
                name="tipoAlbergue"
                value={form.tipoAlbergue || ''}
                onChange={handleChange}
                options={tipoAlbergueOpts}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Tipo de Establecimiento"
                name="tipoEstablecimiento"
                value={form.tipoEstablecimiento || ''}
                onChange={handleChange}
                options={tipoEstablecimientoOpts}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Estado del Albergue"
                name="estado"
                value={form.estado || ''}
                onChange={handleChange}
                options={estadoOpts}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Ubicación */}
        <fieldset className="mt-8">
          <legend className="font-bold text-lg mb-4 text-[#00897B]">Ubicación Geográfica</legend>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <SelectField
                label="Región CNE"
                name="regionCNE"
                value={form.regionCNE || ''}
                onChange={handleChange}
                options={regionCNEOpts}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Provincia"
                name="provincia"
                value={form.provincia || ''}
                onChange={e => handleProvinciaChange(e.target.value)}
                options={provinciaOpts}
                optionLabel="nombre"
                optionValue="nombre"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Cantón"
                name="canton"
                value={form.canton || ''}
                onChange={handleChange}
                options={cantones.map(c => ({ nombre: c }))}
                optionLabel="nombre"
                optionValue="nombre"
                required
                disabled={!cantones.length}
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Distrito"
                name="distrito"
                value={form.distrito || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <InputField
                label="Dirección"
                name="direccion"
                value={form.direccion || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Coordenada X"
                name="coordenadaX"
                type="number"
                value={form.coordenadaX || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Coordenada Y"
                name="coordenadaY"
                type="number"
                value={form.coordenadaY || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Municipalidad"
                name="idMunicipalidad"
                value={form.idMunicipalidad || ''}
                onChange={handleChange}
                options={municipalidades.map(m => ({
                  nombre: m.nombre || m.Nombre || 'Sin nombre',
                  id: m.id || m.ID
                }))}
                optionLabel="nombre"
                optionValue="id"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Capacidad y Ocupación */}
        <fieldset className="mt-8">
          <legend className="font-bold text-lg mb-4 text-[#00897B]">Capacidad y Ocupación</legend>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <InputField
                label="Capacidad Total de Personas"
                name="capacidad"
                type="number"
                min="0"
                value={form.capacidad || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Capacidad Colectiva"
                name="capacidadColectiva"
                type="number"
                min="0"
                value={form.capacidadColectiva || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Ocupación"
                name="ocupacion"
                type="number"
                min="0"
                value={form.ocupacion || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Egresos"
                name="egresos"
                type="number"
                min="0"
                value={form.egresos || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="flex-1">
              <InputField
                label="Sospechosos Sanos"
                name="sospechososSanos"
                type="number"
                min="0"
                value={form.sospechososSanos || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Otros (observaciones)"
                name="otros"
                value={form.otros || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Familias"
                name="cantidadFamilias"
                type="number"
                min="0"
                value={form.cantidadFamilias || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Área Total (m²)"
                name="areaTotal"
                type="number"
                min="0"
                value={form.areaTotal || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Condición y Requerimientos Técnicos */}
        <fieldset className="mt-8">
          <legend className="font-bold text-lg mb-4 text-[#00897B]">Condición y Requerimientos Técnicos</legend>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <InputField
                label="Detalle de Condición"
                name="detalle_condicion"
                value={form.detalle_condicion || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Sección"
                name="seccion"
                value={form.seccion || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Requerimientos Técnicos"
                name="requerimientos_tecnicos"
                value={form.requerimientos_tecnicos || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Costo Requerimientos Técnicos"
                name="costo_requerimientos_tecnicos"
                type="number"
                value={form.costo_requerimientos_tecnicos || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Infraestructura */}
        <fieldset className="mt-8">
          <legend className="font-bold text-lg mb-4 text-[#00897B]">Infraestructura</legend>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <SelectField
                label="Cocina"
                name="cocina"
                value={form.cocina || ''}
                onChange={handleChange}
                options={cocinaOpts}
                optionLabel="nombre"
                optionValue="value"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Duchas"
                name="duchas"
                value={form.duchas || ''}
                onChange={handleChange}
                options={cocinaOpts}
                optionLabel="nombre"
                optionValue="value"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Servicios Sanitarios"
                name="serviciosSanitarios"
                value={form.serviciosSanitarios || ''}
                onChange={handleChange}
                options={cocinaOpts}
                optionLabel="nombre"
                optionValue="value"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Bodega"
                name="bodega"
                value={form.bodega || ''}
                onChange={handleChange}
                options={cocinaOpts}
                optionLabel="nombre"
                optionValue="value"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Menaje Mobiliario"
                name="menaje_mobiliario"
                value={form.menaje_mobiliario || ''}
                onChange={handleChange}
                options={cocinaOpts}
                optionLabel="nombre"
                optionValue="value"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Tanque de Agua"
                name="tanque_agua"
                value={form.tanque_agua || ''}
                onChange={handleChange}
                options={cocinaOpts}
                optionLabel="nombre"
                optionValue="value"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Administrador y Contacto */}
        <fieldset className="mt-8">
          <legend className="font-bold text-lg mb-4 text-[#00897B]">Administrador y Contacto</legend>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <InputField
                label="Administrador"
                name="administrador"
                value={form.administrador || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Teléfono"
                name="telefono"
                type="tel"
                value={form.telefono || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Color"
                name="color"
                value={form.color || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-center mt-8">
          <SubmitButton width="w-full" loading={loading}>
            Registrar Albergue
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
}