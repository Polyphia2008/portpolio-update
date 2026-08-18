"use client";

import { Settings } from "lucide-react";
import { backgrounds, songs } from "@/lib/config";
import { useApp } from "@/context/app-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function SettingsSheet() {
  const { settingsOpen, setSettingsOpen, background, setBackground, songIndex, playSong, destroy, setDestroy, skin, toggleSkin } = useApp();

  return (
    <>
      <button
        type="button"
        className="fixed top-1/2 right-0 z-40 grid size-8 -translate-y-1/2 place-items-center rounded-l-md border-[3px] border-r-0 border-white bg-white shadow-[-2px_0_24px_-2px_rgba(43,55,72,.15)] dark:border-[#101924] dark:bg-[#101924]"
        onClick={() => setSettingsOpen(true)}
        aria-label="settings"
      >
        <Settings className="gear-spin size-[18px] text-[#8797ee]" />
      </button>
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ws Settings</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100dvh-52px)]">
            <section className="border-b border-border px-6 py-6">
              <h3 className="mb-3 text-[11px] font-medium tracking-[2px] text-[#8094ae] uppercase">Nền BackGround</h3>
              <div className="grid grid-cols-4 gap-2">
                {backgrounds.map((item) => (
                  <button key={item.id} type="button" className="text-center" onClick={() => setBackground(item.src)}>
                    <span className={cn("block overflow-hidden rounded-md border-2", background === item.src ? "border-[#6576ff]" : "border-transparent")}>
                      <img src={item.preview} alt={item.name} className="h-12 w-full object-cover" />
                    </span>
                    <span className="mt-1 block text-[12px]">{item.name}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="border-b border-border px-6 py-6">
              <h3 className="mb-3 text-[11px] font-medium tracking-[2px] text-[#8094ae] uppercase">Danh Sách Nhạc</h3>
              <ul className="max-h-[310px] overflow-y-auto">
                {songs.map((song, index) => (
                  <li key={song.url}>
                    <button
                      type="button"
                      onClick={() => playSong(index)}
                      className={cn(
                        "flex w-full items-center justify-between border-t border-dashed px-2 py-4 text-left transition hover:bg-[rgb(52_73_94_/_5%)]",
                        songIndex === index ? "bg-[rgba(108,110,112,.151)] text-[#008d8d]" : ""
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <img src={song.avatar} alt="" className="size-8 rounded-md object-cover" />
                        <span className="line-clamp-2 max-w-[10rem] text-[0.8rem]">{songIndex === index ? "Đang phát..." : song.title}</span>
                      </span>
                      <span className="max-w-[6rem] text-right text-[0.71rem] text-[rgb(52_73_94_/_40%)] dark:text-[rgb(232_243_255_/_61%)]">{song.author}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
            <section className="border-b border-border px-6 py-6">
              <h3 className="mb-3 text-[11px] font-medium tracking-[2px] text-[#8094ae] uppercase">Giao Diện Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => skin === "dark" && toggleSkin()} className="text-center">
                  <span className={cn("mx-auto block h-10 w-16 rounded-md border bg-[#f5f6fa]", skin === "light" ? "border-[#6576ff]" : "border-transparent")} />
                  <span className="mt-1 block text-[12px]">Màu Trắng</span>
                </button>
                <button type="button" onClick={() => skin === "light" && toggleSkin()} className="text-center">
                  <span className={cn("mx-auto block h-10 w-16 rounded-md border bg-[#101924]", skin === "dark" ? "border-[#6576ff]" : "border-transparent")} />
                  <span className="mt-1 block text-[12px]">Màu Tối</span>
                </button>
              </div>
            </section>
            <section className="px-6 py-6">
              <h3 className="mb-3 text-[11px] font-medium tracking-[2px] text-[#8094ae] uppercase">Chế Độ Destroy</h3>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setDestroy(false)} className="text-center">
                  <span className={cn("mx-auto block h-10 w-16 rounded-md bg-[#e85347]", !destroy ? "ring-2 ring-[#6576ff]" : "")} />
                  <span className="mt-1 block text-[12px]">Vô Hiệu Hoá</span>
                </button>
                <button type="button" onClick={() => setDestroy(true)} className="text-center">
                  <span className={cn("mx-auto block h-10 w-16 rounded-md bg-[#1ee0ac]", destroy ? "ring-2 ring-[#6576ff]" : "")} />
                  <span className="mt-1 block text-[12px]">Kích Hoạt</span>
                </button>
              </div>
            </section>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
