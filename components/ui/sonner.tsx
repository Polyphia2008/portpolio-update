"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        classNames: {
          toast: "version-toast font-[family-name:var(--font-display)]"
        }
      }}
      {...props}
    />
  );
}

export { Toaster };
