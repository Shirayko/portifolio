"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./MusicPlayer.module.css";

const P4_VIDEOS = ["iQBbnP_uutA", "1MRGiQrEABE", "P3ue1JPFXEU"];

const DEFAULT_VOLUME = 10;
const START_INDEX = Math.floor(Math.random() * P4_VIDEOS.length);

let playerInstance: YT.Player | null = null;
let playerReady = false;
let playerMuted = false;
let playerVolume = DEFAULT_VOLUME;

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackName, setTrackName] = useState("—");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [apiReady, setApiReady] = useState(false);

  const updateTrack = useCallback(() => {
    if (!playerInstance) return;
    try {
      const vd = playerInstance.getVideoData();
      if (vd?.title) {
        setTrackName(vd.title);
        return;
      }
    } catch {}
    try {
      const idx = playerInstance.getPlaylistIndex();
      const tracks = ["Signs Of Love", "I'll Face Myself", "Heartbeat, Heartbreak"];
      if (idx >= 0 && idx < tracks.length) {
        setTrackName(tracks[idx]);
        return;
      }
    } catch {}
    setTrackName("Persona 4 OST");
  }, []);

  useEffect(() => {
    (window as unknown as { onYouTubeIframeAPIReady: () => void }).onYouTubeIframeAPIReady = () => {
      playerInstance = new YT.Player("yt-player", {
        height: "0",
        width: "0",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 0,
        },
        events: {
          onReady: () => {
            playerReady = true;
            playerInstance?.loadPlaylist(P4_VIDEOS, START_INDEX);
            playerInstance?.setVolume(DEFAULT_VOLUME);
            playerInstance?.playVideo();
            setTimeout(() => {
              if (playerInstance && playerReady) {
                playerInstance.unMute();
                playerMuted = false;
                setMuted(false);
              }
            }, 500);
            setApiReady(true);
            updateTrack();
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (e.data === YT.PlayerState.PLAYING) {
              setPlaying(true);
              updateTrack();
            } else if (
              e.data === YT.PlayerState.PAUSED ||
              e.data === YT.PlayerState.ENDED
            ) {
              setPlaying(false);
              if (e.data === YT.PlayerState.ENDED) updateTrack();
            } else if (e.data === YT.PlayerState.CUED) {
              setPlaying(false);
              updateTrack();
            }
          },
          onError: () => setTrackName("—"),
        },
      });
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    } else if (window.YT?.Player) {
      (window as unknown as { onYouTubeIframeAPIReady: () => void }).onYouTubeIframeAPIReady?.();
    }

    return () => {
      playerInstance?.destroy();
      playerInstance = null;
      playerReady = false;
    };
  }, [updateTrack]);

  const togglePlay = () => {
    if (!playerReady || !playerInstance) return;
    try {
      const s = playerInstance.getPlayerState();
      if (s === YT.PlayerState.PLAYING) {
        playerInstance.pauseVideo();
      } else {
        playerInstance.playVideo();
      }
    } catch {}
  };

  const prev = () => {
    if (!playerReady || !playerInstance) return;
    try {
      playerInstance.previousVideo();
    } catch {}
    setTimeout(updateTrack, 300);
  };

  const next = () => {
    if (!playerReady || !playerInstance) return;
    try {
      playerInstance.nextVideo();
    } catch {}
    setTimeout(updateTrack, 300);
  };

  const toggleMute = () => {
    if (!playerReady || !playerInstance) return;
    playerMuted = !playerMuted;
    try {
      if (playerMuted) playerInstance.mute();
      else playerInstance.unMute();
    } catch {}
    setMuted(playerMuted);
  };

  const setVol = (pct: number) => {
    if (!playerReady || !playerInstance) return;
    playerVolume = Math.round(Math.max(0, Math.min(100, pct)));
    try {
      playerInstance.setVolume(playerVolume);
    } catch {}
    if (playerMuted) {
      playerMuted = false;
      try {
        playerInstance.unMute();
      } catch {}
      setMuted(false);
    }
    setVolume(playerVolume);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setVol(pct);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const panel = document.getElementById("mcPanel");
      const toggle = document.getElementById("mcToggle");
      if (panel?.classList.contains("open")) {
        if (!toggle?.contains(e.target as Node) && !panel.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles.controller}>
      <div id="yt-player" style={{ display: "none" }} />

      <button
        id="mcToggle"
        className={styles.toggle}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar player de música" : "Abrir player de música"}
        disabled={!apiReady}
      >
        ♪
      </button>

      <div
        id="mcPanel"
        className={`${styles.panel} ${open ? styles.open : ""}`}
      >
        <div className={styles.header}>
          <span className={styles.title}>TRILHA SONORA</span>
          <span className={styles.subtitle}>PERSONA 4</span>
        </div>

        <div className={styles.display}>
          <span className={styles.trackLabel}>TOCANDO</span>
          <span className={styles.trackName}>{trackName}</span>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={prev}
            title="Anterior"
            aria-label="Faixa anterior"
            disabled={!apiReady}
          >
            ⏮
          </button>
          <button
            className={`${styles.btn} ${styles.play}`}
            onClick={togglePlay}
            title="Play/Pause"
            aria-label={playing ? "Pausar" : "Tocar"}
            disabled={!apiReady}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            className={styles.btn}
            onClick={next}
            title="Próximo"
            aria-label="Próxima faixa"
            disabled={!apiReady}
          >
            ⏭
          </button>
          <button
            className={styles.btn}
            onClick={toggleMute}
            title="Mutar"
            aria-label={muted ? "Ativar som" : "Mutar"}
            disabled={!apiReady}
          >
            {muted ? "✕" : "♪"}
          </button>
        </div>

        <div className={styles.volume}>
          <span className={styles.volIcon}>▶</span>
          <div className={styles.volTrack} onClick={handleVolumeClick} role="slider" aria-label="Volume" aria-valuenow={volume}>
            <div className={styles.volFill} style={{ width: `${muted ? 0 : volume}%` }} />
            <div className={styles.volThumb} style={{ left: `${muted ? 0 : volume}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
