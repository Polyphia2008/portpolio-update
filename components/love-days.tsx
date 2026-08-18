"use client";

import { useEffect, useRef } from "react";
import { love } from "@/lib/config";
import { useLoveTime } from "@/hooks/useLoveTime";

export function LoveDays() {
  const clock = useLoveTime(love.startedAt);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = layer.current;
    if (!root) {
      return;
    }
    const style = document.createElement("style");
    style.textContent = "@keyframes fall{to{transform:translateY(110vh) translateX(10vw);opacity:.2}}";
    document.head.appendChild(style);
    const spawn = () => {
      const node = document.createElement("span");
      node.textContent = "❤";
      node.className = "pointer-events-none fixed z-10 text-xl text-[#ff5162]";
      node.style.left = `${Math.random() * 100}vw`;
      node.style.top = "-4vh";
      node.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`;
      root.appendChild(node);
      window.setTimeout(() => node.remove(), 5200);
    };
    const id = window.setInterval(spawn, 420);
    return () => {
      window.clearInterval(id);
      style.remove();
    };
  }, []);

  return (
    <section className="relative mx-auto mt-16 max-w-3xl pb-28 text-center">
      <div ref={layer} />
      <div className="font-[family-name:var(--font-love)] text-xl font-bold text-white md:text-2xl">
        <span className="text-4xl md:text-[2.4rem]">{clock.days}</span> Ngày{" "}
        <span className="text-4xl md:text-[2.4rem]">{clock.hours}</span> Giờ{" "}
        <span className="text-4xl md:text-[2.4rem]">{clock.minutes}</span> Phút{" "}
        <span className="text-4xl md:text-[2.4rem]">{clock.seconds}</span> Giây
      </div>
      <div className="mx-auto mt-10 flex max-w-[36rem] items-center justify-around rounded-[4rem] bg-white/12 px-6 py-10 backdrop-blur-[15px] md:px-16">
        <div className="relative">
          <img src={love.avatarMale} alt={love.nameMale} className="size-24 rounded-full border-[0.2rem] border-white object-cover shadow-[0_0_22px_#7b5c97] md:size-32" />
          <img src="/media/crown/frame.png" alt="" className="crown-love" />
          <span className="mt-4 block text-center text-lg font-bold text-white">{love.nameMale}</span>
        </div>
        <div className="heart mx-3" />
        <div className="relative">
          <img src={love.avatarFemale} alt={love.nameFemale} className="size-24 rounded-full border-[0.2rem] border-white object-cover shadow-[0_0_22px_#7b5c97] md:size-32" />
          <img src="/media/crown/frame.png" alt="" className="crown-love" />
          <span className="mt-4 block text-center text-lg font-bold text-white">{love.nameFemale}</span>
        </div>
      </div>
    </section>
  );
}
