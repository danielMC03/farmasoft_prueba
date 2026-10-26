import { useEffect, useState } from "react";
import { obtenerClientes, eliminarCliente } from "../services/api";
import ClienteModal from "../components/ClienteModal";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const cargarDatosClientes = async () => {
    setLoading(true);
    const data = await obtenerClientes();
    setClientes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    cargarDatosClientes();
  }, []);

  // Función para eliminar cliente con confirmación
  const handleEliminar = async (id, nombre) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar a ${nombre}?`,
    );
    if (confirmar) {
      const res = await eliminarCliente(id);
      if (res.success) {
        cargarDatosClientes(); // Recarga la tabla de inmediato
      } else {
        alert(res.message || "No se pudo eliminar el cliente");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Clientes</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#clienteModal"
          onClick={() => setClienteSeleccionado(null)}
        >
          + Nuevo Cliente
        </button>
      </div>

      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.documento}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#clienteModal"
                    onClick={() => setClienteSeleccionado(cliente)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(cliente.id, cliente.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Reutilizable para Crear y Editar */}
      <ClienteModal
        clienteSeleccionado={clienteSeleccionado}
        onClienteGuardado={() => {
          cargarDatosClientes();
          setClienteSeleccionado(null);
        }}
      />
    </div>
  );
}

export default Clientes;
