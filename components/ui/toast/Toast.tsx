"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { toastVariants } from "./toast.variants";
import { toastViewportBase, toastActionBase, toastCloseBase } from "./toast.styles";
import type { ToastProps, ToastActionProps } from "./toast.types";

/**
 * UzCode AI — Toast (presentational primitives only)
 * Built on Radix Toast: swipe-to-dismiss, pause-on-hover/focus, and
 * a polite live region so announcements don't interrupt screen readers.
 *
 * Sprint 3 scope is intentionally limited to the primitives below —
 * the imperative `toast()` trigger + queue/state management is
 * application logic, not a reusable UI component, and belongs in a
 * later sprint's Zustand store rather than here (per "do not create
 * business logic").
 */
export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport ref={ref} className={cn(toastViewportBase, className)} {...props} />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
  ),
);
Toast.displayName = ToastPrimitive.Root.displayName;

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-sm font-medium", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export const ToastAction = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Action>, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Action ref={ref} className={cn(toastActionBase, className)} {...props} />
  ),
);
ToastAction.displayName = ToastPrimitive.Action.displayName;

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close ref={ref} className={cn(toastCloseBase, className)} aria-label="Dismiss" {...props}>
    <X className="h-4 w-4" aria-hidden="true" />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;
