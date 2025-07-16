import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alberguesAPI, amenazasAPI } from "../helpers/api.js";
import obtenerTodos from "../helpers/obtenerUbicaciones.js";
import customAxios from "../helpers/customAxios.js";

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
        console.error("Error al cargar datos internos:", error.message);
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

  const crearFamilia = async () => {
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
      alert("Complete todos los campos obligatorios.");
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
      alert("Familia registrada correctamente.");
    } catch (error) {
      console.error("Error al crear familia:", error);
      alert("Hubo un error al crear la familia, pero puede continuar con el registro de integrantes.");
    }
    // Esto se ejecuta siempre, haya error o no:
    localStorage.setItem("cantidadIntegrantes", integrantes);
    navigate("/formularioIntegrantes.jsx");
  };

  return (

    <>
      <div className="header">
        <h2>Registro de Familia en Albergue</h2>
        <button className="btn-header">
          <span className="material-icons">arrow_back</span>
        </button>
      </div>

      <div className="formPreFormulario main-content">
        
          <fieldset id='registroFamiliaField' className=" mt-2">
            <legend className="legendFamiliaField mt-3"><strong>Familia</strong></legend>

            <div id="registroFamilia1">

              <div id="divFamilia">
                <legend className="mt-3"><strong>Albergue</strong></legend>
                <select
                  id="albergue"
                  className="form-select mb-2"
                  value={albergueSeleccionado}
                  onChange={(e) => setAlbergueSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {albergues.map((a) => (
                    <option key={a.id} value={a.id}>{a.nombre}</option>
                  ))}
                </select>
              </div>
              <div id="divFamilia">

                <legend className="mt-3"><strong>Código de Familia</strong></legend>

                <input
                  name="idFamilia"
                  id="idFamilia"
                  type="text"
                  className="form-control mb-2"
                  value={codigoFamilia}
                  onChange={(e) => setCodigoFamilia(e.target.value)}
                  placeholder="Ej: 2025-SJ-03-001"
                />
              </div>
              <div id="divFamilia">
                <legend className="mt-3"><strong>Integrantes:</strong></legend>
                <input
                  type="number"
                  id="integrantes"
                  className="form-control mb-2"
                  value={integrantes}
                  onChange={(e) => setIntegrantes(e.target.value)}
                  placeholder="Cantidad"
                />
              </div>
              <div id="divFamilia">
                <legend className="mt-3"><strong>Tipo de Evento</strong></legend>
                <select
                  id="evento"
                  className="form-control mb-2"
                  value={eventoSeleccionado}
                  onChange={(e) => setEventoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {amenazas.map((e) => (
                    <option key={e.id} value={e.id}>{e.evento}</option>
                  ))}
                </select>
              </div>


            </div>
            <fieldset id='registroFamiliaField' className=" mt-2">
              <legend className="legendFamiliaField mt-3"><strong>Ubicación</strong></legend>

              <div className="divFamiliaUbicacion">
                <div id="registroFamiliaUbicacion">

                  <div id="divFamilia">
                    <legend className="mt-3"><strong>Provincia</strong></legend>
                    <select
                      id="provincia"
                      className="form-select mb-2"
                      value={provinciaSeleccionada}
                      onChange={(e) => {
                        const id = e.target.value;
                        setProvinciaSeleccionada(id);
                        const texto = e.target.options[e.target.selectedIndex].text;
                        setNombreProvincia(texto);
                      }}
                    >
                      <option value="">Seleccione</option>
                      {provincias.map((p) => (
                        <option key={p.idProvincia} value={p.idProvincia}>{p.descripcion}</option>
                      ))}
                    </select>
                  </div>

                  <div id="divFamilia">
                    <legend className="mt-3"><strong>Canton</strong></legend>
                    <select
                      id="canton"
                      className="form-select mb-2"
                      value={cantonSeleccionado}
                      onChange={(e) => {
                        const id = e.target.value;
                        setCantonSeleccionado(id);
                        const texto = e.target.options[e.target.selectedIndex].text;
                        setNombreCanton(texto);
                      }}
                    >
                      <option value="">Seleccione</option>
                      {cantones.map((c) => (
                        <option key={c.idCanton} value={c.idCanton}>{c.descripcion}</option>
                      ))}
                    </select>
                  </div>

                  <div id="divFamilia">
                    <legend className="mt-3"><strong>Distrito</strong></legend>
                    <select
                      id="distrito"
                      className="form-select mb-2"
                      disabled={!distritos.length}
                      onChange={(e) => {
                        const texto = e.target.options[e.target.selectedIndex].text;
                        setNombreDistrito(texto);
                      }}
                    >
                      <option value="">Seleccione</option>
                      {distritos.map((d) => (
                        <option key={d.idDistrito} value={d.idDistrito}>{d.descripcion}</option>
                      ))}
                    </select>
                  </div>

                </div>
                <div className="divFamiliaDireccion">
                  <legend className="mt-3"><strong>Dirección</strong></legend>
                  <textarea
                    id="direccion"
                    className="form-control mb-2"
                    placeholder="Ej: 100m norte del parque"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  ></textarea>
                </div>

              </div>
              <button
                type="button"
                className="btn btn-success mt-3"
                onClick={crearFamilia}
              >
                Registrar
              </button>
            </fieldset>
          </fieldset>
          
      </div>



    </>


  );
};

export default FormularioRegistro;