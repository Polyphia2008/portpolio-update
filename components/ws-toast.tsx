"use client";

import { useEffect, useRef, useState } from "react";

type ToastPayload = {
  id: number;
  text: string;
  life: number;
  spin: boolean;
};

const listeners = new Set<(p: ToastPayload) => void>();
let seq = 0;

export function wsToast(text: string, life = 5000, spin = false) {
  seq += 1;
  const payload: ToastPayload = { id: seq, text, life, spin };
  listeners.forEach((fn) => fn(payload));
}

export function wsToastClose() {
  listeners.forEach((fn) => fn({ id: -1, text: "", life: 0, spin: false }));
}

export function WsToast() {
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const [leaving, setLeaving] = useState(false);
  const hideRef = useRef<number | null>(null);
  const dropRef = useRef<number | null>(null);

  useEffect(() => {
    const onToast = (payload: ToastPayload) => {
      if (hideRef.current) {
        window.clearTimeout(hideRef.current);
        hideRef.current = null;
      }
      if (dropRef.current) {
        window.clearTimeout(dropRef.current);
        dropRef.current = null;
      }
      if (payload.id === -1) {
        setToast(null);
        setLeaving(false);
        return;
      }
      setLeaving(false);
      setToast(payload);
      hideRef.current = window.setTimeout(() => {
        setLeaving(true);
        dropRef.current = window.setTimeout(() => {
          setToast(null);
          setLeaving(false);
        }, 450);
      }, Math.max(1200, payload.life - 450));
    };
    listeners.add(onToast);
    return () => {
      listeners.delete(onToast);
      if (hideRef.current) {
        window.clearTimeout(hideRef.current);
      }
      if (dropRef.current) {
        window.clearTimeout(dropRef.current);
      }
    };
  }, []);

  const close = () => {
    if (hideRef.current) {
      window.clearTimeout(hideRef.current);
      hideRef.current = null;
    }
    setLeaving(true);
    dropRef.current = window.setTimeout(() => {
      setToast(null);
      setLeaving(false);
    }, 450);
  };

  if (!toast) {
    return null;
  }

  return (
    <div
      id="Toast"
      role="status"
      key={toast.id}
      className={leaving ? "leave" : "show"}
      onClick={close}
      style={{ ["--ws-life" as string]: `${toast.life}ms` }}
    >
      {toast.spin ? <i className="ws-toast-spin" /> : null}
      <span className="ws-toast-text">{toast.text}</span>
      <button
        type="button"
        aria-label="Đóng"
        className="ws-toast-x"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
      >
        ✕
      </button>
      <i className="ws-toast-progress" />
    </div>
  );
}
