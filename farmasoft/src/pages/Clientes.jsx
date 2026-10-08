import React, { useState, useEffect } from "react";
import { obtenerClientes, crearCliente } from "../services/api";

export default function Clientes() {
  const [listaclientes, setListaClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Función para cargar los clientes desde el Backend
  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setListaClientes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // Función para enviar el formulario y guardar en la BD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      const nuevoCliente = { nombre, documento, telefono, email };
      await crearCliente(nuevoCliente);
      setMensaje("¡Cliente registrado con éxito!");

      // Limpiar el formulario
      setNombre("");
      setDocumento("");
      setTelefono("");
      setEmail("");

      // Volver a cargar la lista actualizada
      cargarClientes();
    } catch (error) {
      console.error("Error al crear cliente:", error);
      setMensaje("Error al registrar el cliente");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Clientes</h2>

      {/* Formulario de Registro */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Registrar Nuevo Cliente</h3>
        {mensaje && (
          <p
            style={{
              fontWeight: "bold",
              color: mensaje.includes("Error") ? "red" : "green",
            }}
          >
            {mensaje}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: "10px", maxWidth: "400px" }}
        >
          <div>
            <label>Nombre Completo:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Documento / Cédula:</label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Guardar Cliente
          </button>
        </form>
      </div>

      {/* Tabla de Clientes */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Lista de Clientes Registrados</h3>
        {loading ? (
          <p>Cargando clientes...</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  ID
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Nombre
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Documento
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Teléfono
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {listaclientes.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ padding: "10px", textAlign: "center" }}
                  >
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                listaclientes.map((cli, index) => (
                  <tr key={cli.id || index}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {cli.id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {cli.nombre}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {cli.documento}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {cli.telefono}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {cli.email}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
