"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { dialogContentVariants } from "./dialog.variants";
import {
  dialogOverlayBase,
  dialogCloseBase,
  dialogHeaderBase,
  dialogFooterBase,
  dialogTitleBase,
  dialogDescriptionBase,
} from "./dialog.styles";
import type { DialogContentProps } from "./dialog.types";

/**
 * UzCode AI — Dialog
 * Built on Radix Dialog: focus trap, Escape-to-close, focus restore
 * on close, and correct aria-modal/labelledby/describedby wiring —
 * all handled by the primitive rather than reimplemented here.
 *
 * This is the base primitive that Modal, Sheet, and Drawer all
 * compose (see components/ui/CONVENTIONS.md).
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(dialogOverlayBase, className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size, hideCloseButton = false, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close className={dialogCloseBase} aria-label="Close dialog">
          <X className="h-4 w-4" aria-hidden="true" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(dialogHeaderBase, className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(dialogFooterBase, className)} {...props} />;
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn(dialogTitleBase, className)} {...props} />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn(dialogDescriptionBase, className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
