import { cva } from "class-variance-authority";

import { emptyStateBase } from "./empty-state.styles";

export const emptyStateVariants = cva(emptyStateBase, { variants: {}, defaultVariants: {} });
