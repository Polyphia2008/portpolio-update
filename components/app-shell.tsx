"use client";

import { site } from "@/lib/config";
import { useNow } from "@/hooks/useNow";
import { useApp } from "@/context/app-context";
import { Loader } from "@/components/loader";
import { LockScreen } from "@/components/lock-screen";
import { SiteHeader } from "@/components/site-header";
import { ProfileView } from "@/components/profile-view";
import { LoveDays } from "@/components/love-days";
import { SettingsSheet } from "@/components/settings-sheet";
import { ShareDialog } from "@/components/share-dialog";
import { FpsMeter } from "@/components/fps-meter";
import { RunningCat } from "@/components/running-cat";
import { ParticleField } from "@/components/particle-field";
import { NowPlaying } from "@/components/now-playing";
import { DestroyLayer } from "@/components/destroy-layer";
import { Toaster } from "@/components/ui/sonner";

export function AppShell() {
  const { loveMode } = useApp();
  const clock = useNow(true);

  return (
    <>
      <Loader />
      <LockScreen />
      <ParticleField />
      <main className="td-shell relative z-10">
        <SiteHeader />
        {loveMode ? <LoveDays /> : <ProfileView />}
      </main>
      <footer className="td-hide-mobile pointer-events-none fixed bottom-0 left-0 z-20 w-full py-4 text-center">
        <a href={site.homepage} target="_blank" rel="noreferrer" className="pointer-events-auto text-[15px] font-bold text-white">
          {site.copyright}
        </a>
      </footer>
      <div className="td-hide-mobile pointer-events-none fixed right-4 bottom-2 z-20 font-[family-name:var(--font-display)] text-[2rem] text-white">{clock}</div>
      <FpsMeter />
      <RunningCat />
      <NowPlaying />
      <SettingsSheet />
      <ShareDialog />
      <DestroyLayer />
      <Toaster />
    </>
  );
}
