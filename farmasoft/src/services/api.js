// Configuración de la URL Base de la API
const BASE_URL = "http://localhost/FARMASOFT_3288361/Backend";

// Función para obtener la lista de clientes
export async function obtenerClientes() {
  try {
    const response = await fetch(`${BASE_URL}/clientes/listar.php`);
    if (!response.ok) {
      throw new Error("Error al obtener clientes");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para obtener la lista de productos
export async function obtenerProductos() {
  try {
    const response = await fetch(`${BASE_URL}/productos/listar.php`);
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
