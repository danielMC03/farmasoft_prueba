import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div
      style={{
        backgroundColor: "#333",
        minHeight: "100vh",
        padding: "30px",
        color: "white",
      }}
    >
      <h2>--- ESTE ES EL LAYOUT PADRE ---</h2>
      <hr />
      {/* Aquí se pintará Clientes, Productos o Ventas */}
      <Outlet />
    </div>
  );
}
