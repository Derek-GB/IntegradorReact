import React, { useEffect, useState } from "react";
import { alberguesAPI, municipalidadAPI } from "../../helpers/api.js";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const cantonesPorProvincia = {
  "San José": ["San José","Escazú","Desamparados","Puriscal","Tarrazú","Aserrí","Mora","Goicoechea","Santa Ana","Alajuelita","Vázquez de Coronado","Acosta","Tibás","Moravia","Montes de Oca","Turrubares","Dota","Curridabat","Pérez Zeledón","León Cortés Castro"],
  "Alajuela": ["Alajuela","San Ramón","Grecia","San Mateo","Atenas","Naranjo","Palmares","Poás","Orotina","San Carlos","Zarcero","Sarchí","Upala","Los Chiles","Guatuso","Río Cuarto"],
  "Cartago": ["Cartago","Paraíso","La Unión","Jiménez","Turrialba","Alvarado","Oreamuno","El Guarco"],
  "Heredia": ["Heredia","Barva","Santo Domingo","Santa Bárbara","San Rafael","San Isidro","Belén","Flores","San Pablo","Sarapiquí"],
  "Guanacaste": ["Liberia","Nicoya","Santa Cruz","Bagaces","Carrillo","Cañas","Abangares","Tilarán","Nandayure","La Cruz","Hojancha"],
  "Puntarenas": ["Puntarenas","Esparza","Buenos Aires","Montes de Oro","Osa","Quepos","Golfito","Coto Brus","Parrita","Corredores","Garabito"],
  "Limón": ["Limón","Pococí","Siquirres","Talamanca","Matina","Guácimo"]
};

function mapFormToApiPayload(form) {
  return {
    idAlbergue: form.idAlbergue,               
    nombre: form.nombreAlbergue,        
    especificacion: form.especificacion,
    tipoAlbergue: form.tipoAlbergue,
    tipoEstablecimiento: form.tipoEstablecimiento,
    estado: form.estado,
    region: form.regionCNE,             
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

  // Cargar municipalidades
  useEffect(() => {
    const cargarMunicipalidades = async () => {
      try {
        const res = await municipalidadAPI.getAll();
        const lista = Array.isArray(res) ? res : res.data ?? [];
        setMunicipalidades(
          lista.map((m) => ({
            id: m.IdMunicipalidad ?? m.id,
            nombre: m.Nombre ?? m.nombre
          }))
        );
      } catch {
        setMunicipalidades([]);
      }
    };
    cargarMunicipalidades();
  }, []);

  // Actualizar cantones según provincia
  useEffect(() => {
    if (form?.provincia) {
      setCantones(cantonesPorProvincia[form.provincia] || []);
      if (form.canton && !cantonesPorProvincia[form.provincia].includes(form.canton)) {
        setForm(prev => ({ ...prev, canton: "" }));
      }
    } else {
      setCantones([]);
    }
  }, [form?.provincia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    setError("");
    setForm(null);
    setLoadingBuscar(true);
    try {
      if (!busqueda.trim()) {
        setError("Ingrese un ID o Nombre para buscar.");
        setLoadingBuscar(false);
        return;
      }
      let res = await alberguesAPI.getById(busqueda.trim());
      if (!res?.data || res.data.length === 0) {
        res = await alberguesAPI.getByNombre(busqueda.trim());
      }
      if (res?.data && res.data.length > 0) {
        const a = res.data[0];
        setForm({
          idAlbergue: a.idAlbergue ?? a.IdAlbergue ?? "",
          nombre: a.nombre ?? a.Nombre ?? "",
          especificacion: a.especificacion ?? "",
          tipoAlbergue: a.tipoAlbergue ?? "",
          tipoEstablecimiento: a.tipoEstablecimiento ?? "",
          estado: a.estado ?? "",
          regionCNE: a.regionCNE ?? "",
          provincia: a.provincia ?? "",
          canton: a.canton ?? "",
          distrito: a.distrito ?? "",
          direccion: a.direccion ?? "",
          coordenadaX: a.coordenadaX ?? "",
          coordenadaY: a.coordenadaY ?? "",
          idMunicipalidad: a.idMunicipalidad ?? a.IdMunicipalidad ?? "",
          capacidad: a.capacidad ?? "",
          capacidadColectiva: a.capacidadColectiva ?? "",
          ocupacion: a.ocupacion ?? "",
          egresos: a.egresos ?? "",
          sospechososSanos: a.sospechososSanos ?? "",
          cantidadFamilias: a.cantidadFamilias ?? "",
          areaTotal: a.areaTotal ?? "",
          detalle_condicion: a.detalle_condicion ?? "",
          seccion: a.seccion ?? "",
          requerimientos_tecnicos: a.requerimientos_tecnicos ?? "",
          costo_requerimientos_tecnicos: a.costo_requerimientos_tecnicos ?? "",
          cocina: a.cocina !== undefined ? String(a.cocina) : "false",
          duchas: a.duchas !== undefined ? String(a.duchas) : "false",
          serviciosSanitarios: a.serviciosSanitarios !== undefined ? String(a.serviciosSanitarios) : "false",
          bodega: a.bodega !== undefined ? String(a.bodega) : "false",
          menaje_mobiliario: a.menaje_mobiliario !== undefined ? String(a.menaje_mobiliario) : "false",
          tanque_agua: a.tanque_agua !== undefined ? String(a.tanque_agua) : "false",
          administrador: a.administrador ?? a.Administrador ?? "",
          telefono: a.telefono ?? a.Telefono ?? "",
          color: a.color ?? a.Color ?? "",
        });
      } else {
        showCustomToast("Aviso", "No se encontró el albergue.", "warning");
      }
    } catch (err) {
      showCustomToast("Error", "Error al buscar el albergue.", "error");
      console.error(err);
    } finally {
      setLoadingBuscar(false);
    }
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!form) {
      showCustomToast("Error", "No hay datos para guardar.", "error");
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
    } catch (err) {
      showCustomToast("Error", "Error al actualizar el albergue.", "error");
      console.error(err);
    } finally {
      setLoadingGuardar(false);
    }
  };

  const tipoAlbergueOpts = ["Centro Educativo","Salón Comunal","Iglesia","Redondel","Gimnasio","Casa de Acogida","Zona de Refugio Temporal"].map(n => ({ nombre: n }));
  const tipoEstablecimientoOpts = ["Albergue temporal o de emergencia"].map(n => ({ nombre: n }));
  const estadoOpts = ["Abierto","Cerrado"].map(n => ({ nombre: n }));
  const regionCNEOpts = ["Región Central","Región Chorotega","Región Brunca","Región Huetar Caribe","Región Huetar Norte","Región Pacífico Central"].map(n => ({ nombre: n }));
  const provinciaOpts = Object.keys(cantonesPorProvincia).map(n => ({ nombre: n }));
  const siNoOpts = [{ nombre: "Sí", value: "true" }, { nombre: "No", value: "false" }];

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
              <SubmitButton width="w-full" loading={loadingBuscar} color="text-black">Buscar</SubmitButton>
            </div>
          </div>
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </FormContainer>
      )}

      {form && (
        <FormContainer title={`Editar Albergue: ${form.nombre}`} onSubmit={handleGuardar} size="lg">
          
          {/* SECCIÓN 1: Básicos */}
          <h3 className="font-bold mt-4">Básicos</h3><br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
            <InputField label="Especificación" name="especificacion" value={form.especificacion} onChange={handleChange} />
            <SelectField label="Tipo Albergue" name="tipoAlbergue" value={form.tipoAlbergue} onChange={handleChange} options={tipoAlbergueOpts} />
            <SelectField label="Tipo Establecimiento" name="tipoEstablecimiento" value={form.tipoEstablecimiento} onChange={handleChange} options={tipoEstablecimientoOpts} />
            <SelectField label="Estado" name="estado" value={form.estado} onChange={handleChange} options={estadoOpts} />
            <SelectField label="Región CNE" name="regionCNE" value={form.regionCNE} onChange={handleChange} options={regionCNEOpts} />
          </div>

          {/* SECCIÓN 2: Ubicación */}
          <h3 className="font-bold mt-4">Ubicación</h3><br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Provincia" name="provincia" value={form.provincia} onChange={handleChange} options={provinciaOpts} />
            <SelectField label="Cantón" name="canton" value={form.canton} onChange={handleChange} options={cantones.map(n => ({ nombre: n }))} />
            <InputField label="Distrito" name="distrito" value={form.distrito} onChange={handleChange} />
            <InputField label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} />
            <InputField label="Coordenada X" name="coordenadaX" value={form.coordenadaX} onChange={handleChange} />
            <InputField label="Coordenada Y" name="coordenadaY" value={form.coordenadaY} onChange={handleChange} />
            <SelectField label="Municipalidad" name="idMunicipalidad" value={form.idMunicipalidad} onChange={handleChange} options={municipalidades.map(m => ({ nombre: m.nombre, value: m.id }))} />
          </div>

          {/* SECCIÓN 3: Capacidad y Ocupación */}
          <h3 className="font-bold mt-4">Capacidad y Ocupación</h3><br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Capacidad" name="capacidad" value={form.capacidad} onChange={handleChange} />
            <InputField label="Capacidad Colectiva" name="capacidadColectiva" value={form.capacidadColectiva} onChange={handleChange} />
            <InputField label="Ocupación" name="ocupacion" value={form.ocupacion} onChange={handleChange} />
            <InputField label="Egresos" name="egresos" value={form.egresos} onChange={handleChange} />
            <InputField label="Sospechosos Sanos" name="sospechososSanos" value={form.sospechososSanos} onChange={handleChange} />
            <InputField label="Cantidad Familias" name="cantidadFamilias" value={form.cantidadFamilias} onChange={handleChange} />
            <InputField label="Área Total mt2" name="areaTotal" value={form.areaTotal} onChange={handleChange} />
          </div>

          {/* SECCIÓN 4: Infraestructura */}
          <h3 className="font-bold mt-4">Infraestructura</h3><br />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Cocina" name="cocina" value={form.cocina} onChange={handleChange} options={siNoOpts} />
            <SelectField label="Duchas" name="duchas" value={form.duchas} onChange={handleChange} options={siNoOpts} />
            <SelectField label="Servicios Sanitarios" name="serviciosSanitarios" value={form.serviciosSanitarios} onChange={handleChange} options={siNoOpts} />
            <SelectField label="Bodega" name="bodega" value={form.bodega} onChange={handleChange} options={siNoOpts} />
            <SelectField label="Menaje/Mobiliario" name="menaje_mobiliario" value={form.menaje_mobiliario} onChange={handleChange} options={siNoOpts} />
            <SelectField label="Tanque Agua" name="tanque_agua" value={form.tanque_agua} onChange={handleChange} options={siNoOpts} />
          </div>

          {/* SECCIÓN 5: Detalles y Contacto */}
          <h3 className="font-bold mt-4">Detalles y Contacto</h3><br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Detalle Condición" name="detalle_condicion" value={form.detalle_condicion} onChange={handleChange} />
            <InputField label="Sección" name="seccion" value={form.seccion} onChange={handleChange} />
            <InputField label="Requerimientos Técnicos" name="requerimientos_tecnicos" value={form.requerimientos_tecnicos} onChange={handleChange} />
            <InputField label="Costo Requerimientos Técnicos" name="costo_requerimientos_tecnicos" value={form.costo_requerimientos_tecnicos} onChange={handleChange} />
            <InputField label="Administrador" name="administrador" value={form.administrador} onChange={handleChange} />
            <InputField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} />
            <InputField label="Color" name="color" value={form.color} onChange={handleChange} />
          </div>

          {/* Botones */}
          <div className="flex gap-4 justify-end mt-6">
            <button type="button" className="btn btn-secondary"
              onClick={() => { setForm(null); setBusqueda(""); setError(""); setCantones([]); }}>Cancelar</button>
            <SubmitButton loading={loadingGuardar} color="btn-primary">Guardar Cambios</SubmitButton>
          </div>
        </FormContainer>
      )}
    </>
  );
}
