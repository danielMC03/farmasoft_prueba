export default function Sidebar({ setVista }) {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>FARMASOFT</h2>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "30px" }}>
        <li
          style={{ padding: "10px 0", cursor: "pointer" }}
          onClick={() => setVista("clientes")}
        >
          👥 Clientes
        </li>
        <li
          style={{ padding: "10px 0", cursor: "pointer" }}
          onClick={() => setVista("productos")}
        >
          📦 Productos
        </li>
        <li
          style={{ padding: "10px 0", cursor: "pointer" }}
          onClick={() => setVista("ventas")}
        >
          💰 Ventas
        </li>
      </ul>
    </div>
  );
}
