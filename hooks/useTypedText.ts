"use client";

import { useEffect, useState } from "react";

export function useTypedText(lines: string[], speed = 58, hold = 1400) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let line = 0;
    let index = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = lines[line] ?? "";
      if (!deleting) {
        index += 1;
        setText(current.slice(0, index));
        setDone(false);
        if (index >= current.length) {
          deleting = true;
          setDone(true);
          timer = window.setTimeout(tick, hold);
          return;
        }
        timer = window.setTimeout(tick, speed);
        return;
      }
      index -= 1;
      setText(current.slice(0, index));
      setDone(false);
      if (index <= 0) {
        deleting = false;
        line = (line + 1) % lines.length;
        timer = window.setTimeout(tick, 280);
        return;
      }
      timer = window.setTimeout(tick, 28);
    };

    timer = window.setTimeout(tick, 240);
    return () => window.clearTimeout(timer);
  }, [hold, lines, speed]);

  return { text, done };
}
