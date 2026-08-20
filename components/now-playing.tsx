"use client";

import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import { songs } from "@/lib/config";
import { useApp } from "@/context/app-context";
import { Slider } from "@/components/ui/slider";

function clock(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0:00";
  }
  const total = Math.floor(value);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function NowPlaying() {
  const { songIndex, playing, togglePlay, nextSong, prevSong, progress, duration, seek, playerOpen, setPlayerOpen } = useApp();

  if (songIndex === null) {
    return null;
  }

  const song = songs[songIndex];

  if (!playerOpen) {
    return (
      <button
        type="button"
        onClick={() => setPlayerOpen(true)}
        aria-label="Mở trình phát nhạc"
        className="td-player-mini"
      >
        <img src={song.avatar} alt="" className={playing ? "cover-spin" : undefined} />
      </button>
    );
  }

  return (
    <aside className="td-player" role="dialog" aria-label="Trình phát nhạc">
      <button type="button" onClick={() => setPlayerOpen(false)} aria-label="Đóng trình phát" className="td-player-x">
        <X className="size-3.5" />
      </button>
      <div className="td-player-head">
        <div className="td-player-disc">
          <img src={song.avatar} alt="" className={playing ? "cover-spin" : undefined} />
        </div>
        <div className="td-player-meta">
          <b>{song.title}</b>
          <i>{song.author}</i>
        </div>
      </div>
      <Slider className="td-player-seek" value={[progress]} max={duration || 1} step={0.5} onValueChange={(v) => seek(v[0] ?? 0)} />
      <div className="td-player-time">
        <span>{clock(progress)}</span>
        <span>{clock(duration)}</span>
      </div>
      <div className="td-player-ctrl">
        <button type="button" onClick={prevSong} aria-label="Bài trước">
          <SkipBack className="size-4" />
        </button>
        <button type="button" onClick={togglePlay} aria-label={playing ? "Tạm dừng" : "Phát"} className="td-player-play">
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button type="button" onClick={nextSong} aria-label="Bài kế tiếp">
          <SkipForward className="size-4" />
        </button>
      </div>
    </aside>
  );
}
