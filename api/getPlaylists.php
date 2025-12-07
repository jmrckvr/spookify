<?php
require 'db.php'; // your PDO connection

$userId = $_GET['user_id']; // pass user_id from frontend
$stmt = $pdo->prepare("SELECT * FROM playlists WHERE user_id = ?");
$stmt->execute([$userId]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));