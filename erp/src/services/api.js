const BASE_URL = "http://localhost/FARMASOFT_3288361/backend";

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

export async function guardarCliente(cliente) {
  try {
    const response = await fetch(`${BASE_URL}/clientes/guardar.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error("Error al guardar cliente");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function actualizarCliente(cliente) {
  try {
    const response = await fetch(`${BASE_URL}/clientes/actualizar.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar cliente");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function eliminarCliente(id) {
  try {
    const response = await fetch(`${BASE_URL}/clientes/eliminar.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Error al eliminar cliente");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
