<?php
require_once "db.php";

header("Content-Type: application/json");

try {
    // First, check if the song exists
    $check = $pdo->prepare("SELECT id FROM songs WHERE url = ?");
    $check->execute(["public/songs/Itchyworms - Akin Ka Na Lang (Official Music Video).mp3"]);
    $song = $check->fetch(PDO::FETCH_ASSOC);

    if (!$song) {
        // Get Itchyworms artist ID (assuming it exists, or use a default artist)
        $artistStmt = $pdo->query("SELECT id FROM artists LIMIT 1");
        $artist = $artistStmt->fetch(PDO::FETCH_ASSOC);
        $artist_id = $artist['id'] ?? 1;

        // Insert the song
        $insert = $pdo->prepare("
            INSERT INTO songs (title, artist_id, url, cover_image, duration)
            VALUES (?, ?, ?, ?, ?)
        ");
        $insert->execute([
            "Akin Ka Na Lang",
            $artist_id,
            "public/songs/Itchyworms - Akin Ka Na Lang (Official Music Video).mp3",
            "public/covers/maturedsongs.jpg",
            307  // 5:07 duration
        ]);
        $song_id = $pdo->lastInsertId();
    } else {
        $song_id = $song['id'];
    }

    // Add to "Matured Songs" playlist (ID = 2)
    $playlist_id = 2;
    $checkPlaylist = $pdo->prepare("SELECT id FROM playlist_songs WHERE song_id = ? AND playlist_id = ?");
    $checkPlaylist->execute([$song_id, $playlist_id]);

    if (!$checkPlaylist->fetch()) {
        $addToPlaylist = $pdo->prepare("INSERT INTO playlist_songs (song_id, playlist_id) VALUES (?, ?)");
        $addToPlaylist->execute([$song_id, $playlist_id]);
    }

    echo json_encode(["success" => true, "message" => "Song added to Matured Songs", "song_id" => $song_id]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
