"use client";

import { useEffect, useState } from "react";
import { Facebook, Send } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/lib/config";
import { useApp } from "@/context/app-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ShareDialog() {
  const { shareOpen, setShareOpen } = useApp();
  const [href, setHref] = useState(site.homepage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHref(window.location.href);
    }
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      toast.success("Đã sao chép liên kết");
    } catch {
      toast.error("Không thể sao chép liên kết.");
    }
  };

  return (
    <Dialog open={shareOpen} onOpenChange={setShareOpen}>
      <DialogContent>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex-1 text-center">
            <DialogHeader>
              <DialogTitle className="[text-shadow:1px_2px_1px_rgb(52_73_94_/_20%)]">Chia Sẽ Đến Mọi Người</DialogTitle>
            </DialogHeader>
            <button type="button" onClick={copy} className="mt-2 max-w-[15rem] truncate text-[0.9rem] text-[rgb(52_73_94_/_60%)]">
              {href}
            </button>
            <div className="mt-3 flex justify-center gap-3">
              <a className="text-[#3C8AFF]" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(href)}`} target="_blank" rel="noreferrer">
                <Facebook className="size-6" />
              </a>
              <a className="text-[#00A0DC]" href={site.messenger} target="_blank" rel="noreferrer">
                <Send className="size-6" />
              </a>
              <a className="text-[#03A5F0]" href={`https://t.me/share/url?url=${encodeURIComponent(href)}`} target="_blank" rel="noreferrer">
                <Send className="size-6 rotate-[-12deg]" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <div className="pb-2 text-sm text-[#009d0a]">Quét Mã</div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(href)}`}
              alt="qr"
              className="size-32 rounded-[0.9rem] bg-white p-1 shadow-[0_7px_15px_0_#a48fff30]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
