<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";

// Recibimos los datos que vienen desde React en formato JSON
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->nombre) && !empty($data->documento) && !empty($data->telefono) && !empty($data->email)){
    try {
        $sql = "INSERT INTO clientes (nombre, documento, telefono, email) VALUES (:nombre, :documento, :telefono, :email)";
        $stmt = $pdo->prepare($sql);
        
        $stmt->execute([
            ':nombre' => $data->nombre,
            ':documento' => $data->documento,
            ':telefono' => $data->telefono,
            ':email' => $data->email
        ]);
        
        echo json_encode(["mensaje" => "Cliente registrado con éxito"]);

    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Datos incompletos para el registro"]);
}
?>