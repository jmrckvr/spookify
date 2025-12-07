import { useEffect, useRef } from "react";
import { useMusic } from "@/context/MusicContext";

export function AudioPlayer() {
    const {
        currentSong,
        isPlaying,
        setIsPlaying,
        volume,
        setProgress,
    } = useMusic();

    const audioRef = useRef<HTMLAudioElement>(null);

    // Handle playback when song or play state changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong?.url) return;

        audio.src = currentSong.url;
        audio.volume = volume / 100; // ✅ set volume before play
        audio.load();

        if (isPlaying) {
            audio.play().catch(console.error);
        } else {
            audio.pause();
        }
    }, [currentSong, isPlaying, volume]);

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 70;
            console.log("Volume set to:", volume);
        }
    }, [volume]);

    // Sync progress
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const progress = (audio.currentTime / audio.duration) * 100 || 0;
            setProgress(progress);
        };

        audio.addEventListener("timeupdate", updateProgress);
        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, [setProgress]);

    return (
        <audio
            ref={audioRef}
            onEnded={() => setIsPlaying(false)}
            style={{ display: "none" }}
        />
    );
}