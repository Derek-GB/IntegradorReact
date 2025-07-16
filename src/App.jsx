import React from 'react';
import './styles/formularioFusionado.css'; // Asegúrate de que esta ruta sea correcta

import { Routes, Route, useLocation } from 'react-router-dom';

// Componentes
import Sidebar from './components/sidebar.jsx';
import Login from './components/Login.jsx';
import Inicio from './components/Inicio.jsx';
import PreFormulario from './components/PreFormulario.jsx';
import RegistroSuministros from './components/registroSuministros.jsx';
import AsignacionRecursos from './components/AsignacionRecursos.jsx';
import BusquedaAlbergue from './components/BusquedaAlbergue.jsx';
import AyudaForm from './components/ayudaForm.jsx';
import RegistrarProducto from './components/registrarProducto.jsx';
import RegistroAlbergue from './components/RegistroAlbergue.jsx';
import RegistroUsuario from './components/registroUsuario.jsx';
import ListaProducto from './components/ListaProducto.jsx';
import ListaAlbergue from './components/ListaAlbergue.jsx';
import MenuPrincipal from './components/MenuPrincipal.jsx';
import FormularioAbastecimiento from './components/formularioAbarrotes.jsx';
import ActualizarAlbergue from './components/ActualizarAlbergue.jsx';

import AjusteInventario from './components/ajusteInventario.jsx';
import RecuperarContrasena from './components/recuperarContrasena.jsx';
import RestablecerContrasena from './components/restablecerContrasena.jsx';


const App = () => {
  const location = useLocation();

  // Ocultar sidebar si estamos en login o recuperación
  const isLogin =
    location.pathname === '/' ||
    location.pathname === '/recuperarContrasena' ||
    location.pathname === '/restablecerContrasena';

  return (
    <>
      <div className="app-container">
        {!isLogin && <Sidebar />}

        <div className="container main-content">
          <Routes>
            <Route path="/" element={<Login />} />

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
            <Route path="/menuPrincipal" element={<MenuPrincipal />} />
            <Route path="/formularioAbarrotes" element={<FormularioAbastecimiento />} />
            <Route path="/ajusteInventario" element={<AjusteInventario />} />
            <Route path="/ActualizarAlbergue" element={<ActualizarAlbergue idAlbergue={17} />} />
            <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
            <Route path="/restablecerContrasena" element={<RestablecerContrasena />} />
          </Routes>
        </div>
      
      </div>
    </>
  );
};

export default App;
