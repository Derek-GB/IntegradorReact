import React from 'react';
import './styles/formularioFusionado.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/sidebar.jsx';
import Login from './components/login.jsx';

import Inicio from './components/inicio.jsx';
import PreFormulario from './components/preFormulario.jsx';
import RegistroSuministros from './components/registroSuministros.jsx';
import AsignacionRecursos from './components/AsignacionRecursos.jsx';
import BusquedaAlbergue from './components/BusquedaAlbergue.jsx';
import AyudaForm from './components/ayudaForm.jsx';
import RegistrarProducto from './components/RegistrarProducto.jsx';
import RegistroAlbergue from './components/RegistroAlbergue.jsx';
import Inicio from './components/inicio.jsx';
import PreFormulario from './components/preFormulario.jsx';
import RegistroSuministros from './components/registroSuministros.jsx';
import AsignacionRecursos from './components/AsignacionRecursos.jsx';
import BusquedaAlbergue from './components/BusquedaAlbergue.jsx';
import AyudaForm from './components/ayudaForm.jsx';
import RegistrarProducto from './components/RegistrarProducto.jsx';
import RegistroAlbergue from './components/RegistroAlbergue.jsx';
import RegistroUsuario from './components/registroUsuario.jsx';
import ListaProducto from './components/ListaProducto.jsx';
import ListaAlbergue from './components/ListaAlbergue.jsx';
import MenuPrincipal from './components/menuPrincipal.jsx';
import FormularioAbastecimiento from './components/formularioAbarrotes.jsx';
import AjusteInventario from "./components/ajusteInventario.jsx";
import RecuperarContrasena from './components/recuperarContrasena.jsx';
import RestablecerContrasena from './components/restablecerContrasena.jsx';
import RegistroAmenazas from './components/registroAmenazas.jsx';
import FamiliaFormulario from './components/familiaFormulario.jsx';
import FormularioIntegrantes from "./components/formularioIntegrantes.jsx";
import RegistroMascotas from "./components/registroMascota.jsx";
import VistaFamilia from './components/VistaFamilia.jsx';
import ActualizarAlbergue from './components/ActualizarAlbergue.jsx';

const App = () => {
  const location = useLocation();
  const isLogin =
    location.pathname === '/' ||
    location.pathname === '/recuperarContrasena.jsx' ||
    location.pathname === '/restablecerContrasena.jsx' ||
    location.pathname === '/restablecerContrasena';

  return (
    <>

      {isLogin ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recuperarContrasena.jsx" element={<RecuperarContrasena />} />
          <Route path="/restablecerContrasena.jsx" element={<RestablecerContrasena />} />
          <Route path="/restablecerContrasena" element={<RestablecerContrasena />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Sidebar />
          <div className="container main-content">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
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
              <Route path="/menuPrincipal" element={<MenuPrincipal />} />
              <Route path="/formularioAbarrotes.jsx" element={<FormularioAbastecimiento />} />
              <Route path="/ajusteInventario.jsx" element={<AjusteInventario />} />
              <Route path="/familiaFormulario.jsx" element={<FamiliaFormulario />} />
              <Route path="/formularioIntegrantes.jsx" element={<FormularioIntegrantes />} />
              <Route path="/registroMascota.jsx" element={<RegistroMascotas />} />
              <Route path="/VistaFamilia.jsx" element={<VistaFamilia />} />
              <Route path="/ActualizarAlbergue.jsx" element={<ActualizarAlbergue idAlbergue={17} />} />
              <Route path="/registroAmenazas.jsx" element={<RegistroAmenazas />} />
            </Routes>
          </div>
        </div>
      )}

      {!isLogin && (
        <footer>
          <p>© 2025 Integrador I - Todos los derechos reservados.</p>
        </footer>
      )}

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
<Route path="/confirmacion" element={<Confirmacion />} />
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
