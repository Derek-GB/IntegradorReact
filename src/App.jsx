import React from 'react';// asegúrate de que esta ruta sea correcta desde App.jsx

import { Routes, Route, useLocation } from 'react-router-dom';
import CustomDrawer from './CustomDrawer.jsx';

//Familia
import FormularioRegistro from './views/familia/formularioRegistro.jsx';
import FamiliaFormulario from './views/familia/familiaFormulario.jsx';
import BusquedaFamilia from './views/familia/BusquedaFamilia.jsx';

//Producto
import AsignacionRecursos from './views/producto/asignacionRecursos.jsx';
import ListaProducto from './views/producto/listaProducto.jsx';
import RegistrarConsumible from './views/producto/registrarConsumibles.jsx';
import RegistroSuministros from './views/producto/registrarSuministro.jsx';

//Usuario
import Login from './views/usuario/login.jsx';
import RecuperarContrasena from './views/usuario/recuperarContrasena.jsx';
import RegistroUsuario from './views/usuario/registroUsuario.jsx';

//Albergue

import ActualizarAlbergue from './views/albergue/actualizarAlbergue.jsx';
import BusquedaAlbergue from './views/albergue/busquedaAlbergue.jsx';
import ListaAlbergue from './views/albergue/listaAlbergue.jsx';
import RegistroAlbergue from './views/albergue/registroAlbergue.jsx';

//abastecimiento
import MenuPrincipal from './views/abastecimiento/abarrotesMenuPrincipal';
import ResumenFinal from './views/abastecimiento/resumenFinal';
import FormularioAbastecimiento from './views/abastecimiento/formularioAbarrotes';


//Solos
import AjusteInventario from "./views/ajusteInventario.jsx";
import AyudaForm from './views/ayudaForm.jsx';
import Inicio from './views/inicio.jsx';
import RegistroAmenazas from './views/registroAmenazas.jsx';
import RegistroMascotas from "./views/registroMascota.jsx";

//No categorizado
import FormularioIntegrantes from "./components/formularioIntegrantes.jsx";

// Importa el proveedor de contexto aquí
import { AbastecimientoProvider } from './context/contextoAbastecimiento';

const App = () => {
  const location = useLocation();
  const isLogin = 
    location.pathname === '/' || 
    location.pathname === '/recuperarContrasena';

  // Simple función de logout (puedes mejorarla)
  const handleLogout = () => {
    // Aquí puedes limpiar el contexto, tokens, etc.
    window.location.href = '/';
  };

  const [drawerOpen] = React.useState(false);
  const drawerWidth = drawerOpen ? 270 : 64;

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/recuperarContrasena" element={<RecuperarContrasena />} />
        </Routes>
      ) : (

          <div className="">
            <CustomDrawer onLogout={handleLogout}>
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  width: "100%",
                  overflow: "auto",
                  transition: "margin-left 0.3s",
                  marginLeft: window.innerWidth >= 768 ? drawerWidth : 0
                }}
              >
                <div
                  style={{
                    maxWidth: "1200px",
                    width: "100%",
                    background: "#fff",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                  }}
                >
                  <Routes>
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/preFormulario.jsx" element={<FormularioRegistro />} />
                    <Route path="/registroSuministros.jsx" element={<RegistroSuministros />} />
                    <Route path="/asignacionRecursos.jsx" element={<AsignacionRecursos />} />
                    <Route path="/busquedaAlbergue.jsx" element={<BusquedaAlbergue />} />
                    <Route path="/ayudaForm.jsx" element={<AyudaForm />} />
                    <Route path="/registrarConsumibles.jsx" element={<RegistrarConsumible />} />
                    <Route path="/registroAlbergue.jsx" element={<RegistroAlbergue />} />
                    <Route path="/registroUsuario.jsx" element={<RegistroUsuario />} />
                    <Route path="/listaProducto.jsx" element={<ListaProducto />} />
                    <Route path="/listaAlbergue.jsx" element={<ListaAlbergue />} />
                    <Route path="/abarrotesMenuPrincipal" element={<MenuPrincipal />} />
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
            </CustomDrawer>
          </div>
      )}
    </>
  );
};

export default App;
