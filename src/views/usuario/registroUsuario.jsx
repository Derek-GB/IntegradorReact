import React, { useEffect, useState } from 'react';
import { municipalidadAPI, usuariosAPI } from '../../helpers/api';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import InputField from '../../components/FormComponents/InputField.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import CustomToaster, { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';

const roles = [
  { nombre: "Administrador", value: "admin" },
  { nombre: "Editor", value: "editor" },
  { nombre: "Visualizador", value: "viewer" },
];

const estados = [
  { nombre: "Activo", value: "activo" },
  { nombre: "Inactivo", value: "inactivo" },
];

const RegistroUsuario = () => {
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
        showCustomToast('Error', 'Error al cargar municipalidades.', 'error');
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
      showCustomToast('Error', 'Por favor complete todos los campos.', 'error');
      return;
    }

    const payload = {
      nombreUsuario: nombre.trim(),
      correo: correo.trim(),
      contrasenaHash: contrasena.trim(),
      rol: rol.trim(),
      activo: activo === 'activo',
      idMunicipalidad: parseInt(municipalidad),
      identificacion: identificacion.trim()
    };

    try {
      await usuariosAPI.create(payload);
      showCustomToast('Éxito', 'Usuario registrado correctamente.', 'success');
      setForm({
        nombre: '', correo: '', contrasena: '',
        rol: '', activo: '', municipalidad: '', identificacion: ''
      });
    } catch (error) {
      if (error.response) {
        showCustomToast('Error', 'Error del servidor: ' + JSON.stringify(error.response.data), 'error');
      } else {
        showCustomToast('Error', 'Error al conectar con el servidor.', 'error');
      }
    }
  };

  return (
    <>
      <FormContainer
        title="Registro de Usuario"
        onSubmit={handleSubmit}
        size="md"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Nombre Completo"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="flex-1">
            <InputField
              label="Identificación"
              name="identificacion"
              value={form.identificacion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
        <div className="flex-1">
            <InputField
              label="Correo Electrónico"
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Contraseña"
              name="contrasena"
              type="password"
              value={form.contrasena}
              onChange={handleChange}
              required
            />
          </div>
          
         
         </div>
        <div className="flex flex-col md:flex-row gap-6  mt-4 ">
      
          <div className="flex-1">
            <SelectField
              label="Municipalidad"
              name="municipalidad"
              value={form.municipalidad}
              onChange={handleChange}
              options={municipalidades.map(m => ({
                nombre: m.nombre || m.Nombre || 'Sin nombre',
                value: m.id || m.ID
              }))}
              optionLabel="nombre"
              optionValue="value"
              required
            />
            
          </div>
          <div className="flex-1">
          <SelectField
              label="Rol"
              name="rol"
              value={form.rol}
              onChange={handleChange}
              options={roles}
              optionLabel="nombre"
              optionValue="value"
              required
            />
            </div>
            <div className="flex-1">
            <SelectField
              label="Estado"
              name="activo"
              value={form.activo}
              onChange={handleChange}
              options={estados}
              optionLabel="nombre"
              optionValue="value"
              required
            />
          </div>
        </div>
      
        <div className="flex justify-center mt-8">
          <SubmitButton width="w-full">
            Registrar
          </SubmitButton>
        </div>
      </FormContainer>
      <CustomToaster />
    </>
  );
};

export default RegistroUsuario;