import React, { useEffect } from "react";
import { useUbicaciones } from "../../hooks/useUbicaciones";
import { useBusquedaAlbergue } from "../../hooks/Albergue/useBusquedaAlbergue.js";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster, { showCustomToast } from "../../components/globalComponents/CustomToaster.jsx";

const BusquedaAlbergue = () => {
  const { provincias, cantones, distritos, setProvinciaId, setCantonId } = useUbicaciones();

  const {
    idAlbergue,
    setIdAlbergue,
    nombre,
    setNombre,
    resultados,
    error,
    provinciaSeleccionada,
    cantonSeleccionado,
    distritoSeleccionado,
    loading,
    handleSubmit,
    handleProvinciaChange,
    handleCantonChange,
    handleDistritoChange,
  } = useBusquedaAlbergue({ provincias, cantones, distritos, setProvinciaId, setCantonId });

  useEffect(() => {
    if (error) {
      showCustomToast(error, null, "error"); 
    }
  }, [error]);

  return (
    <>
      <FormContainer title="Búsqueda de Albergue" onSubmit={handleSubmit} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="ID Albergue"
              name="idAlbergue"
              value={idAlbergue}
              onChange={(e) => setIdAlbergue(e.target.value)}
              placeholder="ID Albergue"
            />
          </div>
          <div className="flex-1">
            <SelectField
              label="Provincia"
              name="provincia"
              value={provincias.find(p => p.descripcion === provinciaSeleccionada)?.idProvincia || ""}
              onChange={handleProvinciaChange}
              options={provincias.map(p => ({ nombre: p.descripcion, value: p.idProvincia }))}
              optionLabel="nombre"
              optionValue="value"
            />
          </div>
          <div className="flex-1">
            <SelectField
              label="Cantón"
              name="canton"
              value={cantones.find(c => c.descripcion === cantonSeleccionado)?.idCanton || ""}
              onChange={handleCantonChange}
              options={cantones.map(c => ({ nombre: c.descripcion, value: c.idCanton }))}
              optionLabel="nombre"
              optionValue="value"
            />
          </div>
          <div className="flex-1">
            <SelectField
              label="Distrito"
              name="distrito"
              value={distritos.find(d => d.descripcion === distritoSeleccionado)?.idDistrito || ""}
              onChange={handleDistritoChange}
              options={distritos.map(d => ({ nombre: d.descripcion, value: d.idDistrito }))}
              optionLabel="nombre"
              optionValue="value"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="flex-1">
            <InputField
              label="Nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del albergue"
            />
          </div>
          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading}>
              Buscar
            </SubmitButton>
          </div>
        </div>

        {!error && resultados.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            Ingrese un criterio y presione Buscar para ver resultados.
          </p>
        )}

        {resultados.length > 0 && (
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-[#00897B] text-white">
                <tr>
                  <th className="px-2 py-2">ID</th>
                  <th className="px-2 py-2">Nombre</th>
                  <th className="px-2 py-2">Región</th>
                  <th className="px-2 py-2">Provincia</th>
                  <th className="px-2 py-2">Cantón</th>
                  <th className="px-2 py-2">Distrito</th>
                  <th className="px-2 py-2">Dirección</th>
                  <th className="px-2 py-2">Tipo Establecimiento</th>
                  <th className="px-2 py-2">Tipo Albergue</th>
                  <th className="px-2 py-2">Condición</th>
                  <th className="px-2 py-2">Administrador</th>
                  <th className="px-2 py-2">Teléfono</th>
                  <th className="px-2 py-2">Capacidad Personas</th>
                  <th className="px-2 py-2">Capacidad Colectiva</th>
                  <th className="px-2 py-2">Cantidad Familias</th>
                  <th className="px-2 py-2">Ocupación</th>
                  <th className="px-2 py-2">Cocina</th>
                  <th className="px-2 py-2">Duchas</th>
                  <th className="px-2 py-2">Servicios Sanitarios</th>
                  <th className="px-2 py-2">Bodega</th>
                  <th className="px-2 py-2">Menaje Mobiliario</th>
                  <th className="px-2 py-2">Tanque Agua</th>
                  <th className="px-2 py-2">Área Total (m²)</th>
                  <th className="px-2 py-2">Municipalidad</th>
                  <th className="px-2 py-2">Color</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((a) => (
                  <tr key={a.IdAlbergue || a.id} className="bg-white border-b">
                    <td className="px-2 py-2">{a.IdAlbergue || a.id}</td>
                    <td className="px-2 py-2">{a.Nombre}</td>
                    <td className="px-2 py-2">{a.Region}</td>
                    <td className="px-2 py-2">{a.provincia}</td>
                    <td className="px-2 py-2">{a.canton}</td>
                    <td className="px-2 py-2">{a.distrito}</td>
                    <td className="px-2 py-2">{a.direccion}</td>
                    <td className="px-2 py-2">{a.tipoEstablecimiento}</td>
                    <td className="px-2 py-2">{a.tipoAlbergue}</td>
                    <td className="px-2 py-2">{a.condicionAlbergue}</td>
                    <td className="px-2 py-2">{a.administrador}</td>
                    <td className="px-2 py-2">{a.telefono}</td>
                    <td className="px-2 py-2">{a.capacidadPersonas}</td>
                    <td className="px-2 py-2">{a.capacidadColectiva}</td>
                    <td className="px-2 py-2">{a.cantidadFamilias}</td>
                    <td className="px-2 py-2">{a.ocupacion}</td>
                    <td className="px-2 py-2">{a.cocina ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{a.duchas ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{a.serviciosSanitarios ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{a.bodega ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{a.menajeMobiliario ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{a.tanqueAgua ? "Sí" : "No"}</td>
                    <td className="px-2 py-2">{a.areaTotalM2}</td>
                    <td className="px-2 py-2">{a.municipalidad}</td>
                    <td className="px-2 py-2" style={{ backgroundColor: a.color }}>{a.color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {error && (
          <div className="mt-6">
            <span className="block text-red-600 text-center font-semibold">{error}</span>
          </div>
        )}
      </FormContainer>
      <CustomToaster />
    </>
  );
};

export default BusquedaAlbergue;
