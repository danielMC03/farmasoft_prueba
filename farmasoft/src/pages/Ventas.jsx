import React, { useState, useEffect } from "react";
import {
  obtenerClientes,
  obtenerProductos,
  obtenerVentas,
  crearVenta,
} from "../services/api";

export default function Ventas() {
  const [listaVentas, setListaVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Campos del formulario
  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  // Cargar clientes, productos y ventas desde el Backend PHP
  const cargarDatos = async () => {
    try {
      const [ventasData, clientesData, productosData] = await Promise.all([
        obtenerVentas(),
        obtenerClientes(),
        obtenerProductos(),
      ]);
      setListaVentas(ventasData);
      setClientes(clientesData);
      setProductos(productosData);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos de ventas:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Calcular precio total automáticamente según producto y cantidad
  const productoSeleccionado = productos.find(
    (p) => String(p.id) === String(productoId),
  );
  const totalCalculado = productoSeleccionado
    ? productoSeleccionado.precio * cantidad
    : 0;

  // Guardar la venta en MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!clienteId || !productoId) {
      setMensaje("Error: Selecciona un cliente y un producto");
      return;
    }

    try {
      const nuevaVenta = {
        cliente_id: parseInt(clienteId),
        producto_id: parseInt(productoId),
        cantidad: parseInt(cantidad),
        total: parseFloat(totalCalculado),
      };

      await crearVenta(nuevaVenta);
      setMensaje("¡Venta registrada con éxito!");

      // Limpiar campos
      setClienteId("");
      setProductoId("");
      setCantidad(1);

      // Recargar lista actualizada
      cargarDatos();
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      setMensaje("Error al registrar la venta");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Ventas</h2>

      {/* Formulario de Nueva Venta */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Registrar Nueva Venta</h3>
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
          style={{ display: "grid", gap: "12px", maxWidth: "450px" }}
        >
          <div>
            <label>Seleccionar Cliente:</label>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">-- Seleccione un Cliente --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} ({c.documento})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Seleccionar Producto:</label>
            <select
              value={productoId}
              onChange={(e) => setProductoId(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="">-- Seleccione un Producto --</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} - ${p.precio} (Stock: {p.stock})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div>
            <label>
              <strong>Total a Pagar:</strong>
            </label>
            <input
              type="text"
              value={`$${totalCalculado}`}
              disabled
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                backgroundColor: "#e9ecef",
                fontWeight: "bold",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#17a2b8",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Registrar Venta
          </button>
        </form>
      </div>

      {/* Historial de Ventas */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Historial de Ventas Registradas</h3>
        {loading ? (
          <p>Cargando ventas...</p>
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
                  Cliente
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Producto
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Cantidad
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {listaVentas.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{ padding: "10px", textAlign: "center" }}
                  >
                    No hay ventas registradas
                  </td>
                </tr>
              ) : (
                listaVentas.map((v, index) => (
                  <tr key={v.id || index}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {v.id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {v.cliente || v.cliente_nombre || v.cliente_id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {v.producto || v.producto_nombre || v.producto_id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {v.cantidad}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      ${v.total}
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
