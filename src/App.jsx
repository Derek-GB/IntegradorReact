import React from 'react';
import './styles/formularioFusionado.css'; // Asegúrate de que la ruta sea correcta
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Login from './components/Login.jsx';
import Inicio from './components/Inicio.jsx';
import PreFormulario from './components/PreFormulario.jsx';
import RegistroSuministros from './components/registroSuministros.jsx';
import AsignacionRecursos from './components/AsignacionRecursos.jsx';
import BusquedaAlbergue from './components/BusquedaAlbergue.jsx';
import AyudaForm from './components/AyudaForm.jsx';
import RegistrarProducto from './components/RegistrarProducto.jsx';
import RegistroAlbergue from './components/RegistroAlbergue.jsx';
import RegistroUsuario from './components/RegistroUsuario.jsx';
import ListaProducto from './components/ListaProducto.jsx';
import ListaAlbergue from './components/ListaAlbergue.jsx';
import FormularioAbastecimiento from './components/FormularioAbarrotes.jsx';



const App = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/';

  return (
    <>
      <div className="app-container">

        {!isLogin && <Sidebar/>}

        <div className="container main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Inicio.jsx" element={<Inicio />} />
            <Route path="/PreFormulario.jsx" element={<PreFormulario />} />
            <Route path="/RegistroSuministros.jsx" element={<RegistroSuministros />} />
            <Route path="/AsignacionRecursos.jsx" element={<AsignacionRecursos />} />
            <Route path="/BusquedaAlbergue.jsx" element={<BusquedaAlbergue />} />
            <Route path="/AyudaForm.jsx" element={<AyudaForm />} />
            <Route path="/RegistrarProducto.jsx" element={<RegistrarProducto />} />
            <Route path="/RegistroAlbergue.jsx" element={<RegistroAlbergue />} />
            <Route path="/RegistroUsuario.jsx" element={<RegistroUsuario />} />
            <Route path="/ListaProducto.jsx" element={<ListaProducto />} />
            <Route path="/ListaAlbergue.jsx" element={<ListaAlbergue />} />
            <Route path="/FormularioAbarrotes.jsx" element={<FormularioAbastecimiento />} />
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
