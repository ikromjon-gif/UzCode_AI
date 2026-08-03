"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { modalBodyBase } from "./modal.styles";
import type { ModalProps } from "./modal.types";

/**
 * UzCode AI — Modal
 * Thin composed wrapper around Dialog providing a pre-built
 * header/body/footer slot API for the common "title + content +
 * actions" case. Reuses Dialog's Radix logic entirely — no
 * duplicated overlay/focus-trap/portal implementation (see
 * components/ui/CONVENTIONS.md).
 */
export function Modal({ open, onOpenChange, title, description, footer, size, children }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <div className={modalBodyBase}>{children}</div>
        {footer ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
}
