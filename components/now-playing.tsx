"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { songs } from "@/lib/config";
import { useApp } from "@/context/app-context";
import { Slider } from "@/components/ui/slider";

export function NowPlaying() {
  const { songIndex, playing, togglePlay, nextSong, prevSong, progress, duration, seek } = useApp();
  if (songIndex === null) {
    return null;
  }
  const song = songs[songIndex];

  return (
    <div className="td-glass pointer-events-auto fixed bottom-14 left-1/2 z-30 flex w-[min(92vw,360px)] -translate-x-1/2 items-center gap-3 rounded-2xl px-3 py-2">
      <img src={song.avatar} alt="" className={playing ? "cover-spin size-10 rounded-full object-cover" : "size-10 rounded-full object-cover"} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold">{song.title}</div>
        <div className="truncate text-[11px] opacity-60">{song.author}</div>
        <Slider className="mt-1" value={[progress]} max={duration || 1} step={0.5} onValueChange={(v) => seek(v[0] ?? 0)} />
      </div>
      <div className="flex items-center gap-1">
        <button type="button" onClick={prevSong} aria-label="prev">
          <SkipBack className="size-4" />
        </button>
        <button type="button" onClick={togglePlay} className="grid size-8 place-items-center rounded-full bg-[#425aef] text-white" aria-label="play">
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        </button>
        <button type="button" onClick={nextSong} aria-label="next">
          <SkipForward className="size-4" />
        </button>
      </div>
    </div>
  );
}
