"use client";

import { Heart, Home, Moon, Share2, Sun } from "lucide-react";
import { site } from "@/lib/config";
import { useApp } from "@/context/app-context";

export function SiteHeader() {
  const { loveMode, toggleLove, skin, toggleSkin, setShareOpen } = useApp();

  return (
    <header className="flex h-24 items-center justify-between">
      <a href={site.homepage} className="td-glass flex h-12 items-center rounded-[2em] px-4 font-[family-name:var(--font-display)] text-[14px] font-bold">
        {site.namesite}
      </a>
      <div className="flex items-center gap-2">
        <button type="button" className="td-glass grid size-12 place-items-center rounded-full" onClick={toggleLove} aria-label="loveday">
          {loveMode ? <Home className="size-4" /> : <Heart className="size-4" />}
        </button>
        <button type="button" className="td-glass grid size-12 place-items-center rounded-full" onClick={toggleSkin} aria-label="theme">
          {skin === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
        <button type="button" className="td-glass grid size-12 place-items-center rounded-full" onClick={() => setShareOpen(true)} aria-label="share">
          <Share2 className="size-4" />
        </button>
      </div>
    </header>
  );
}
