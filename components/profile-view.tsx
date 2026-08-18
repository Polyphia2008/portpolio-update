"use client";

import { site, socials } from "@/lib/config";
import { useTypedText } from "@/hooks/useTypedText";

export function ProfileView() {
  const { text } = useTypedText(site.userName);

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
        <span>{text}</span>
        <span className="td-caret" />
      </h2>
      <div className="mt-3 flex justify-center md:hidden">
        <span className="td-trigger">{site.trigger}</span>
      </div>
      <div className="td-rule mt-8">
        {socials.map((item) => (
          <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="td-social" aria-label={item.label}>
            <span className="size-6 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.icon})` }} />
          </a>
        ))}
      </div>
    </section>
  );
}
