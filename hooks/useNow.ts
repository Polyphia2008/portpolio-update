"use client";

import { useEffect, useState } from "react";

export function useNow(withSeconds = true) {
  const [value, setValue] = useState("00:00");

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setValue(withSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`);
    };
    format();
    const id = window.setInterval(format, 1000);
    return () => window.clearInterval(id);
  }, [withSeconds]);

  return value;
}
