
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center",
      orientation === "vertical" 
        ? "h-full w-2 flex-col justify-center" 
        : "w-full justify-center",
      className
    )}
    {...props}
    orientation={orientation}
  >
    <SliderPrimitive.Track 
      className={cn(
        "relative overflow-hidden rounded-full border border-gray-600",
        orientation === "vertical"
          ? "h-full w-2 grow bg-gray-700" 
          : "h-2 w-full grow bg-gray-700"
      )}
    >
      <SliderPrimitive.Range 
        className={cn(
          "absolute bg-purple-light",
          orientation === "vertical" ? "w-full" : "h-full"
        )} 
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-purple-light bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 purple-glow" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
