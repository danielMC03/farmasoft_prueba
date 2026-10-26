<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['nombre']) && !empty($data['documento'])) {
    try {
        $stmt = $pdo->prepare("INSERT INTO clientes (nombre, documento, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['nombre'],
            $data['documento'],
            $data['email'] ?? '',
            $data['telefono'] ?? '',
            $data['direccion'] ?? ''
        ]);

        echo json_encode(["status" => "success", "message" => "Cliente guardado con éxito"]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "El nombre y documento son obligatorios"]);
}
?>