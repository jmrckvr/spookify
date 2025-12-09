<?php
require_once "db.php";
header("Content-Type: application/json");

try {
    // Create artists table
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS artists (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL UNIQUE,
      image VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  ");

    // Create songs table
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
      FOREIGN KEY (artist_id) REFERENCES artists(id)
    )
  ");

    // Create playlists table
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS playlists (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      cover VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  ");

    // Create playlist_songs junction table
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

    // Insert artists
    $artists = [
        ['Itchyworms', '/covers/itchyworms.jpg'],
        ['Daniel Caesar', '/covers/daniel_caesar.jpg'],
        ['Drake', '/covers/drake.jpg'],
        ['SZA', '/covers/sza.jpg'],
        ['Kendrick Lamar', '/covers/kendricklamar.jpg'],
    ];

    foreach ($artists as [$name, $image]) {
        try {
            $stmt = $pdo->prepare("INSERT INTO artists (name, image) VALUES (?, ?)");
            $stmt->execute([$name, $image]);
        } catch (PDOException $e) {
            // Artist already exists, skip
        }
    }

    // Get artist IDs
    $stmt = $pdo->query("SELECT id, name FROM artists");
    $artistMap = [];
    foreach ($stmt->fetchAll() as $artist) {
        $artistMap[$artist['name']] = $artist['id'];
    }

    // Insert songs
    $songs = [
        [
            'title' => 'Akin Ka Na Lang',
            'artist' => 'Itchyworms',
            'duration' => 210,
            'cover' => '/covers/akin_ka_na_lang.jpg',
            'url' => '/songs/Itchyworms - Akin Ka Na Lang (Official Music Video).mp3'
        ],
        [
            'title' => 'Best Part',
            'artist' => 'Daniel Caesar',
            'duration' => 251,
            'cover' => '/covers/best_part.jpg',
            'url' => '/songs/best_part.mp3'
        ],
        [
            'title' => 'God\'s Plan',
            'artist' => 'Drake',
            'duration' => 238,
            'cover' => '/covers/gods_plan.jpg',
            'url' => '/songs/gods_plan.mp3'
        ],
    ];

    foreach ($songs as $song) {
        try {
            $stmt = $pdo->prepare("
        INSERT INTO songs (title, artist_id, duration, cover, url)
        VALUES (?, ?, ?, ?, ?)
      ");
            $stmt->execute([
                $song['title'],
                $artistMap[$song['artist']] ?? 1,
                $song['duration'],
                $song['cover'],
                $song['url']
            ]);
        } catch (PDOException $e) {
            // Song already exists, skip
        }
    }

    // Get song IDs
    $stmt = $pdo->query("SELECT id, title FROM songs");
    $songMap = [];
    foreach ($stmt->fetchAll() as $song) {
        $songMap[$song['title']] = $song['id'];
    }

    // Create playlists
    $playlists = [
        [
            'name' => 'Son Of Spergy',
            'description' => 'Best feel-good songs',
            'cover' => '/covers/son_of_spergy.jpg'
        ],
        [
            'name' => 'Matured Songs',
            'description' => 'Mature and soulful music',
            'cover' => '/covers/matured_songs.jpg'
        ],
    ];

    $playlistMap = [];
    foreach ($playlists as $playlist) {
        try {
            $stmt = $pdo->prepare("
        INSERT INTO playlists (name, description, cover)
        VALUES (?, ?, ?)
      ");
            $stmt->execute([
                $playlist['name'],
                $playlist['description'],
                $playlist['cover']
            ]);
            $playlistMap[$playlist['name']] = $pdo->lastInsertId();
        } catch (PDOException $e) {
            // Playlist already exists, get its ID
            $stmt = $pdo->prepare("SELECT id FROM playlists WHERE name = ?");
            $stmt->execute([$playlist['name']]);
            $result = $stmt->fetch();
            if ($result) {
                $playlistMap[$playlist['name']] = $result['id'];
            }
        }
    }

    // Add songs to playlists
    $playlistSongs = [
        'Son Of Spergy' => ['Akin Ka Na Lang', 'Best Part'],
        'Matured Songs' => ['God\'s Plan']
    ];

    foreach ($playlistSongs as $playlistName => $songTitles) {
        $playlistId = $playlistMap[$playlistName] ?? null;
        if ($playlistId) {
            foreach ($songTitles as $songTitle) {
                $songId = $songMap[$songTitle] ?? null;
                if ($songId) {
                    try {
                        $stmt = $pdo->prepare("
              INSERT INTO playlist_songs (playlist_id, song_id)
              VALUES (?, ?)
            ");
                        $stmt->execute([$playlistId, $songId]);
                    } catch (PDOException $e) {
                        // Already exists, skip
                    }
                }
            }
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Database setup complete!',
        'playlists_created' => count($playlistMap),
        'songs_created' => count($songMap),
        'artists_created' => count($artistMap)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
