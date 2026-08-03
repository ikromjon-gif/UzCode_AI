import type * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { avatarVariants } from "./avatar.variants";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** Shown while the image loads or if it fails — usually initials. */
  fallback?: string;
}
