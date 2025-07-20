import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { alberguesAPI, amenazasAPI } from "../helpers/api.js";
import obtenerTodos from "../helpers/obtenerUbicaciones.js";
import customAxios from "../helpers/customAxios.js";

import { generarCodigoFamilia } from "../helpers/generarCodigoFamilia";

import "../styles/familia.css"; // Asegúrate de que este CSS esté creado


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

  // UseEffect para el codigo de familia
  useEffect(() => {
  if (nombreProvincia && nombreCanton && integrantes) {
    const numeroFamilia = 1; // Aquí luego puedes hacer lógica para que sea incremental si quieres
    const nuevoCodigo = generarCodigoFamilia(nombreProvincia, nombreCanton, numeroFamilia);
    setCodigoFamilia(nuevoCodigo);
  }
}, [nombreProvincia, nombreCanton, integrantes]);


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
    localStorage.setItem("cantidadIntegrantes", integrantes);
    navigate("/formularioIntegrantes.jsx");
  };

  return (
    <div className="formulario-registro-fullscreen">
      <form className="formulario-registro-container">
        <h2>Registro de Familia en Albergue</h2>

        <fieldset>
          <legend>Familia</legend>

          <label>
            Albergue
            <select
              value={albergueSeleccionado}
              onChange={(e) => setAlbergueSeleccionado(e.target.value)}
            >
              <option value="">Seleccione</option>
              {albergues.map((a) => (
                <option key={a.id} value={a.id}>{a.nombre}</option>
              ))}
            </select>
          </label>

          <label>
            Código de Familia
            <input
              type="text"
              value={codigoFamilia}
              onChange={(e) => setCodigoFamilia(e.target.value)}
              placeholder="YYYY-PROV-CANTON-N°FAM"
            />
          </label>

          <label>
            Integrantes
            <input
              type="number"
              value={integrantes}
              onChange={(e) => setIntegrantes(e.target.value)}
              placeholder="Cantidad"
            />
          </label>

          <label>
            Tipo de Evento
            <select
              value={eventoSeleccionado}
              onChange={(e) => setEventoSeleccionado(e.target.value)}
            >
              <option value="">Seleccione</option>
              {amenazas.map((e) => (
                <option key={e.id} value={e.id}>{e.evento}</option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>Ubicación</legend>

          <label>
            Provincia
            <select
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
          </label>

          <label>
            Cantón
            <select
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
          </label>

          <label>
            Distrito
            <select
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
          </label>

          <label>
            Dirección
            <textarea
              placeholder="Ej: 100m norte del parque"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            ></textarea>
          </label>
        </fieldset>

        <button type="button" onClick={crearFamilia}>Registrar</button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
