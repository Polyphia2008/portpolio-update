import Link from "next/link";
import { site } from "@/lib/config";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#101924] text-white">
      <div className="text-center">
        <p className="font-[family-name:var(--font-display)] text-6xl">404</p>
        <p className="mt-3 text-sm opacity-70">{site.namesite}</p>
        <Link href="/" className="mt-6 inline-block rounded-full border border-white/30 px-4 py-2 text-sm">
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
