import React from "react";
import { useListaUsuarios } from "../../hooks/Usuario/useListaUsuarios.js";
import FormContainer from "../../components/FormComponents/FormContainer.jsx";
import InputField from "../../components/FormComponents/InputField.jsx";
import SubmitButton from "../../components/FormComponents/SubmitButton.jsx";
import CustomToaster from "../../components/globalComponents/CustomToaster.jsx";
import GlobalDataTable from "../../components/globalComponents/GlobalDataTable.jsx";
import Modal from "../../components/globalComponents/GlobalModal.jsx";
import SelectField from "../../components/FormComponents/SelectField.jsx";

const roles = [
  { nombre: "Administrador", value: "admin" },
  { nombre: "Editor", value: "editor" },
  { nombre: "Visualizador", value: "viewer" },
];

const estados = [
  { nombre: "Activo", value: true },
  { nombre: "Inactivo", value: false },
];

const ListaUsuarios = ({ rolUsuarioActual }) => {
  const {
    usuarios,
    loading,
    busqueda,
    setBusqueda,
    buscarUsuario,
    eliminarUsuario,
    abrirModalEdicion: abrirModalOriginal,
    modalAbierto,
    cerrarModal,
    usuarioEditando,
    guardarCambios,
    rolUsuarioActual: rol
  } = useListaUsuarios(rolUsuarioActual);

  const [formEdit, setFormEdit] = React.useState({});

  // Cuando cambia usuarioEditando, actualiza el formulario
  React.useEffect(() => {
    if (usuarioEditando) {
      setFormEdit({ ...usuarioEditando });
    }
  }, [usuarioEditando]);

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  // Aquí mapeamos explícitamente el usuario para que tenga los nombres de campos que usa el formulario
  const abrirModalEdicion = (usuario) => {
    abrirModalOriginal({
      nombreUsuario: usuario.nombreUsuario || "",  // Ajusta según la estructura real
      correo: usuario.correo || "",
      identificacion: usuario.identificacion || "",
      rol: usuario.rol || "",
      activo: usuario.activo === true || usuario.activo === "true", // asegura booleano
      id: usuario.id,
      idMunicipalidad: usuario.idMunicipalidad || "",
    });
  };

  const columns = [
    { name: "ID", selector: row => row.id },
    { name: "Nombre", selector: row => row.nombreUsuario },
    { name: "Correo", selector: row => row.correo },
    { name: "Rol", selector: row => row.rol },
    { name: "Estado", selector: row => (row.activo ? "Activo" : "Inactivo") },
    { name: "Identificación", selector: row => row.identificacion },
    { name: "Municipalidad", selector: row => row.idMunicipalidad },
    rol === "admin" && {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => abrirModalEdicion(row)}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => eliminarUsuario(row.id)}
          >
            Eliminar
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ].filter(Boolean);

  return (
    <>
      <FormContainer title="Lista de Usuarios" onSubmit={buscarUsuario} size="md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <InputField
              label="Buscar por ID"
              name="busqueda"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej: 1"
            />
          </div>
          <div className="flex-1 flex items-end">
            <SubmitButton width="w-full" loading={loading} color="text-black">
              Buscar
            </SubmitButton>
          </div>
        </div>

        <div className="mt-8">
          <GlobalDataTable
            columns={columns}
            data={usuarios}
            loading={loading}
            rowsPerPage={5}
            pagination
            noDataComponent={
              <div className="p-4 text-center text-gray-500">
                {loading ? "Cargando usuarios..." : "No se encontraron usuarios"}
              </div>
            }
          />
        </div>
      </FormContainer>

      {/* Modal de edición */}
      {modalAbierto && (
        <Modal title="Editar Usuario" onClose={cerrarModal}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardarCambios(formEdit);
            }}
            className="flex flex-col gap-4"
          >
            <InputField
              label="Nombre"
              name="nombreUsuario"
              value={formEdit.nombreUsuario || ""}
              onChange={handleChangeEdit}
              required
            />
            <InputField
              label="Correo"
              name="correo"
              type="email"
              value={formEdit.correo || ""}
              onChange={handleChangeEdit}
              required
            />
            <InputField
              label="Identificación"
              name="identificacion"
              value={formEdit.identificacion || ""}
              onChange={handleChangeEdit}
              required
            />
            <SelectField
              label="Rol"
              name="rol"
              value={formEdit.rol || ""}
              onChange={handleChangeEdit}
              options={roles}
              optionLabel="nombre"
              optionValue="value"
              required
            />
            <SelectField
              label="Estado"
              name="activo"
              value={formEdit.activo}
              onChange={handleChangeEdit}
              options={estados}
              optionLabel="nombre"
              optionValue="value"
              required
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <SubmitButton color="text-black">
                Guardar cambios
              </SubmitButton>
            </div>
          </form>
        </Modal>
      )}

      <CustomToaster />
    </>
  );
};

export default ListaUsuarios;
