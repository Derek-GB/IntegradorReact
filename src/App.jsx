import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import Sidebar from './components/Sidebar.jsx';
import PreFormulario from './components/PreFormulario.jsx';
import RegistroSuministros from './components/RegistroSuministros.jsx';
import AsignacionRecursos from './components/AsignacionRecursos.jsx';
import BusquedaAlbergue from './components/BusquedaAlbergue.jsx';
import AyudaForm from './components/AyudaForm.jsx';
import RegistrarProducto from './components/RegistrarProducto.jsx';
import RegistroAlbergue from './components/RegistroAlbergue.jsx';
import RegistroUsuario from './components/RegistroUsuario.jsx';
import ListaProducto from './components/ListaProducto.jsx';
import ListaAlbergue from './components/ListaAlbergue.jsx';
import FormularioAbastecimiento from './components/FormularioAbarrotes.jsx'; // <--- nombre correcto
import Login from './components/Login.jsx'; // Asegúrate de importar tu componente Login

import './styles/formularioFusionado.css';

const App = () => {
  return (
    <>
      <div className="app-container">
        {/* El Sidebar solo se mostrará si la ruta no es "/". */}
        <Sidebar />
        <div className="container main-content">
          <Routes>
            <Route path="/" element={<Login />} /> {/* Cambia la ruta para que muestre el Login */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/preFormulario" element={<PreFormulario />} />
            <Route path="/registroSuministros" element={<RegistroSuministros />} />
            <Route path="/asignacionRecursos" element={<AsignacionRecursos />} />
            <Route path="/busquedaAlbergue" element={<BusquedaAlbergue />} />
            <Route path="/ayudaForm" element={<AyudaForm />} />
            <Route path="/registrarProducto" element={<RegistrarProducto />} />
            <Route path="/registroAlbergue" element={<RegistroAlbergue />} />
            <Route path="/registroUsuario" element={<RegistroUsuario />} />
            <Route path="/listaProducto" element={<ListaProducto />} />
            <Route path="/listaAlbergue" element={<ListaAlbergue />} />
            <Route path="/formularioAbarrotes" element={<FormularioAbastecimiento />} />
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
