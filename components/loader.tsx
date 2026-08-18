"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/config";
import { wsToast, wsToastClose } from "@/components/ws-toast";

const hints = [
  { at: 0, text: "Đang tải tài nguyên..." },
  { at: 5000, text: "Đang tải các plugins..." },
  { at: 12000, text: "Chờ xíu sắp tải xong...." },
  { at: 20000, text: "Có thể mất nhiều thời gian" }
];

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const hintTimers: number[] = [];
    const flowTimers: number[] = [];

    hints.forEach((item) => {
      hintTimers.push(
        window.setTimeout(() => {
          if (loadedRef.current) {
            return;
          }
          wsToast(item.text, 4000, true);
        }, item.at)
      );
    });

    const tick = window.setInterval(() => {
      setProgress((prev) => Math.min(100, prev + Math.random() * 11 + 4));
    }, 120);

    const done = () => {
      if (loadedRef.current) {
        return;
      }
      loadedRef.current = true;
      hintTimers.forEach((id) => window.clearTimeout(id));
      hintTimers.length = 0;
      window.clearInterval(tick);
      setProgress(100);
      wsToastClose();
      flowTimers.push(
        window.setTimeout(() => {
          setHiding(true);
          flowTimers.push(window.setTimeout(() => setVisible(false), 450));
          flowTimers.push(window.setTimeout(() => wsToast(site.version, 5000), 620));
        }, 260)
      );
    };

    if (document.readyState === "complete") {
      flowTimers.push(window.setTimeout(done, 900));
    } else {
      window.addEventListener("load", done, { once: true });
      flowTimers.push(window.setTimeout(done, 2200));
    }

    return () => {
      hintTimers.forEach((id) => window.clearTimeout(id));
      flowTimers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(tick);
      window.removeEventListener("load", done);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-[70] flex items-center justify-center bg-[#f4f6fb] transition-opacity duration-500 dark:bg-[#101924] ${hiding ? "opacity-0" : "opacity-100"}`}>
      <div className="pace-bar">
        <span style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="relative">
        <img src={site.avatar} alt="" className="loader-face mx-auto size-[100px] rounded-full border-4 border-[#f0f0f2] object-cover" />
        <span className="absolute top-1/2 left-1/2 size-[30px] -translate-y-[-8px] translate-x-[10px] rounded-full border-[6px] border-white bg-[#6bdf8f]" />
        <p className="mt-8 text-center text-sm text-[#355192] dark:text-[#b6c6e3]">
          「 {Math.min(100, Math.round(progress))}% 」
        </p>
      </div>
    </div>
  );
}
