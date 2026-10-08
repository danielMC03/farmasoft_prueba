<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['id']) && !empty($data['nombre']) && !empty($data['documento'])) {
    try {
        $sql = "UPDATE clientes SET nombre = :nombre, documento = :documento, telefono = :telefono, email = :email WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        
        $stmt->bindParam(':id', $data['id']);
        $stmt->bindParam(':nombre', $data['nombre']);
        $stmt->bindParam(':documento', $data['documento']);
        $stmt->bindParam(':telefono', $data['telefono']);
        $stmt->bindParam(':email', $data['email']);

        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Cliente actualizado correctamente"]);
        } else {
            echo json_encode(["error" => "No se pudo actualizar el cliente"]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Datos incompletos"]);
}
?>