<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

// Validaciones
if (empty($data['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "ID requerido"
    ]);
    exit;
}

if (empty($data['nombre'])) {
    echo json_encode([
        "success" => false,
        "message" => "El nombre es obligatorio"
    ]);
    exit;
}

$sql = "UPDATE clientes SET
    nombre = :nombre,
    documento = :documento,
    email = :email,
    telefono = :telefono,
    direccion = :direccion
WHERE id = :id";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    ":id" => $data['id'],
    ":nombre" => $data['nombre'],
    ":documento" => $data['documento'] ?? null,
    ":email" => $data['email'] ?? null,
    ":telefono" => $data['telefono'] ?? null,
    ":direccion" => $data['direccion'] ?? null
]);

echo json_encode([
    "success" => true,
    "message" => "Cliente actualizado"
]);
?>