"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/app-context";

type Win = {
  id: number;
  x: number;
  y: number;
  code: string;
  title: number;
};

export function DestroyLayer() {
  const { destroy, setDestroy } = useApp();
  const [wins, setWins] = useState<Win[]>([]);

  useEffect(() => {
    if (!destroy) {
      setWins([]);
      return;
    }
    let n = 1;
    const spawn = () => {
      setWins((prev) => {
        if (prev.length >= 20) {
          return prev;
        }
        return [
          ...prev,
          {
            id: Date.now() + n,
            x: Math.random() * Math.max(40, window.innerWidth - 360),
            y: Math.random() * Math.max(40, window.innerHeight - 200),
            code: `0x00000${Math.floor(Math.random() * 99999)}`,
            title: n
          }
        ];
      });
      n += 1;
      if (n <= 20) {
        window.setTimeout(spawn, 80 + Math.random() * 140);
      }
    };
    spawn();
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 440;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      window.setTimeout(() => {
        osc.stop();
        ctx.close().catch(() => undefined);
      }, 180);
    } catch {
      return;
    }
  }, [destroy]);

  if (!destroy) {
    return null;
  }

  return (
    <>
      {wins.map((item) => (
        <div
          key={item.id}
          className="fixed z-[55] w-[260px] rounded border border-[#3a3a3a] bg-[#ece9d8] text-black shadow-lg"
          style={{ left: item.x, top: item.y }}
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0a246a] to-[#a6caf0] px-2 py-1 text-xs text-white">
            <span>Chế Độ Destroy {item.title}</span>
            <button type="button" onClick={() => setWins((prev) => prev.filter((w) => w.id !== item.id))}>
              ×
            </button>
          </div>
          <p className="px-3 py-4 text-sm">Error Code {item.code}</p>
        </div>
      ))}
      <button
        type="button"
        className="fixed bottom-24 left-1/2 z-[56] -translate-x-1/2 rounded bg-[#e85347] px-3 py-1 text-sm text-white"
        onClick={() => setDestroy(false)}
      >
        Tắt Destroy
      </button>
    </>
  );
}
