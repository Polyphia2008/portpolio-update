"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "motion/react";
import { skills, skillTitle } from "@/lib/config";

const faces = [
  { key: "front", cells: [0, 1, 2, 3] },
  { key: "right", cells: [4, 5, 6, 7] },
  { key: "back", cells: [8, 9, 10, 11] },
  { key: "left", cells: [0, 4, 8, 1] },
  { key: "top", cells: [2, 6, 10, 5] },
  { key: "bottom", cells: [3, 7, 11, 9] }
];

export function SkillCube() {
  const rx = useMotionValue(-22);
  const ry = useMotionValue(-32);
  const shellRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);
  const idleRef = useRef<ReturnType<typeof animate> | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const stopIdle = useCallback(() => {
    if (idleRef.current) {
      idleRef.current.stop();
      idleRef.current = null;
    }
  }, []);

  const startIdle = useCallback(() => {
    stopIdle();
    idleRef.current = animate(ry, ry.get() + 360, {
      duration: 26,
      ease: "linear",
      repeat: Infinity
    });
  }, [ry, stopIdle]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const apply = () => {
      shell.style.transform = `rotateX(${rx.get()}deg) rotateY(${ry.get()}deg)`;
    };
    apply();
    const unRx = rx.on("change", apply);
    const unRy = ry.on("change", apply);
    startIdle();

    return () => {
      unRx();
      unRy();
      stopIdle();
    };
  }, [rx, ry, startIdle, stopIdle]);

  const onDown = (event: React.PointerEvent) => {
    stopIdle();
    setDragging(true);
    dragRef.current = { x: event.clientX, y: event.clientY, rx: rx.get(), ry: ry.get() };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onMove = (event: React.PointerEvent) => {
    const start = dragRef.current;
    if (!start) {
      return;
    }
    ry.set(start.ry + (event.clientX - start.x) * 0.55);
    rx.set(Math.max(-78, Math.min(78, start.rx - (event.clientY - start.y) * 0.55)));
  };

  const onUp = (event: React.PointerEvent) => {
    const start = dragRef.current;
    dragRef.current = null;
    setDragging(false);
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    if (start) {
      const moved = Math.abs(event.clientX - start.x) + Math.abs(event.clientY - start.y);
      if (moved < 6) {
        animate(ry, ry.get() + 90, { type: "spring", stiffness: 120, damping: 14, onComplete: startIdle });
        return;
      }
    }
    startIdle();
  };

  return (
    <section className="td-skills" aria-label="Skill Language">
      <h3 className="td-skills-title">
        <span>{skillTitle}</span>
      </h3>
      <div
        className={dragging ? "td-cube-stage is-dragging" : "td-cube-stage"}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="td-cube" ref={shellRef}>
          {faces.map((face) => (
            <div key={face.key} className={`td-cube-face td-face-${face.key}`}>
              {face.cells.map((index) => {
                const skill = skills[index % skills.length];
                return (
                  <button
                    key={`${face.key}-${skill.slug}`}
                    type="button"
                    className="td-cube-cell"
                    data-on={active === skill.name ? "1" : "0"}
                    style={{ ["--cell-color" as string]: skill.color }}
                    onClick={() => setActive((prev) => (prev === skill.name ? null : skill.name))}
                    aria-label={skill.name}
                  >
                    <img src={`/media/skills/${skill.slug}.svg`} alt="" draggable={false} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="td-skills-label">{active ?? "Kéo để xoay khối · chạm ô để xem tên"}</p>
    </section>
  );
}
