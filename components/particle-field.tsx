"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  s: number;
  r: number;
  vx: number;
  vy: number;
  vr: number;
};

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    let stop = 0;
    const petals: Petal[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const spawn = (): Petal => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: 6 + Math.random() * 8,
      r: Math.random() * Math.PI,
      vx: -0.6 + Math.random() * 0.4,
      vy: 0.6 + Math.random() * 0.8,
      vr: 0.01 + Math.random() * 0.02
    });
    resize();
    for (let i = 0; i < 18; i += 1) {
      petals.push(spawn());
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        if (p.x < -20 || p.y > canvas.height + 20) {
          p.x = Math.random() * canvas.width;
          p.y = -10;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = "rgba(255, 182, 193, 0.85)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      stop = requestAnimationFrame(draw);
    };
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(stop);
        return;
      }
      stop = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    stop = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(stop);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[8]" />;
}
