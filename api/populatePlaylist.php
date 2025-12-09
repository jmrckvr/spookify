<?php
require_once "db.php";

header("Content-Type: application/json");

try {
    // Get the Itchyworms song with the specific URL
    $stmt = $pdo->prepare("SELECT id FROM songs WHERE url LIKE ? LIMIT 1");
    $stmt->execute(["%Itchyworms%"]);
    $song = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$song) {
        // If not found by Itchyworms, get the first song
        $stmt = $pdo->query("SELECT id FROM songs LIMIT 1");
        $song = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Playlist ID for "Matured Songs" is 2
    $playlist_id = 2;

    if ($song) {
        $check = $pdo->prepare("SELECT id FROM playlist_songs WHERE song_id = ? AND playlist_id = ?");
        $check->execute([$song['id'], $playlist_id]);

        if (!$check->fetch()) {
            $insert = $pdo->prepare("INSERT INTO playlist_songs (song_id, playlist_id) VALUES (?, ?)");
            $insert->execute([$song['id'], $playlist_id]);
            echo json_encode(["success" => true, "message" => "Song added to playlist", "song_id" => $song['id']]);
        } else {
            echo json_encode(["success" => true, "message" => "Song already in playlist", "song_id" => $song['id']]);
        }
    } else {
        echo json_encode(["error" => "No songs found in database"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
