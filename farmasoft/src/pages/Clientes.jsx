import React, { useState, useEffect } from "react";
import { obtenerClientes } from "../services/api";
export default function Clientes() {
  const [listaClientes, setListacientes] = useState([]);
  const [loading, setloading] = useState(true);

  // Estados para el formulario de nuevo cliente
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Función para cargar los clientes
  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setListaclientes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // Función para registrar el cliente
  const registrarCliente = (e) => {
    e.preventDefault();

    const nuevoCliente = { nombre, documento, telefono, email };

    fetch("http://localhost/FARMASOFT_3288361/Backend/clientes/Crear.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoCliente),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mensaje) {
          alert(data.mensaje);
          // Limpiar formulario
          setNombre("");
          setDocumento("");
          setTelefono("");
          setEmail("");
          // Recargar la tabla
          cargarClientes();
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((error) => console.error("Error en el registro:", error));
  };

  return (
    <div>
      <h1 style={{ color: "#1e293b", marginBottom: "10px" }}>
        Gestión de Clientes
      </h1>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        Listado general conectado desde la base de datos.
      </p>

      {/* Formulario de Registro */}
      <form
        onSubmit={registrarCliente}
        style={{
          background: "#f8fafc",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3>Registrar Nuevo Cliente</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            type="text"
            placeholder="Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #cbd5e1",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#0ea5e9",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Guardar Cliente
        </button>
      </form>

      {/* Tabla de Listado */}
      <table
        className="table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#1e293b", color: "white" }}>
            <th style={{ padding: "10px" }}>IDENTIFICACIÓN</th>
            <th style={{ padding: "10px" }}>Nombre</th>
            <th style={{ padding: "10px" }}>Documento</th>
            <th style={{ padding: "10px" }}>Teléfono</th>
            <th style={{ padding: "10px" }}>Correo</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Cargando datos...
              </td>
            </tr>
          ) : listaClientes.length > 0 ? (
            listaClientes.map((cliente) => (
              <tr
                key={cliente.id}
                style={{ borderBottom: "1px solid #e2e8f0" }}
              >
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {cliente.id}
                </td>
                <td style={{ padding: "10px" }}>{cliente.nombre}</td>
                <td style={{ padding: "10px" }}>{cliente.documento}</td>
                <td style={{ padding: "10px" }}>{cliente.telefono}</td>
                <td style={{ padding: "10px" }}>{cliente.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No hay clientes registrados en la base de datos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
