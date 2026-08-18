"use client";

import { useEffect, useRef } from "react";

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export function MagicText({ children, stars = 3 }: { children: React.ReactNode; stars?: number }) {
  const host = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root) {
      return;
    }
    const nodes = Array.from(root.querySelectorAll<HTMLSpanElement>(".magic-star"));
    const timers: number[] = [];
    const move = (node: HTMLSpanElement) => {
      node.style.setProperty("--star-left", `${rand(-10, 100)}%`);
      node.style.setProperty("--star-top", `${rand(-40, 80)}%`);
      node.style.animation = "none";
      void node.offsetHeight;
      node.style.animation = "";
    };
    nodes.forEach((node, index) => {
      timers.push(
        window.setTimeout(() => {
          move(node);
          timers.push(window.setInterval(() => move(node), 1000));
        }, index * (1000 / 3))
      );
    });
    return () => {
      timers.forEach((id) => {
        window.clearTimeout(id);
        window.clearInterval(id);
      });
    };
  }, []);

  return (
    <span className="magic" ref={host}>
      {Array.from({ length: stars }).map((_, index) => (
        <span className="magic-star" key={index}>
          <svg viewBox="0 0 512 512">
            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.72l-171.3 46.62-46.63 171.2C272.7 507.6 263.2 512 251.8 512s-20.84-4.406-23.7-15.45l-46.63-171.2-171.3-46.62C-.8865 275.1 0 266.5 0 255.1c0-11.34 7.406-20.83 18.44-23.7l171.3-46.63 46.63-171.3C239.2 3.406 248.7 0 260.1 0s20.84 3.406 23.7 14.45l46.63 171.3 171.3 46.63C504.6 235.1 512 244.6 512 255.1z" />
          </svg>
        </span>
      ))}
      <span className="magic-text">{children}</span>
    </span>
  );
}
