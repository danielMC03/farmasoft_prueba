import React, { useState, useEffect } from "react";
import { obtenerProductos, crearProducto } from "../services/api";

export default function Productos() {
  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar productos desde el Backend PHP
  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setListaProductos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Enviar formulario para guardar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      const nuevoProducto = {
        nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock),
      };
      await crearProducto(nuevoProducto);
      setMensaje("¡Producto registrado con éxito!");

      // Limpiar formulario
      setNombre("");
      setPrecio("");
      setStock("");

      // Recargar lista
      cargarProductos();
    } catch (error) {
      console.error("Error al crear producto:", error);
      setMensaje("Error al registrar el producto");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Productos / Inventario</h2>

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
        <h3>Registrar Nuevo Producto</h3>
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
            <label>Nombre del Producto:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div>
            <label>Cantidad en Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Guardar Producto
          </button>
        </form>
      </div>

      {/* Tabla de Productos */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Inventario de Productos</h3>
        {loading ? (
          <p>Cargando inventario...</p>
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
                  Precio
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {listaProductos.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    style={{ padding: "10px", textAlign: "center" }}
                  >
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                listaProductos.map((prod, index) => (
                  <tr key={prod.id || index}>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {prod.id}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {prod.nombre}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {prod.precio}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {prod.stock}
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
