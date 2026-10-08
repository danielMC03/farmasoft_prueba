export default function Navbar({ vista }) {
  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h3 style={{ margin: 0, color: "#333" }}>
        Panel de Control - Módulo actual: {vista.toUpperCase()}
      </h3>
    </div>
  );
}
