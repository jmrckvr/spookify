<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$userId = $data['user_id'];

$stmt = $pdo->prepare("INSERT INTO playlists (user_id, name) VALUES (?, ?)");
$stmt->execute([$userId, $name]);

echo json_encode(["id" => $pdo->lastInsertId(), "name" => $name, "songs" => []]);