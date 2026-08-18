"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { backgrounds, songs } from "@/lib/config";
import { readStore, writeStore } from "@/lib/storage";
import type { ThemeSkin } from "@/lib/types";

type AppContextValue = {
  ready: boolean;
  lockOpen: boolean;
  setLockOpen: (v: boolean) => void;
  loveMode: boolean;
  toggleLove: () => void;
  skin: ThemeSkin;
  toggleSkin: () => void;
  background: string;
  setBackground: (src: string) => void;
  settingsOpen: boolean;
  setSettingsOpen: (v: boolean) => void;
  shareOpen: boolean;
  setShareOpen: (v: boolean) => void;
  destroy: boolean;
  setDestroy: (v: boolean) => void;
  songIndex: number | null;
  playing: boolean;
  progress: number;
  duration: number;
  playSong: (index: number) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (value: number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lockOpen, setLockOpen] = useState(true);
  const [loveMode, setLoveMode] = useState(false);
  const [skin, setSkin] = useState<ThemeSkin>("light");
  const [background, setBackgroundState] = useState(backgrounds[0].src);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [destroy, setDestroy] = useState(false);
  const [songIndex, setSongIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef<number | null>(null);

  useEffect(() => {
    const storedSkin = readStore("skin");
    const storedBg = readStore("bg");
    const storedLove = readStore("love");
    const storedSong = readStore("song");
    if (storedSkin === "dark" || storedSkin === "light") {
      setSkin(storedSkin);
    }
    if (storedBg) {
      setBackgroundState(storedBg);
    }
    if (storedLove === "1") {
      setLoveMode(true);
    }
    if (storedSong) {
      const n = Number(storedSong);
      if (!Number.isNaN(n) && songs[n]) {
        setSongIndex(n);
        indexRef.current = n;
      }
    }
    document.documentElement.classList.toggle("dark", (storedSkin ?? "light") === "dark");
    document.body.style.backgroundImage = `url("${storedBg ?? backgrounds[0].src}")`;
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", skin === "dark");
    writeStore("skin", skin);
  }, [skin]);

  const setBackground = useCallback((src: string) => {
    setBackgroundState(src);
    document.body.style.backgroundImage = `url("${src}")`;
    writeStore("bg", src);
  }, []);

  const toggleSkin = useCallback(() => {
    setSkin((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const toggleLove = useCallback(() => {
    setLoveMode((prev) => {
      const next = !prev;
      writeStore("love", next ? "1" : "0");
      toast.info(next ? "Đã chuyển chế độ đếm ngày yêu" : "Đã chuyển về chế độ profile");
      return next;
    });
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    return audioRef.current;
  }, []);

  const playSong = useCallback(
    (index: number) => {
      const song = songs[index];
      if (!song) {
        return;
      }
      const audio = ensureAudio();
      audio.pause();
      audio.src = song.url;
      audio.play().catch(() => undefined);
      setSongIndex(index);
      indexRef.current = index;
      setPlaying(true);
      writeStore("song", String(index));
      toast.success(`Đang phát: ${song.title}`);
    },
    [ensureAudio]
  );

  const nextSong = useCallback(() => {
    const current = indexRef.current ?? 0;
    playSong((current + 1) % songs.length);
  }, [playSong]);

  const prevSong = useCallback(() => {
    const current = indexRef.current ?? 0;
    playSong((current - 1 + songs.length) % songs.length);
  }, [playSong]);

  const togglePlay = useCallback(() => {
    const audio = ensureAudio();
    if (songIndex === null) {
      playSong(0);
      return;
    }
    if (audio.paused) {
      if (!audio.src) {
        playSong(songIndex);
        return;
      }
      audio.play().catch(() => undefined);
      setPlaying(true);
      return;
    }
    audio.pause();
    setPlaying(false);
  }, [ensureAudio, playSong, songIndex]);

  const seek = useCallback(
    (value: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) {
        return;
      }
      audio.currentTime = value;
      setProgress(value);
    },
    [duration]
  );

  useEffect(() => {
    const audio = ensureAudio();
    const onTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    const onEnded = () => nextSong();
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [ensureAudio, nextSong]);

  const value = useMemo<AppContextValue>(
    () => ({
      ready,
      lockOpen,
      setLockOpen,
      loveMode,
      toggleLove,
      skin,
      toggleSkin,
      background,
      setBackground,
      settingsOpen,
      setSettingsOpen,
      shareOpen,
      setShareOpen,
      destroy,
      setDestroy,
      songIndex,
      playing,
      progress,
      duration,
      playSong,
      togglePlay,
      nextSong,
      prevSong,
      seek
    }),
    [
      background,
      destroy,
      duration,
      lockOpen,
      loveMode,
      nextSong,
      playSong,
      playing,
      prevSong,
      progress,
      ready,
      seek,
      setBackground,
      settingsOpen,
      shareOpen,
      skin,
      songIndex,
      toggleLove,
      togglePlay,
      toggleSkin
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp");
  }
  return ctx;
}
