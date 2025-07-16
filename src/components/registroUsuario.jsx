import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { municipalidadAPI, usuariosAPI } from '../helpers/api'; // Asegúrate del path correcto

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const [municipalidades, setMunicipalidades] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol: '',
    activo: '',
    municipalidad: '',
    identificacion: ''
  });


  useEffect(() => {
    const fetchMunicipalidades = async () => {
      try {
        const data = await municipalidadAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data ?? [];
        setMunicipalidades(lista || []);
      } catch (error) {
        console.error('Error al cargar municipalidades:', error);
        setMunicipalidades([]);
      }
    };
    fetchMunicipalidades();
  }, []);




  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { nombre, correo, contrasena, rol, activo, municipalidad, identificacion } = form;

    if (!nombre || !correo || !contrasena || !rol || !activo || !municipalidad || !identificacion) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const payload = {
      nombreUsuario: nombre.trim(),
      correo: correo.trim(),
      contrasenaHash: contrasena.trim(),
      rol: rol.trim(),
      activo: activo === "activo",
      idMunicipalidad: parseInt(municipalidad),
      identificacion: identificacion.trim()
    };

    try {
      await usuariosAPI.create(payload); // ✅ Usa el helper
      alert("Usuario registrado correctamente.");
      setForm({
        nombre: '', correo: '', contrasena: '',
        rol: '', activo: '', municipalidad: '', identificacion: ''
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      if (error.response) {
        alert("Error del servidor: " + JSON.stringify(error.response.data));
      } else {
        alert("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <>
      <div className="header">
        <h2>Registro Usuario</h2>
        <button className="btn-header">
          <span className="material-icons">arrow_back</span>
        </button>
      </div>

      <div className="formPreFormulario main-content" onSubmit={handleSubmit}>


        <label>Correo Electrónico:</label>
        <input name="correo" type="email" value={form.correo} onChange={handleChange} required />

        <label>Contraseña:</label>
        <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} required />



      </div>

      <div className="datoUsuario">

        <label>Correo Electrónico:</label>
        <input name="correo" value={form.correo} type="email" onChange={handleChange} required />

      </div>
    </div >
          </fieldset >

          <fieldset className="fieldsetRegistroUSuario2 mt-2">
            <div className="datosUsuario">

              <div className="datoUsuario">
                 <label>Nombre Completo:</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required />
              
                
              </div>

              <div className="datoUaurio">
                <label>Rol:</label>
                <select name="rol" value={form.rol} onChange={handleChange} required>
                  <option value="">Seleccione un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Visualizador</option>
                </select>

                
              </div>

              <div className="datoUsuario">

                
   
              <label>Contraseña:</label>
              <input name="contrasena" value={form.contrasena} type="password" onChange={handleChange} required />
         
               

                
              </div>

              

            </div>




          </fieldset>

          <fieldset className="fieldsetRegistroUSuario1 mt-2">

          <div className="datosUsuario">
            <div className="datoUsuario">
               <label>Número de Teléfono:</label>
                <input name="numero" value={form.numero} type="tel" pattern="[0-9]{4}-[0-9]{4}" onChange={handleChange} required />



                </div>
            <div className="datoUsuario">
              <label>Estado:</label>
                <select name="activo" value={form.activo} onChange={handleChange} required>
                  <option value="">Seleccione un estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
                </div>
            <div className="datoUsuario">
              <label>Confirmar Contraseña:</label>
              <input name="contrasena" value={form.contrasena} type="password" onChange={handleChange} required />
            </div>
          </div>
        </fieldset>
        </div >




  <fieldset className="mt-2">

    <div className="datosUsuario">

      <div className="datoUsuario">
        <button type="submit" className="btn btn-primary mt-3">Registrar</button>

      </div>

    </div>
  </fieldset>

      </div >

    </>

  );
};

export default RegistroUsuario;
