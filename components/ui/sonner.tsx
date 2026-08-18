"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-center"
      closeButton
      duration={3000}
      gap={8}
      visibleToasts={2}
      offset={72}
      mobileOffset={78}
      toastOptions={{
        duration: 3000,
        dismissible: true,
        classNames: {
          toast: "version-toast font-[family-name:var(--font-display)]",
          closeButton: "td-toast-x"
        }
      }}
      {...props}
    />
  );
}

export { Toaster };
