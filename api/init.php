<?php
require_once "db.php";
header("Content-Type: application/json");

try {
    // First, ensure tables exist
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS artists (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE,
      image VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  ");

    $pdo->exec("
    CREATE TABLE IF NOT EXISTS songs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      artist_id INT NOT NULL,
      duration INT,
      cover VARCHAR(500),
      url VARCHAR(500),
      is_liked BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
    )
  ");

    $pdo->exec("
    CREATE TABLE IF NOT EXISTS playlists (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      cover VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  ");

    $pdo->exec("
    CREATE TABLE IF NOT EXISTS playlist_songs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      playlist_id INT NOT NULL,
      song_id INT NOT NULL,
      FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
      FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE,
      UNIQUE KEY unique_playlist_song (playlist_id, song_id)
    )
  ");

    // Insert Itchyworms artist
    $stmt = $pdo->prepare("INSERT IGNORE INTO artists (name, image) VALUES (?, ?)");
    $stmt->execute(['Itchyworms', '/covers/itchyworms.jpg']);

    // Get Itchyworms artist ID
    $stmt = $pdo->prepare("SELECT id FROM artists WHERE name = ?");
    $stmt->execute(['Itchyworms']);
    $artist = $stmt->fetch();
    $artistId = $artist['id'] ?? 1;

    // Insert the song
    $stmt = $pdo->prepare("
    INSERT IGNORE INTO songs (title, artist_id, duration, cover, url)
    VALUES (?, ?, ?, ?, ?)
  ");
    $stmt->execute([
        'Akin Ka Na Lang',
        $artistId,
        210,
        '/covers/akin_ka_na_lang.jpg',
        '/songs/Itchyworms - Akin Ka Na Lang (Official Music Video).mp3'
    ]);

    // Get the song ID
    $stmt = $pdo->prepare("SELECT id FROM songs WHERE title = ? AND artist_id = ?");
    $stmt->execute(['Akin Ka Na Lang', $artistId]);
    $song = $stmt->fetch();
    $songId = $song['id'] ?? null;

    // Create or get the "Matured Songs" playlist
    $stmt = $pdo->prepare("SELECT id FROM playlists WHERE name = ?");
    $stmt->execute(['Matured Songs']);
    $playlist = $stmt->fetch();

    if (!$playlist) {
        $stmt = $pdo->prepare("
      INSERT INTO playlists (name, description, cover)
      VALUES (?, ?, ?)
    ");
        $stmt->execute([
            'Matured Songs',
            'Mature and soulful music collection',
            '/covers/matured_songs.jpg'
        ]);
        $playlistId = $pdo->lastInsertId();
    } else {
        $playlistId = $playlist['id'];
    }

    // Add song to playlist
    if ($songId && $playlistId) {
        $stmt = $pdo->prepare("
      INSERT IGNORE INTO playlist_songs (playlist_id, song_id)
      VALUES (?, ?)
    ");
        $stmt->execute([$playlistId, $songId]);
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Database initialized successfully!',
        'details' => [
            'artist_id' => $artistId,
            'song_id' => $songId,
            'playlist_id' => $playlistId,
            'song' => 'Akin Ka Na Lang',
            'artist' => 'Itchyworms'
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
