import React from 'react';
import './styles/formularioFusionado.css'; // Asegúrate de que la ruta sea correcta
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';

import Login from './components/login.jsx';
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
import FormularioAbastecimiento from './components/FormularioAbarrotes.jsx';
import AjusteInventario from "./components/ajusteInventario";// <--- nombre correcto
import RecuperarContrasena from './components/recuperarContrasena';
import RestablecerContrasena from './components/restablecerContrasena';
import FamiliaFormulario from './components/familiaFormulario.jsx';
import FormularioIntegrantes from "./components/formularioIntegrantes";



const App = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/'|| location.pathname === '/recuperarContrasena'|| location.pathname === '/restablecerContrasena';

  return (
    <>
      <div className="app-container">

        {!isLogin && <Sidebar/>}

        <div className="container main-content">
          <Routes>
            <Route path="/" element={<Login />} />
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
            <Route path="/ajusteInventario.jsx" element={<AjusteInventario />} />
            <Route path="/familiaFormulario.jsx" element={<FamiliaFormulario />} />
            <Route path="/recuperarContrasena.jsx" element={<RecuperarContrasena />} />
             <Route path="/restablecerContrasena.jsx" element={<RestablecerContrasena />} />
             <Route path="/restablecerContrasena" element={<RestablecerContrasena />} />
             <Route path="/formularioIntegrantes.jsx" element={<FormularioIntegrantes />} />
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
