import { useEffect, useState } from 'react';
import { personasAPI, productosAPI, recursosAsignadosAPI } from '../../helpers/api';
import { showCustomToast } from '../../components/globalComponents/CustomToaster';

export const useAsignarRecurso = () => {
  const [personas, setPersonas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    idPersona: '',
    idProducto: '',
    cantidad: ''
  });

  const [busquedaPersona, setBusquedaPersona] = useState('');
  const [showSugerenciasPersona, setShowSugerenciasPersona] = useState(false);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);

  const usuarioId = localStorage.getItem("idUsuario");
  console.log('🧾 ID del usuario obtenido del localStorage:', usuarioId);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await personasAPI.getAll();
        console.log('📥 Resultado bruto de personasAPI.getAll:', data);
        const lista = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];
        setPersonas(lista);
        console.log('✅ Personas cargadas:', lista);
      } catch (error) {
        console.error('❌ Error al cargar personas:', error);
        showCustomToast('Error', 'No se pudieron cargar las personas', 'error');
      }
    };

    fetchPersonas();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!usuarioId) {
        console.warn('⚠️ No se encontró usuarioId en localStorage.');
        return;
      }
      try {
        const data = await productosAPI.getByUsuario(usuarioId);
        console.log('📥 Resultado bruto de productosAPI.getByUsuario:', data);
        const lista = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];
        setProductos(lista);
        console.log('✅ Productos cargados:', lista);
      } catch (error) {
        console.error('❌ Error al cargar productos:', error);
        showCustomToast('Error', 'No se pudieron cargar los productos', 'error');
      }
    };

    fetchProductos();
  }, [usuarioId]);

  useEffect(() => {
    if (busquedaPersona.length > 0) {
      const filtradas = personas.filter(persona =>
        persona.numeroIdentificacion?.toLowerCase().includes(busquedaPersona.toLowerCase()) ||
        persona.nombre?.toLowerCase().includes(busquedaPersona.toLowerCase()) ||
        persona.apellido?.toLowerCase().includes(busquedaPersona.toLowerCase())
      );
      setPersonasFiltradas(filtradas);
    } else {
      setPersonasFiltradas([]);
    }
  }, [busquedaPersona, personas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectPersona = (persona) => {
    setForm(prev => ({ ...prev, idPersona: persona.id || persona.ID }));
    setBusquedaPersona(
      `${persona.numeroIdentificacion} - ${persona.nombre || ''} ${persona.apellido || ''}`.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { idPersona, idProducto, cantidad } = form;

    if (!idPersona || !idProducto || !cantidad) {
      showCustomToast('Campos incompletos', 'Por favor complete todos los campos', 'error');
      setLoading(false);
      return;
    }

    const payload = {
      idPersona: parseInt(idPersona),
      idProducto: parseInt(idProducto),
      cantidadAsignada: parseInt(cantidad)
    };

    try {
      await recursosAsignadosAPI.create(payload);
      showCustomToast('¡Éxito!', 'Recurso asignado correctamente', 'success');
      setForm({ idPersona: '', idProducto: '', cantidad: '' });
      setBusquedaPersona('');
    } catch (error) {
      console.error('❌ Error al asignar recurso:', error);
      showCustomToast('Error', 'No se pudo asignar el recurso', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    personasFiltradas,
    productos,
    form,
    loading,
    busquedaPersona,
    showSugerenciasPersona,
    setShowSugerenciasPersona,
    setBusquedaPersona,
    handleChange,
    handleSelectPersona,
    handleSubmit
  };
};
