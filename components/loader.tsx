"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { site } from "@/lib/config";

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

  useEffect(() => {
    const started = Date.now();
    const timers = hints.map((item) =>
      window.setTimeout(() => {
        if (Date.now() - started < 1600) {
          return;
        }
        toast.loading(item.text);
      }, item.at)
    );
    const tick = window.setInterval(() => {
      setProgress((prev) => Math.min(100, prev + Math.random() * 11 + 4));
    }, 120);
    const done = () => {
      setProgress(100);
      window.setTimeout(() => {
        setHiding(true);
        toast.dismiss();
        toast.info("Tài nguyên đã tải xong :)");
        window.setTimeout(() => toast(site.version), 700);
        window.setTimeout(() => setVisible(false), 450);
      }, 280);
    };
    if (document.readyState === "complete") {
      window.setTimeout(done, 900);
    } else {
      window.addEventListener("load", done, { once: true });
      window.setTimeout(done, 2200);
    }
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(tick);
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
