<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id'])) {
    echo json_encode([
        "success" => false,
        "message" => "ID requerido para eliminar"
    ]);
    exit;
}

$sql = "DELETE FROM clientes WHERE id = :id";
$stmt = $pdo->prepare($sql);

$resultado = $stmt->execute([
    ":id" => $data['id']
]);

if ($resultado) {
    echo json_encode([
        "success" => true,
        "message" => "Cliente eliminado correctamente"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al eliminar en la base de datos"
    ]);
}
?>