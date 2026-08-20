const PREFIX = "tdv6.";

export function readStore(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    return;
  }
}

export function readPass(key: string): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  const name = PREFIX + key;
  const hit = document.cookie.split(";").some((part) => part.trim().startsWith(name + "="));
  if (hit) {
    return true;
  }
  try {
    const raw = window.sessionStorage.getItem(name);
    if (!raw) {
      return false;
    }
    return Number(raw) > Date.now();
  } catch {
    return false;
  }
}

export function writePass(key: string, minutes = 45): void {
  if (typeof document === "undefined") {
    return;
  }
  const name = PREFIX + key;
  const ttl = Math.max(1, minutes) * 60;
  document.cookie = `${name}=1; path=/; max-age=${ttl}; samesite=lax`;
  try {
    window.sessionStorage.setItem(name, String(Date.now() + ttl * 1000));
  } catch {
    return;
  }
}
