<?php
//Voy a colocar las sentencias de conexion segun la sintaxis
// de PHP
//echo "Archivo de conexion" ;


$host = "localhost";
$db = "farmasoft";
$user = "root";
$pass = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db",
        $user,
        $pass
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo json_encode([
        "error" => $e->getMessage()
    ]);
    exit;
}
