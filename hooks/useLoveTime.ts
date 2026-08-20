"use client";

import { useEffect, useState } from "react";

type LoveClock = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function useLoveTime(startedAt: string): LoveClock {
  const [clock, setClock] = useState<LoveClock>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const parts = startedAt.split(/[-/:.]/);
    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);
    const start = new Date(year, month, day).getTime();

    const tick = () => {
      const gap = Date.now() - start;
      const seconds = Math.floor((gap / 1000) % 60);
      const minutes = Math.floor((gap / 1000 / 60) % 60);
      const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
      const days = Math.floor(gap / (1000 * 60 * 60 * 24));
      setClock({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds)
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  return clock;
}
