import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/inicio.jsx';
import Sidebar from './components/sidebar.jsx';
import PreFormulario from './components/preFormulario.jsx';
import RegistroSuministros from './components/registroSuministros.jsx';
import AsignacionRecursos from './components/asignacionRecursos.jsx';
import BusquedaAlbergue from './components/busquedaAlbergue.jsx';
import AyudaForm from './components/ayudaForm.jsx';
import RegistrarProducto from './components/registrarProducto.jsx';
import RegistroAlbergue from './components/registroAlbergue.jsx';
import RegistroUsuario from './components/registroUsuario.jsx';
import ListaProducto from './components/listaProducto.jsx';
import ListaAlbergue from './components/listaAlbergue.jsx';
import FormularioAbastecimiento from './components/formularioAbarrotes.jsx'; // <--- nombre correcto

import './styles/formularioFusionado.css';

const App = () => {
  return (
    <>
    <div className="app-container">
      <Sidebar />
      <div className="container main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio.jsx" element={<Inicio />} />
          <Route path="/preFormulario.jsx" element={<PreFormulario />} />
          <Route path="/registroSuministros.jsx" element={<RegistroSuministros />} />
          <Route path="/asignacionRecursos.jsx" element={<AsignacionRecursos />} />
          <Route path="/busquedaAlbergue.jsx" element={<BusquedaAlbergue />} />
          <Route path="/ayudaForm.jsx" element={<AyudaForm />} />
          <Route path="/registrarProducto.jsx" element={<RegistrarProducto />} />
          <Route path="/registroAlbergue.jsx" element={<RegistroAlbergue />} />
          <Route path="/registroUsuario.jsx" element={<RegistroUsuario />} />
          <Route path="/listaProducto.jsx" element={<ListaProducto />} />
          <Route path="/listaAlbergue.jsx" element={<ListaAlbergue />} />
          <Route path="/formularioAbarrotes.jsx" element={<FormularioAbastecimiento />} />
        </Routes>

         
      </div>
    </div>
    <footer>
        <p>© 2025 Integrador I - Todos los derechos reservados.</p>
      </footer>
    </>   
  );
};

export default App;