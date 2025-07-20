import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/formularioFusionado.css'; // Asegúrate de que la ruta sea

const Sidebar = () => {
  const links = [
    // Enlaces principales
    { href: "/inicio", icon: "home", label: "Inicio" },
    { href: "/preFormulario.jsx", icon: "groups", label: "Registro de Familias" },
    { href: "/registroSuministros.jsx", icon: "inventory_2", label: "Registro de Suministros" },
    { href: "/asignacionRecursos.jsx", icon: "volunteer_activism", label: "Asignación de Suministros" },
    { href: "/busquedaAlbergue.jsx", icon: "hotel", label: "Consulta Albergues" },
    { href: "/ayudaForm.jsx", icon: "fact_check", label: "Revisión de Ayudas" },
    { href: "/registrarProducto.jsx", icon: "inventory", label: "Registro un producto" },
    { href: "/registroAlbergue.jsx", icon: "business", label: "Registro un albergue" },
    { href: "/registroUsuario.jsx", icon: "person_add", label: "Registro un usuario" },
    { href: "/listaProducto.jsx", icon: "list_alt", label: "Lista de Productos" },
    { href: "/listaAlbergue.jsx", icon: "list_alt", label: "Lista de Albergues" },
    { href: "/formularioAbarrotes.jsx", icon: "local_shipping", label: "Abastecimiento" },
    { href: "/familiaFormulario.jsx", icon: "local_shipping", label: "Familia" },
    { href: "/ajusteInventario.jsx", icon: "warehouse", label: "Ajuste de inventario" },
    { href: "/registroMascota.jsx", icon: "pets", label: "Registro de Mascotas" },
    { href: "/VistaFamilia.jsx", icon: "warehouse", label: "Consultar familias" }


  ];

  // Agrupar los enlaces por categorías
  const groupedLinks = [


    {
      label: "Registros",
      icon: "inventory_2",
      items: links.filter(link =>
        link.label.toLowerCase().includes("registro")
      ),
    },
    {
      label: "Listas",
      icon: "list",
      items: links.filter(link =>
        link.label.toLowerCase().includes("lista")
      ),
    },
    {
      label: "Ajustes",
      icon: "warehouse",
      items: links.filter(link =>
        link.label.toLowerCase().includes("ajuste")
      ),
    },
    {
      label: "Otros",
      icon: "trash",
      items: links.filter(link =>
        !link.label.toLowerCase().includes("inicio") &&
        !link.label.toLowerCase().includes("registro") &&
        !link.label.toLowerCase().includes("lista") &&
        !link.label.toLowerCase().includes("ajuste")
      ),
    },
  ];

  const [openGroup, setOpenGroup] = useState(null);

  const handleGroupClick = (idx) => {
    setOpenGroup(openGroup === idx ? null : idx); // Toggle: abre/cierra el grupo
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>


          <li>
            <Link to={links[0].href}> 
                <span className="material-icons">{links[0].icon}</span>
                <span className="spanTitulo">{links[0].label}</span>

            </Link>
          </li>
          {/* Grupos */}
          {groupedLinks.map((group, idx) =>
            group.items.length > 0 && group.label !== "Inicio" ? (
              <li
                key={group.label + idx}
                className={openGroup === idx ? "open" : ""}
                onClick={() => handleGroupClick(idx)}
              >
                <div className="sidebar-group-header">
                  <span className="material-icons">{group.items[0].icon}</span>
                  <span className="spanTitulo">{group.label}</span>
                  <span className="material-icons expand-icon">
                    {openGroup === idx ? "expand_less" : "expand_more"}
                  </span>
                </div>
                <ul style={{ display: openGroup === idx ? "block" : "none" }}>
                  {group.items.map((link, index) => (
                    <li key={link.href + index}>
                      <Link
                        to={link.href}
                        onClick={() => setOpenGroup(null)} // Cierra el submenú al navegar
                      >
                        <span className="material-icons">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : null
          )}
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