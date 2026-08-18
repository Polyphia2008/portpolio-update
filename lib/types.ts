export type ToastKind = "info" | "success" | "error" | "loading";

export type ToastItem = {
  id: string;
  kind: ToastKind;
  message: string;
};

export type ThemeSkin = "light" | "dark";

export type BackgroundItem = {
  id: string;
  name: string;
  src: string;
  preview: string;
};

export type SongItem = {
  url: string;
  avatar: string;
  title: string;
  author: string;
};

export type SocialItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};
