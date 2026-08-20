"use client";

import { useEffect, useState } from "react";

type FpsState = {
  fps: number;
  label: string;
  color: string;
};

function rank(fps: number): Omit<FpsState, "fps"> {
  if (fps >= 120) return { label: "Máy Khoẻ😛", color: "#00c78f" };
  if (fps <= 5) return { label: "Lag Nổ Máy🤢", color: "#c70000" };
  if (fps <= 10) return { label: "Siêu Lag😭", color: "red" };
  if (fps <= 15) return { label: "Quá Lag😖", color: "red" };
  if (fps <= 25) return { label: "Khó Chịu😨", color: "orange" };
  if (fps < 35) return { label: "Không Mượt Lắm🙄", color: "#9338e6" };
  if (fps <= 45) return { label: "Tạm Ổn😧", color: "#f51698" };
  if (fps <= 55) return { label: "Ổn Định😁", color: "#068c18" };
  if (fps >= 80) return { label: "Mượt Quá😘", color: "#c70000" };
  return { label: "Bình Thường😂", color: "#009e45" };
}

export function FpsMeter() {
  const [state, setState] = useState<FpsState>({ fps: 60, label: "Bình Thường😂", color: "#009e45" });

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      frames += 1;
      if (now - last >= 1000) {
        const fps = Math.round((frames * 1000) / (now - last));
        setState({ fps, ...rank(fps) });
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span className="fixed bottom-4 left-2.5 z-30 rounded bg-white/85 px-1 py-0.5 font-[family-name:var(--font-script)] text-sm">
      <span style={{ color: "#640366" }}>FPS:{state.fps} </span>
      <span style={{ color: state.color }}>{state.label}</span>
    </span>
  );
}
