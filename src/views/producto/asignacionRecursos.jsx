import React, { useEffect, useState } from 'react';
import { personasAPI, productosAPI, recursosAsignadosAPI } from '../../helpers/api.js';
import FormContainer from '../../components/FormComponents/FormContainer.jsx';
import SelectField from '../../components/FormComponents/SelectField.jsx';
import SearchAutocompleteInput from '../../components/FormComponents/SearchAutocompleteInput.jsx';
import SubmitButton from '../../components/FormComponents/SubmitButton.jsx';
import { showCustomToast } from '../../components/globalComponents/CustomToaster.jsx';

const AsignarRecurso = () => {
  const [personas, setPersonas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    idPersona: '',
    idProducto: '',
    cantidad: ''
  });
  
  // Estados para el autocomplete de personas
  const [busquedaPersona, setBusquedaPersona] = useState('');
  const [showSugerenciasPersona, setShowSugerenciasPersona] = useState(false);
  const [personasFiltradas, setPersonasFiltradas] = useState([]);

  // Obtener personas
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await personasAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data ?? [];
        setPersonas(lista);
      } catch (error) {
        console.error('Error al cargar personas:', error);
        setPersonas([]);
        showCustomToast('Error', 'No se pudieron cargar las personas', 'error');
      }
    };
    fetchPersonas();
  }, []);

  // Obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productosAPI.getAll();
        const lista = Array.isArray(data) ? data : data.data ?? [];
        setProductos(lista);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
        showCustomToast('Error', 'No se pudieron cargar los productos', 'error');
      }
    };
    fetchProductos();
  }, []);

  // Filtrar personas para el autocomplete
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

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Manejar selección de persona desde autocomplete
  const handleSelectPersona = (persona) => {
    setForm(prev => ({ ...prev, idPersona: persona.id || persona.ID }));
    setBusquedaPersona(`${persona.numeroIdentificacion} - ${persona.nombre || ''} ${persona.apellido || ''}`.trim());
  };

  // Enviar formulario
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
      console.error('Error al asignar recurso:', error);
      showCustomToast('¡Éxito!', 'Recurso asignado correctamente', 'success');
      setForm({ idPersona: '', idProducto: '', cantidad: '' });
      setBusquedaPersona('');
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
        <FormContainer 
          title="Asignación de Recursos" 
          onSubmit={handleSubmit}
        >
          {/* Layout horizontal responsivo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Campo de Persona con Autocomplete */}
            <div className="lg:col-span-1">
              <SearchAutocompleteInput
                label="Persona (Identificación)"
                busqueda={busquedaPersona}
                setBusqueda={setBusquedaPersona}
                showSugerencias={showSugerenciasPersona}
                setShowSugerencias={setShowSugerenciasPersona}
                resultados={personasFiltradas}
                onSelect={handleSelectPersona}
                optionLabelKeys={["numeroIdentificacion", "nombre", "apellido"]}
                placeholder="Buscar por identificación o nombre..."
                disabled={loading}
              />
            </div>

            {/* Campo de Producto */}
            <div className="lg:col-span-1">
              <SelectField
                label="Producto"
                name="idProducto"
                value={form.idProducto}
                onChange={handleChange}
                options={productos.map(p => ({
                  nombre: p.nombre || `Producto ${p.id}`,
                }))}
                optionLabel="nombre"
                optionValue="nombre"
                required
                disabled={loading}
              />
            </div>

            {/* Campo de Cantidad */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-[#00897B] mb-2">
                Cantidad
              </label>
              <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                min="1"
                required
                disabled={loading}
                className="w-full p-3 border border-[#00897B] rounded-lg text-[#00897B] bg-white focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/30"
                placeholder="Ingrese la cantidad"
              />
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-center">
            <SubmitButton
              loading={loading}
              className="px-8 py-3"
              color='text-black'
            >
              {loading ? 'Asignando...' : 'Asignar Recurso'}
            </SubmitButton>
          </div>
        </FormContainer>
      
    </>
  );
};

export default AsignarRecurso;
