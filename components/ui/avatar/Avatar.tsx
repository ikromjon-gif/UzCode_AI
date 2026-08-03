"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

import { avatarVariants } from "./avatar.variants";
import { avatarFallbackBase } from "./avatar.styles";
import type { AvatarProps } from "./avatar.types";

/**
 * UzCode AI — Avatar
 * Built on Radix Avatar so the fallback only renders after a real
 * image-load failure/timeout, not on every render (avoids a fallback
 * flash before the image has had a chance to load).
 */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
    {src ? <AvatarPrimitive.Image src={src} alt={alt ?? ""} className="h-full w-full object-cover" /> : null}
    <AvatarPrimitive.Fallback className={avatarFallbackBase} delayMs={src ? 600 : 0}>
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
