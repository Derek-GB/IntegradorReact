import { Link } from 'react-router-dom'

const Sidebar = () => {
  const links = [
    { href: "/inicio.jsx", icon: "home", label: "Inicio" },
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
    { href: "/formularioAbarrotes.jsx", icon: "local_shipping", label: "Abastecimiento" },
    { href: "/ajusteInventario.jsx", icon: "warehouse", label: "Ajuste de inventario" }
    
  ];

  return (
    <aside id="sidebar" className="sidebar">
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