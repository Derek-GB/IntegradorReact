import { Link } from 'react-router-dom'
import React from 'react';
import '../styles/formularioFusionado.css'; // Asegúrate de que la ruta sea

const Sidebar = () => {
  const links = [
    { href: "/inicio", icon: "home", label: "Inicio" },
    { href: "/preFormulario.jsx", icon: "groups", label: "Registro de Familias" },
    { href: "/registroSuministros.jsx", icon: "inventory_2", label: "Registros de Suministros" },
    { href: "/asignacionRecursos.jsx", icon: "volunteer_activism", label: "Asignación de Suministros" },
    { href: "/busquedaAlbergue.jsx", icon: "hotel", label: "Consulta Albergues" },
    { href: "/ayudaForm.jsx", icon: "fact_check", label: "Revisión de Ayudas" },
    { href: "/registrarProducto.jsx", icon: "inventory", label: "Registrar un producto" },
    { href: "/registroAlbergue.jsx", icon: "business", label: "Registrar un albergue" },
    { href: "/registroUsuario.jsx", icon: "person_add", label: "Registrar un usuario" },
    { href: "/listaProducto.jsx", icon: "list", label: "Lista de Productos" },
    { href: "/listaAlbergue.jsx", icon: "list_alt", label: "Lista de Albergues" },
  { href: "/menuPrincipal", icon: "warehouse", label: "menu Principal" },
  { href: "/formularioAbarrotes.jsx", icon: "local_shipping", label: "Abastecimiento" },
  { href: "/familiaFormulario.jsx", icon: "local_shipping", label: "Familia" },
  { href: "/ajusteInventario.jsx", icon: "warehouse", label: "Ajuste de inventario" },
  { href: "/registroMascota.jsx", icon: "pets", label: "Registro de Mascotas" },
  { href: "/VistaFamilia.jsx", icon: "warehouse", label: "Consultar familias" },
  { href: "/registroAmenazas.jsx", icon: "report", label: "Registro de Amenazas" },
  { href: "/ActualizarAlbergue.jsx", icon: "report", label: "Actualizar Albergue" }
];

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.href}>
                <span className="material-icons">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


/* 
linkear {

public.index.html
head
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

}



css modificar iconos

.material-icons {
  font-size: 20px;
  vertical-align: middle;
  margin-right: 8px;
} */