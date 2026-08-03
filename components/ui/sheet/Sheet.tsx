"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { sheetContentVariants } from "./sheet.variants";
import { sheetCloseBase } from "./sheet.styles";
import type { SheetContentProps } from "./sheet.types";

/**
 * UzCode AI — Sheet
 * Side-panel overlay. Composes the same Radix Dialog primitive as
 * Dialog/Modal (portal, focus trap, Escape-to-close) with different
 * positioning/slide-direction styling instead of DialogContent's
 * centered layout — see components/ui/CONVENTIONS.md.
 */
export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, side, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(sheetContentVariants({ side }), className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className={sheetCloseBase} aria-label="Close panel">
        <X className="h-4 w-4" aria-hidden="true" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
SheetContent.displayName = "SheetContent";

export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;
