import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

import type { textareaVariants } from "./textarea.variants";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}
