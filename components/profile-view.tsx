"use client";

import { useState } from "react";
import { site, socials } from "@/lib/config";
import { useTypedText } from "@/hooks/useTypedText";
import { SkillCube } from "@/components/skill-cube";
import { MagicText } from "@/components/magic-text";

export function ProfileView() {
  const { text } = useTypedText(site.userName);
  const layers = [site.trigger, ...site.bios];
  const [step, setStep] = useState(0);

  return (
    <section className="td-content mx-auto mt-[6.8rem] max-w-5xl md:mt-[8.5rem]">
      <div className="about-me flex items-center justify-center gap-4">
        <div className="info-left hidden flex-col justify-around gap-6 md:flex">
          {site.bios.slice(0, 3).map((item) => (
            <span key={item} className="td-tag">
              {item}
            </span>
          ))}
        </div>
        <div className="td-avatar-wrap">
          <img src={site.avatar} alt={site.namesite} className="face" />
          <img src="/media/crown/vip.png" alt="" className="td-crown" />
        </div>
        <div className="info-right hidden flex-col justify-around gap-6 md:flex">
          {site.bios.slice(3).map((item) => (
            <span key={item} className="td-tag">
              {item}
            </span>
          ))}
        </div>
      </div>
      <h2 className="td-name">
        <MagicText>{text}</MagicText>
        <img src="/media/anime/tich-xanh.png" alt="" className="td-tick" />
        <span className="td-caret" />
      </h2>
      <div className="about-me-2">
        {layers.map((item, index) => (
          <button
            key={item}
            type="button"
            className="td-trigger"
            data-active={index === step ? "1" : "0"}
            aria-hidden={index === step ? undefined : true}
            tabIndex={index === step ? 0 : -1}
            onClick={() => setStep((prev) => (prev + 1) % layers.length)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="td-rule mt-8">
        {socials.map((item) => (
          <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="td-social" aria-label={item.label}>
            <span className="size-6 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.icon})` }} />
          </a>
        ))}
      </div>
      <SkillCube />
      <div className="h-24" />
    </section>
  );
}
