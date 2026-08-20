"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root className={cn("relative flex w-full touch-none items-center select-none", className)} {...props}>
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-black/10 dark:bg-white/15">
        <SliderPrimitive.Range className="absolute h-full bg-[#425aef]" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-3.5 rounded-full border border-white bg-[#425aef] shadow" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
