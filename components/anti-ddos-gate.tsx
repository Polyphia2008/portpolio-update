"use client";

import { useEffect, useState } from "react";
import { readPass, writePass } from "@/lib/storage";

const KEY = "antiddoos";
const HOLD = 5000;
const mascots = ["/media/anime/cb-1.png", "/media/anime/cb-2.png", "/media/anime/cb-3.png", "/media/anime/cb-4.png"];

export function AntiDdosGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "check" | "out" | "pass">("idle");
  const [mascot, setMascot] = useState(mascots[0]);

  useEffect(() => {
    if (readPass(KEY)) {
      setPhase("pass");
      return;
    }
    setMascot(mascots[Math.floor(Math.random() * mascots.length)]);
    setPhase("check");
    const leave = window.setTimeout(() => {
      writePass(KEY, 45);
      setPhase("out");
    }, HOLD);
    const done = window.setTimeout(() => setPhase("pass"), HOLD + 520);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "pass") {
    return <>{children}</>;
  }

  if (phase === "idle") {
    return null;
  }

  return (
    <section className={phase === "out" ? "td-gate is-out" : "td-gate"} aria-live="polite">
      <div className="td-gate-box">
        <img className="td-gate-blob" src="/media/antiddoos/logo.png" alt="ThanhDieu" draggable={false} />
        <h1>ANTI DDOS — SECURITY CHECK</h1>
        <p>
          You won&apos;t see the form anymore.
          <br />
          We only check browser-based protections.
        </p>
        <strong>
          power by{" "}
          <a href="https://thanhdieu.com" target="_blank" rel="noreferrer">
            thanhdieu.com
          </a>
        </strong>
      </div>
      <div className="td-gate-box td-gate-wait">
        <h2>- Waiting Security -</h2>
        <div className="pulse-container">
          <div className="pulse-bubble pulse-bubble-1" />
          <div className="pulse-bubble pulse-bubble-2" />
          <div className="pulse-bubble pulse-bubble-3" />
        </div>
      </div>
      <img className="td-gate-mascot" src={mascot} alt="" aria-hidden="true" draggable={false} />
    </section>
  );
}
