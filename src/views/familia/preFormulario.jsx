import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alberguesAPI, amenazasAPI } from "../../helpers/api.js";
import obtenerTodos from "../../helpers/obtenerUbicaciones.js";
import customAxios from "../../helpers/customAxios.js";
import { generarCodigoFamilia } from "../../helpers/generarCodigoFamilia";
import FormContainer from "../../components/FormComponents/FormContainer";
import SelectField from "../../components/FormComponents/SelectField";
import InputField from "../../components/FormComponents/InputField";
import SubmitButton from "../../components/FormComponents/SubmitButton";
import SearchAutocompleteInput from "../../components/FormComponents/SearchAutocompleteInput";
import { showCustomToast } from "../../components/globalComponents/CustomToaster";

const FormularioRegistro = () => {
  const [integrantes, setIntegrantes] = useState("");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [cantonSeleccionado, setCantonSeleccionado] = useState("");
  const [albergueSeleccionado, setAlbergueSeleccionado] = useState("");
  const [eventoSeleccionado, setEventoSeleccionado] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoFamilia, setCodigoFamilia] = useState("");
  const [nombreProvincia, setNombreProvincia] = useState("");
  const [nombreCanton, setNombreCanton] = useState("");
  const [nombreDistrito, setNombreDistrito] = useState("");

  const [albergues, setAlbergues] = useState([]);
  const [amenazas, setAmenazas] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  // Autocomplete states
  const [busquedaAlbergue, setBusquedaAlbergue] = useState("");
  const [showSugerenciasAlbergue, setShowSugerenciasAlbergue] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resAlbergues, resAmenazas] = await Promise.all([
          alberguesAPI.getAll(),
          amenazasAPI.getAll(),
        ]);
        setAlbergues(resAlbergues?.data || []);
        setAmenazas(resAmenazas?.data || []);
      } catch (error) {
        showCustomToast("Error", "Error al cargar datos internos", "error");
      }
    };
    cargarDatos();
  }, []);

  useEffect(() => {
    const cargarProvincias = async () => {
      const datos = await obtenerTodos("https://api-geo-cr.vercel.app/provincias");
      setProvincias(datos);
    };
    cargarProvincias();
  }, []);

  useEffect(() => {
    if (!provinciaSeleccionada) {
      setCantones([]);
      setCantonSeleccionado("");
      return;
    }
    const cargarCantones = async () => {
      const datos = await obtenerTodos(
        `https://api-geo-cr.vercel.app/provincias/${provinciaSeleccionada}/cantones`
      );
      setCantones(datos);
    };
    cargarCantones();
  }, [provinciaSeleccionada]);

  useEffect(() => {
    if (!cantonSeleccionado) {
      setDistritos([]);
      return;
    }
    const cargarDistritos = async () => {
      const datos = await obtenerTodos(
        `https://api-geo-cr.vercel.app/cantones/${cantonSeleccionado}/distritos`
      );
      setDistritos(datos);
    };
    cargarDistritos();
  }, [cantonSeleccionado]);

  useEffect(() => {
    if (nombreProvincia && nombreCanton && integrantes) {
      const numeroFamilia = 1;
      const nuevoCodigo = generarCodigoFamilia(nombreProvincia, nombreCanton, numeroFamilia);
      setCodigoFamilia(nuevoCodigo);
    }
  }, [nombreProvincia, nombreCanton, integrantes]);

  const crearFamilia = async (e) => {
    e.preventDefault();
    const idUsuario = localStorage.getItem("idUsuario");

    if (
      !albergueSeleccionado ||
      !codigoFamilia ||
      !integrantes ||
      !eventoSeleccionado ||
      !nombreProvincia ||
      !nombreCanton ||
      !nombreDistrito ||
      !direccion ||
      !idUsuario
    ) {
      showCustomToast("Campos incompletos", "Complete todos los campos obligatorios.", "error");
      return;
    }

    const datos = {
      provincia: nombreProvincia,
      canton: nombreCanton,
      distrito: nombreDistrito,
      direccion,
      codigoFamilia,
      cantidadPersonas: parseInt(integrantes),
      idAlbergue: parseInt(albergueSeleccionado),
      idAmenaza: parseInt(eventoSeleccionado),
      idUsuarioCreacion: parseInt(idUsuario),
    };

    try {
      const res = await customAxios.post("/familias", datos);
      const idFamilia = res.data.idFamilia;
      localStorage.setItem("idFamilia", idFamilia);
      showCustomToast("Éxito", "Familia registrada correctamente.", "success");
    } catch (error) {
      showCustomToast("Error", "No se pudo registrar la familia.", "error");
    }
    localStorage.setItem("cantidadIntegrantes", integrantes);
    navigate("/formularioIntegrantes.jsx");
  };

  return (
    <FormContainer title="Registro de Familia en Albergue" onSubmit={crearFamilia} size="xl">
      <div className="space-y-8">
        {/* Familia */}
        <div className="flex flex-col gap-6">
          {/* Fila 1 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <SearchAutocompleteInput
                label="Albergue"
                busqueda={busquedaAlbergue}
                setBusqueda={setBusquedaAlbergue}
                showSugerencias={showSugerenciasAlbergue}
                setShowSugerencias={setShowSugerenciasAlbergue}
                resultados={albergues}
                onSelect={(albergue) => {
                  setAlbergueSeleccionado(albergue.id);
                  setBusquedaAlbergue(albergue.nombre);
                }}
                optionLabelKeys={["nombre"]}
                placeholder="Buscar albergue..."
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Tipo de Evento"
                value={eventoSeleccionado}
                onChange={(e) => setEventoSeleccionado(e.target.value)}
                options={amenazas.map((e) => ({
                  nombre: e.evento,
                  id: e.id,
                }))}
                optionLabel="nombre"
                optionValue="id"
                required
              />
            </div>
          </div>
          {/* Fila 2 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <InputField
                label="Código de Familia"
                value={codigoFamilia}
                onChange={(e) => setCodigoFamilia(e.target.value)}
                placeholder="YYYY-PROV-CANTON-N°FAM"
                readOnly
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Integrantes"
                type="number"
                value={integrantes}
                onChange={(e) => setIntegrantes(e.target.value)}
                placeholder="Cantidad"
                required
              />
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div className="flex flex-col gap-6">
          {/* Fila 3 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <SelectField
                label="Provincia"
                value={provinciaSeleccionada}
                onChange={(e) => {
                  const id = e.target.value;
                  setProvinciaSeleccionada(id);
                  const texto = e.target.options[e.target.selectedIndex].text;
                  setNombreProvincia(texto);
                }}
                options={provincias.map((p) => ({
                  nombre: p.descripcion,
                  id: p.idProvincia,
                }))}
                optionLabel="nombre"
                optionValue="id"
                required
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Cantón"
                value={cantonSeleccionado}
                onChange={(e) => {
                  const id = e.target.value;
                  setCantonSeleccionado(id);
                  const texto = e.target.options[e.target.selectedIndex].text;
                  setNombreCanton(texto);
                }}
                options={cantones.map((c) => ({
                  nombre: c.descripcion,
                  id: c.idCanton,
                }))}
                optionLabel="nombre"
                optionValue="id"
                required
                disabled={!cantones.length}
              />
            </div>
            <div className="flex-1">
              <SelectField
                label="Distrito"
                value={nombreDistrito}
                onChange={(e) => {
                  const texto = e.target.options[e.target.selectedIndex].text;
                  setNombreDistrito(texto);
                }}
                options={distritos.map((d) => ({
                  nombre: d.descripcion,
                  id: d.idDistrito,
                }))}
                optionLabel="nombre"
                optionValue="id"
                required
                disabled={!distritos.length}
              />
            </div>
          </div>
          {/* Fila 4 */}
          <div>
            <InputField
              label="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ej: 100m norte del parque"
              required
            />
          </div>
        </div>

        <SubmitButton width="w-full">Registrar</SubmitButton>
      </div>
    </FormContainer>
  );
};

export default FormularioRegistro;