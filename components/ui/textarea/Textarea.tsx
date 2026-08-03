import * as React from "react";

import { cn } from "@/lib/utils";

import { textareaVariants } from "./textarea.variants";
import type { TextareaProps } from "./textarea.types";

/** UzCode AI — Textarea. Multi-line text input, vertically resizable. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(textareaVariants({ invalid }), className)}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
