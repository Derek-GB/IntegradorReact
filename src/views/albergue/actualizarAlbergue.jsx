import React, { useEffect, useState } from "react";
import { alberguesAPI, municipalidadAPI } from "../../helpers/api.js";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";



const cantonesPorProvincia = {
  "San José": ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vázquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés Castro"],
  "Alajuela": ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares", "Poás", "Orotina", "San Carlos", "Zarcero", "Sarchí", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
  "Cartago": ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
  "Heredia": ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores", "San Pablo", "Sarapiquí"],
  "Guanacaste": ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"],
  "Puntarenas": ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"],
  "Limón": ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
};

function mapFormToApiPayload(form) {
  return {
    idAlbergue: form.idAlbergue,
    nombreAlbergue: form.nombreAlbergue,
    especificacion: form.especificacion,
    tipoAlbergue: form.tipoAlbergue,
    tipoEstablecimiento: form.tipoEstablecimiento,
    estado: form.estado,
    regionCNE: form.regionCNE,
    provincia: form.provincia,
    canton: form.canton,
    distrito: form.distrito,
    direccion: form.direccion,
    coordenadaX: form.coordenadaX,
    coordenadaY: form.coordenadaY,
    idMunicipalidad: form.idMunicipalidad,
    capacidad: form.capacidad,
    capacidadColectiva: form.capacidadColectiva,
    ocupacion: form.ocupacion,
    egresos: form.egresos,
    sospechososSanos: form.sospechososSanos,
    cantidadFamilias: form.cantidadFamilias,
    areaTotal: form.areaTotal,
    detalle_condicion: form.detalle_condicion,
    seccion: form.seccion,
    requerimientos_tecnicos: form.requerimientos_tecnicos,
    costo_requerimientos_tecnicos: form.costo_requerimientos_tecnicos,
    cocina: form.cocina === "true" || form.cocina === true,
    duchas: form.duchas === "true" || form.duchas === true,
    serviciosSanitarios: form.serviciosSanitarios === "true" || form.serviciosSanitarios === true,
    bodega: form.bodega === "true" || form.bodega === true,
    menaje_mobiliario: form.menaje_mobiliario === "true" || form.menaje_mobiliario === true,
    tanque_agua: form.tanque_agua === "true" || form.tanque_agua === true,
    administrador: form.administrador,
    telefono: form.telefono,
    color: form.color,
  };
}

export default function ActualizarAlbergue() {
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState(null);
  const [cantones, setCantones] = useState([]);
  const [municipalidades, setMunicipalidades] = useState([]);
  const [loadingBuscar, setLoadingBuscar] = useState(false);
  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [error, setError] = useState("");

  // Cargar municipalidades al montar el componente
  useEffect(() => {
    const cargarMunicipalidades = async () => {
      try {
        const res = await municipalidadAPI.getAll();
        const lista = Array.isArray(res) ? res : res.data ?? [];
        setMunicipalidades(lista);
      } catch {
        setMunicipalidades([]);
      }
    };
    cargarMunicipalidades();
  }, []);

  // Actualizar cantones cuando cambia la provincia en el form
  useEffect(() => {
    if (form?.provincia) {
      setCantones(cantonesPorProvincia[form.provincia] || []);
      // Resetear canton si no está en la lista nueva
      if (form.canton && !cantonesPorProvincia[form.provincia].includes(form.canton)) {
        setForm(prev => ({ ...prev, canton: "" }));
      }
    } else {
      setCantones([]);
    }
  }, [form?.provincia]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Buscar albergue por ID o nombre
  const handleBuscar = async (e) => {
    e.preventDefault();
    setError("");
    setForm(null);
    setLoadingBuscar(true);

    try {
      let res = null;

      if (busqueda.trim() === "") {
        setError("Ingrese un ID o Nombre para buscar.");
        setLoadingBuscar(false);
        return;
      }

      // Buscar por ID primero
      res = await alberguesAPI.getById(busqueda.trim());

      // Si no encontró resultados por ID, buscar por nombre
      if (!res?.data || (Array.isArray(res.data) && res.data.length === 0)) {
        res = await alberguesAPI.getByNombre(busqueda.trim());
      }

      if (res?.data && res.data.length > 0) {
        const albergueData = res.data[0];

        setForm({
          idAlbergue: albergueData.idAlbergue || albergueData.IdAlbergue || "",
          nombreAlbergue: albergueData.nombreAlbergue || albergueData.Nombre || "",
          especificacion: albergueData.especificacion || "",
          tipoAlbergue: albergueData.tipoAlbergue || "",
          tipoEstablecimiento: albergueData.tipoEstablecimiento || "",
          estado: albergueData.estado || "",
          regionCNE: albergueData.regionCNE || "",
          provincia: albergueData.provincia || "",
          canton: albergueData.canton || "",
          distrito: albergueData.distrito || "",
          direccion: albergueData.direccion || "",
          coordenadaX: albergueData.coordenadaX || "",
          coordenadaY: albergueData.coordenadaY || "",
          idMunicipalidad: albergueData.idMunicipalidad || albergueData.IdMunicipalidad || "",
          capacidad: albergueData.capacidad || "",
          capacidadColectiva: albergueData.capacidadColectiva || "",
          ocupacion: albergueData.ocupacion || "",
          egresos: albergueData.egresos || "",
          sospechososSanos: albergueData.sospechososSanos || "",
          cantidadFamilias: albergueData.cantidadFamilias || "",
          areaTotal: albergueData.areaTotal || "",
          detalle_condicion: albergueData.detalle_condicion || "",
          seccion: albergueData.seccion || "",
          requerimientos_tecnicos: albergueData.requerimientos_tecnicos || "",
          costo_requerimientos_tecnicos: albergueData.costo_requerimientos_tecnicos || "",
          cocina: albergueData.cocina !== undefined ? String(albergueData.cocina) : "false",
          duchas: albergueData.duchas !== undefined ? String(albergueData.duchas) : "false",
          serviciosSanitarios: albergueData.serviciosSanitarios !== undefined ? String(albergueData.serviciosSanitarios) : "false",
          bodega: albergueData.bodega !== undefined ? String(albergueData.bodega) : "false",
          menaje_mobiliario: albergueData.menaje_mobiliario !== undefined ? String(albergueData.menaje_mobiliario) : "false",
          tanque_agua: albergueData.tanque_agua !== undefined ? String(albergueData.tanque_agua) : "false",
          administrador: albergueData.administrador || albergueData.Administrador || "",
          telefono: albergueData.telefono || albergueData.Telefono || "",
          color: albergueData.color || albergueData.Color || "",
        });
      } else {
        showCustomToast("Aviso", "No se encontró el albergue.", "warning");
      }
    } catch (error) {
      showCustomToast("Error", "Error al buscar el albergue.", "error");
      console.error(error);
    } finally {
      setLoadingBuscar(false);
    }
  };

  // Guardar cambios albergue
  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!form) {
      showCustomToast("Error", "No hay datos para guardar.", "error");
      return;
    }

    const camposRequeridos = [
      "idAlbergue",
      "nombreAlbergue",
      "especificacion",
      "tipoAlbergue",
      "tipoEstablecimiento",
      "estado",
      "regionCNE",
      "provincia",
      "canton",
      "distrito",
      "direccion",
      "coordenadaX",
      "coordenadaY",
      "idMunicipalidad",
      "capacidad",
      "capacidadColectiva",
      "ocupacion",
      "egresos",
      "sospechososSanos",
      "cantidadFamilias",
      "areaTotal",
      "detalle_condicion",
      "seccion",
      "requerimientos_tecnicos",
      "costo_requerimientos_tecnicos",
      "cocina",
      "duchas",
      "serviciosSanitarios",
      "bodega",
      "menaje_mobiliario",
      "tanque_agua",
      "administrador",
      "telefono",
      "color",
    ];

    const faltantes = camposRequeridos.filter(
      (c) => form[c] === undefined || form[c] === "" || form[c] === null
    );

    if (faltantes.length > 0) {
      showCustomToast(
        "Error",
        `Completa todos los campos. Faltan: ${faltantes.join(", ")}`,
        "error"
      );
      return;
    }

    setLoadingGuardar(true);

    try {
      const payload = mapFormToApiPayload(form);
      await alberguesAPI.update(form.idAlbergue, payload);
      showCustomToast("Éxito", "Albergue actualizado correctamente.", "success");
      setForm(null);
      setBusqueda("");
      setCantones([]);
    } catch (error) {
      showCustomToast("Error", "Error al actualizar el albergue.", "error");
      console.error(error);
    } finally {
      setLoadingGuardar(false);
    }
  };

  // Opciones para selects
  const tipoAlbergueOpts = [
    "Centro Educativo",
    "Salón Comunal",
    "Iglesia",
    "Redondel",
    "Gimnasio",
    "Casa de Acogida",
    "Zona de Refugio Temporal",
  ].map((nombre) => ({ nombre }));

  const tipoEstablecimientoOpts = ["Albergue temporal o de emergencia"].map((nombre) => ({
    nombre,
  }));

  const estadoOpts = ["Abierto", "Cerrado"].map((nombre) => ({ nombre }));

  const regionCNEOpts = [
    "Región Central",
    "Región Chorotega",
    "Región Brunca",
    "Región Huetar Caribe",
    "Región Huetar Norte",
    "Región Pacífico Central",
  ].map((nombre) => ({ nombre }));

  const provinciaOpts = Object.keys(cantonesPorProvincia).map((nombre) => ({ nombre }));

  const cocinaOpts = [
    { nombre: "Sí", value: "true" },
    { nombre: "No", value: "false" },
  ];

  return (
    <>
      {!form && (
        <FormContainer title="Buscar Albergue para Actualizar" onSubmit={handleBuscar} size="md">
          <div className="flex gap-6">
            <InputField
              label="ID o Nombre del Albergue"
              name="busqueda"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej: ALB001 o Nombre del albergue"
            />
            <div className="flex items-end">
              <SubmitButton width="w-full" loading={loadingBuscar} color="text-black">
                Buscar
              </SubmitButton>
            </div>
          </div>
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </FormContainer>
      )}

      {form && (
        <FormContainer title={`Editar Albergue: ${form.nombreAlbergue}`} onSubmit={handleGuardar} size="lg">
          {/* Identificación */}
          <fieldset>
            <legend className="font-bold text-lg mb-4 text-[#00897B]">Identificación del Albergue</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField label="ID Albergue" name="idAlbergue" value={form.idAlbergue} disabled />
              <InputField label="Nombre del Albergue" name="nombreAlbergue" value={form.nombreAlbergue} onChange={handleChange} />
              <InputField label="Especificación" name="especificacion" value={form.especificacion} onChange={handleChange} />
              <SelectField label="Tipo de Albergue" name="tipoAlbergue" value={form.tipoAlbergue} onChange={handleChange} options={tipoAlbergueOpts} />
              <SelectField label="Tipo de Establecimiento" name="tipoEstablecimiento" value={form.tipoEstablecimiento} onChange={handleChange} options={tipoEstablecimientoOpts} />
              <SelectField label="Estado del Albergue" name="estado" value={form.estado} onChange={handleChange} options={estadoOpts} />
            </div>
          </fieldset>

          {/* Ubicación geográfica */}
          <fieldset>
            <legend className="font-bold text-lg my-4 text-[#00897B]">Ubicación Geográfica</legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <SelectField label="Región CNE" name="regionCNE" value={form.regionCNE} onChange={handleChange} options={regionCNEOpts} />
              <SelectField label="Provincia" name="provincia" value={form.provincia} onChange={handleChange} options={provinciaOpts} />
              <SelectField label="Cantón" name="canton" value={form.canton} onChange={handleChange} options={cantones.map((c) => ({ nombre: c }))} />
              <InputField label="Distrito" name="distrito" value={form.distrito} onChange={handleChange} />
              <InputField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
              <InputField label="Coordenada X" name="coordenadaX" value={form.coordenadaX} onChange={handleChange} />
              <InputField label="Coordenada Y" name="coordenadaY" value={form.coordenadaY} onChange={handleChange} />
              <SelectField
                label="Municipalidad"
                name="idMunicipalidad"
                value={form.idMunicipalidad}
                onChange={handleChange}
                options={municipalidades.map((m) => ({ id: m.id, nombre: m.nombre }))}
                optionLabel="nombre"
                optionValue="id"
              />
            </div>
          </fieldset>

          {/* Capacidad */}
          <fieldset>
            <legend className="font-bold text-lg my-4 text-[#00897B]">Capacidad</legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <InputField label="Capacidad Total de Personas" name="capacidad" value={form.capacidad} onChange={handleChange} />
              <InputField label="Capacidad Colectiva" name="capacidadColectiva" value={form.capacidadColectiva} onChange={handleChange} />
              <InputField label="Ocupación" name="ocupacion" value={form.ocupacion} onChange={handleChange} />
              <InputField label="Egresos" name="egresos" value={form.egresos} onChange={handleChange} />
              <InputField label="Sospechosos Sanos" name="sospechososSanos" value={form.sospechososSanos} onChange={handleChange} />
              <InputField label="Otros (Observaciones)" name="otros" value={form.otros} onChange={handleChange} />
              <InputField label="Familias" name="cantidadFamilias" value={form.cantidadFamilias} onChange={handleChange} />
              <InputField label="Área Total (m²)" name="areaTotal" value={form.areaTotal} onChange={handleChange} />
            </div>
          </fieldset>

          {/* Condición */}
          <fieldset>
            <legend className="font-bold text-lg my-4 text-[#00897B]">Condición</legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <InputField label="Detalle de Condición" name="detalle_condicion" value={form.detalle_condicion} onChange={handleChange} />
              <InputField label="Sección" name="seccion" value={form.seccion} onChange={handleChange} />
              <InputField label="Requerimientos Técnicos" name="requerimientos_tecnicos" value={form.requerimientos_tecnicos} onChange={handleChange} />
              <InputField label="Costo Requerimientos Técnicos" name="costo_requerimientos_tecnicos" value={form.costo_requerimientos_tecnicos} onChange={handleChange} />
              <SelectField label="Cocina" name="cocina" value={form.cocina} onChange={handleChange} options={cocinaOpts} />
              <SelectField label="Duchas" name="duchas" value={form.duchas} onChange={handleChange} options={cocinaOpts} />
              <SelectField label="Servicios Sanitarios" name="serviciosSanitarios" value={form.serviciosSanitarios} onChange={handleChange} options={cocinaOpts} />
              <SelectField label="Bodega" name="bodega" value={form.bodega} onChange={handleChange} options={cocinaOpts} />
              <SelectField label="Menaje y Mobiliario" name="menaje_mobiliario" value={form.menaje_mobiliario} onChange={handleChange} options={cocinaOpts} />
              <SelectField label="Tanque de Agua" name="tanque_agua" value={form.tanque_agua} onChange={handleChange} options={cocinaOpts} />
            </div>
          </fieldset>

          {/* Administrador */}
          <fieldset>
            <legend className="font-bold text-lg my-4 text-[#00897B]">Administrador</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Nombre Administrador" name="administrador" value={form.administrador} onChange={handleChange} />
              <InputField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
            </div>
          </fieldset>

          {/* Color */}
          <fieldset>
            <legend className="font-bold text-lg my-4 text-[#00897B]">Color</legend>
            <InputField label="Color" name="color" value={form.color} onChange={handleChange} />
          </fieldset>

          <div className="flex gap-4 justify-end mt-6">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm(null);
                setBusqueda("");
                setError("");
                setCantones([]);
              }}
            >
              Cancelar
            </button>
            <SubmitButton loading={loadingGuardar} color="btn-primary">
              Guardar Cambios
            </SubmitButton>
          </div>
        </FormContainer>
      )}
    </>
  );
}
