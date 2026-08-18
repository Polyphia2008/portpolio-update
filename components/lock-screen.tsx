"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronDown } from "lucide-react";
import { lockQuotes, site } from "@/lib/config";
import { useNow } from "@/hooks/useNow";
import { useApp } from "@/context/app-context";

export function LockScreen() {
  const { lockOpen, setLockOpen } = useApp();
  const clock = useNow(false);
  const [quote, setQuote] = useState(lockQuotes[0]);
  const startY = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setQuote(lockQuotes[Math.floor(Math.random() * lockQuotes.length)]);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onVisible = () => {
      if (!document.hidden && window.scrollY === 0) {
        setLockOpen(true);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [setLockOpen]);

  return (
    <section
      className={`fixed inset-0 z-[60] overflow-hidden bg-[#101924] transition-all duration-500 ${lockOpen ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-16 opacity-0"}`}
      onClick={() => setLockOpen(false)}
      onTouchStart={(e: TouchEvent<HTMLElement>) => {
        startY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e: TouchEvent<HTMLElement>) => {
        if (startY.current !== null && startY.current - e.changedTouches[0].clientY > 48) {
          setLockOpen(false);
        }
        startY.current = null;
      }}
    >
      <video className="absolute inset-0 size-full object-cover brightness-[.8]" src={site.lockVideo} autoPlay loop muted playsInline />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <img src={site.lockLogo} alt="" className="lock-logo size-32 rounded-full bg-[rgb(32_53_104_/_90%)] object-cover shadow-[0_0_15px_#d3d3d3ad]" />
        <h1 className="mt-6 font-[family-name:var(--font-script)] text-[2rem] text-white [text-shadow:1px_1px_8px_rgb(32_53_104_/_90%)]">
          𝑻𝒉𝒂𝒏𝒉𝑫𝒊𝒆𝒖
        </h1>
        <p className="max-w-[36rem] px-6 pt-4 text-base text-white [text-shadow:1px_1px_8px_rgb(32_53_104_/_90%)]">{quote}</p>
      </div>
      <div className="pointer-events-none absolute right-4 bottom-4 font-[family-name:var(--font-display)] text-5xl text-white">{clock}</div>
      <ChevronDown className="lock-arrow pointer-events-none absolute bottom-5 left-1/2 size-6 text-white" />
    </section>
  );
}
