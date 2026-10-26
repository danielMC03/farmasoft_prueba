<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) && !empty($data->nombre) && !empty($data->documento)) {
    $sql = "UPDATE clientes SET nombre = :nombre, documento = :documento, email = :email, telefono = :telefono, direccion = :direccion WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    
    $resultado = $stmt->execute([
        ':id' => $data->id,
        ':nombre' => $data->nombre,
        ':documento' => $data->documento,
        ':email' => $data->email,
        ':telefono' => $data->telefono,
        ':direccion' => $data->direccion
    ]);

    if($resultado) {
        echo json_encode(["success" => "Cliente actualizado correctamente"]);
    } else {
        echo json_encode(["error" => "No se pudo actualizar el cliente"]);
    }
} else {
    echo json_encode(["error" => "Faltan datos obligatorios"]);
}
?>