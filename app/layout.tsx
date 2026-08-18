import type { Metadata, Viewport } from "next";
import { site } from "@/lib/config";
import { AppProvider } from "@/context/app-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.homepage),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  icons: { icon: site.favicon },
  openGraph: {
    title: site.title,
    description: site.description,
    images: ["/media/bg/sosuke.webp"]
  }
};

export const viewport: Viewport = {
  themeColor: "#00FFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&family=Nunito:wght@400;700&family=Rowdies:wght@400;700&family=Sriracha&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
