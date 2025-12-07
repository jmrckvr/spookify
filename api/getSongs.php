<?php
require 'db.php';

$playlistId = $_GET['playlist_id'];
$stmt = $pdo->prepare("
  SELECT s.* FROM songs s
  JOIN playlist_songs ps ON s.id = ps.song_id
  WHERE ps.playlist_id = ?
");
$stmt->execute([$playlistId]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));