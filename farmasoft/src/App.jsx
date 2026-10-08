import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";

export default function App() {
  const [vista, setVista] = useState("clientes");

  // Función para renderizar la página según el estado
  const renderVista = () => {
    if (vista === "clientes") return <Clientes />;
    if (vista === "productos") return <Productos />;
    if (vista === "ventas") return <Ventas />;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Sidebar setVista={setVista} />
      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar vista={vista} />
        <div style={{ padding: "30px" }}>{renderVista()}</div>
      </div>
    </div>
  );
}
