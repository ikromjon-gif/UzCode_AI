"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { drawerContentVariants } from "./drawer.variants";
import { drawerHandleBase } from "./drawer.styles";
import type { DrawerContentProps } from "./drawer.types";

/**
 * UzCode AI — Drawer
 * Bottom-panel overlay (mobile-oriented). Same Radix Dialog primitive
 * as Dialog/Modal/Sheet, different slide-direction styling — see
 * components/ui/CONVENTIONS.md. Distinguished from Sheet by
 * direction/use-case only, not by a different underlying dependency
 * (e.g. `vaul`), keeping the overlay dependency surface to one library.
 */
export const Drawer = Dialog;
export const DrawerTrigger = DialogTrigger;

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={cn(drawerContentVariants(), className)} {...props}>
      <div className={drawerHandleBase} aria-hidden="true" />
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DrawerContent.displayName = "DrawerContent";

export const DrawerTitle = DialogTitle;
export const DrawerDescription = DialogDescription;
