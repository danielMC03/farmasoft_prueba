// Función para actualizar cliente
export const actualizarCliente = async (cliente) => {
  try {
    const response = await fetch(
      "http://localhost/farmasoft_prueba/backend/clientes/actualizar.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
  }
};
export async function editarCliente(cliente) {
  const response = await fetch(
    "http://localhost/farmasoft_prueba/backend/clientes/editar.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    },
  );

  return response.json();
}
export async function eliminarCliente(id) {
  const response = await fetch(
    "http://localhost/farmasoft_prueba/backend/clientes/eliminar.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    },
  );

  return response.json();
}
