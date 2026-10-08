// Configuración de la URL Base de la API
const BASE_URL = "http://localhost/FARMASOFT_3288361/Backend";

// --- MÓDULO CLIENTES ---

// 1. Obtener lista de clientes
export async function obtenerClientes() {
  try {
    const response = await fetch(`${BASE_URL}/clientes/listar.php`);
    if (!response.ok) throw new Error("Error al obtener clientes");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 2. Crear un nuevo cliente
export async function crearCliente(cliente) {
  try {
    const response = await fetch(`${BASE_URL}/clientes/Crear.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) throw new Error("Error al crear cliente");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
