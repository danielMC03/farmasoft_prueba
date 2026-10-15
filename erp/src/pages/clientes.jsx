import React, { useEffect, useState } from "react";
import {
  obtenerClientes,
  guardarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/api";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(false);

  const [clienteForm, setClienteForm] = useState({
    id: null,
    nombre: "",
    documento: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const cargarClientes = () => {
    setCargando(true);
    obtenerClientes()
      .then((data) => {
        setClientes(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo conectar con el servidor.");
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (e) => {
    setClienteForm({
      ...clienteForm,
      [e.target.name]: e.target.value,
    });
  };

  const abrirModalNuevo = () => {
    setEditando(false);
    setClienteForm({
      id: null,
      nombre: "",
      documento: "",
      email: "",
      telefono: "",
      direccion: "",
    });
  };

  const abrirModalEditar = (cliente) => {
    setEditando(true);
    setClienteForm(cliente);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editando) {
        res = await actualizarCliente(clienteForm);
      } else {
        res = await guardarCliente(clienteForm);
      }

      if (res.status === "success") {
        setClienteForm({
          id: null,
          nombre: "",
          documento: "",
          email: "",
          telefono: "",
          direccion: "",
        });

        const modalElement = document.getElementById("modalCliente");
        if (window.bootstrap) {
          const modal =
            window.bootstrap.Modal.getInstance(modalElement) ||
            new window.bootstrap.Modal(modalElement);
          modal.hide();
        }

        cargarClientes();
      } else {
        alert("Error: " + (res.message || "No se pudo procesar la solicitud"));
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      try {
        const res = await eliminarCliente(id);
        if (res.status === "success") {
          cargarClientes();
        } else {
          alert("Error al eliminar: " + res.message);
        }
      } catch (err) {
        alert("Error de conexión al eliminar cliente");
      }
    }
  };

  if (cargando)
    return (
      <div className="container mt-4">
        <p>Cargando clientes...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Clientes</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalCliente"
          onClick={abrirModalNuevo}
        >
          + Nuevo Cliente
        </button>
      </div>

      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay clientes registrados.
              </td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.documento}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCliente"
                    onClick={() => abrirModalEditar(cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal Reutilizable para Crear y Editar */}
      <div
        className="modal fade"
        id="modalCliente"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editando ? "Editar Cliente" : "Registrar Nuevo Cliente"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={clienteForm.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Documento *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="documento"
                    value={clienteForm.documento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={clienteForm.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={clienteForm.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={clienteForm.direccion}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-success">
                  {editando ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
