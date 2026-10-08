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
// --- MÓDULO PRODUCTOS ---

// 3. Obtener lista de productos
export async function obtenerProductos() {
  try {
    const response = await fetch(`${BASE_URL}/productos/listar.php`);
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

// 4. Crear un nuevo producto
export async function crearProducto(producto) {
  try {
    const response = await fetch(`${BASE_URL}/productos/Crear.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    if (!response.ok) throw new Error("Error al crear producto");
    return await response.json();
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
}
