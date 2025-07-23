import React from 'react';// asegúrate de que esta ruta sea correcta desde App.jsx
import './styles/formularioFusionado.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import Login from './components/login.jsx';

import Inicio from './views/inicio.jsx';
import PreFormulario from './views/preFormulario.jsx';
import RegistroSuministros from './views/registrarSuministro.jsx';
import AsignacionRecursos from './views/asignacionRecursos.jsx';
import BusquedaAlbergue from './views/busquedaAlbergue.jsx';
import AyudaForm from './views/ayudaForm.jsx';
import RegistrarConsumible from './views/registrarConsumibles.jsx';
import RegistroAlbergue from './views/registroAlbergue.jsx';
import RegistroUsuario from './views/registroUsuario.jsx';
import ListaProducto from './views/listaProducto.jsx';
import ListaAlbergue from './views/listaAlbergue.jsx';
import MenuPrincipal from './views/menuPrincipal.jsx';
import FormularioAbastecimiento from './views/formularioAbarrotes.jsx';
import AjusteInventario from "./views/ajusteInventario.jsx";
import RecuperarContrasena from './views/recuperarContrasena.jsx';
import RegistroAmenazas from './views/registroAmenazas.jsx';
import FamiliaFormulario from './views/familiaFormulario.jsx';
import FormularioIntegrantes from "./components/formularioIntegrantes.jsx";
import RegistroMascotas from "./views/registroMascota.jsx";
import BusquedaFamilia from './views/BusquedaFamilia.jsx';
import ResumenFinal from './components/resumenFinal';

import ActualizarAlbergue from './views/ActualizarAlbergue.jsx';


// Importa el proveedor de contexto aquí
import { AbastecimientoProvider } from './context/contextoAbastecimiento';

const App = () => {
  const location = useLocation();
  const isLogin = 
    location.pathname === '/' || 
    location.pathname === '/recuperarContrasena.jsx';

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recuperarContrasena.jsx" element={<RecuperarContrasena />} />
        </Routes>
      ) : (
        <AbastecimientoProvider>

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
                <Route path="/registrarConsumibles.jsx" element={<RegistrarConsumible />} /> //
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
                <Route path="/BusquedaFamilia.jsx" element={<BusquedaFamilia />} />
                <Route path="/ActualizarAlbergue.jsx" element={<ActualizarAlbergue idAlbergue={17} />} />
                <Route path="/registroAmenazas.jsx" element={<RegistroAmenazas />} />
                <Route path="/resumenFinal" element={<ResumenFinal />} />
              </Routes>
            </div>
          </div>
        </AbastecimientoProvider>
      )}

      {!isLogin && (
        <footer>
          <p>© 2025 Integrador I - Todos los derechos reservados.</p>
        </footer>
      )}
    </>
  );
};

export default App;
