"use client";

import { useEffect, useState } from "react";

const pool = ["/media/anime/cb-1.png", "/media/anime/cb-2.png", "/media/anime/cb-3.png", "/media/anime/cb-4.png"];

export function AnimeMascot() {
  const [src, setSrc] = useState(pool[0]);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setSrc(pool[Math.floor(Math.random() * pool.length)]);
    const id = window.setTimeout(() => setShown(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="thanhdieu-elements" aria-hidden="true">
      <img src={src} alt="" className={shown ? "anime-cb is-in" : "anime-cb"} draggable={false} />
    </div>
  );
}
