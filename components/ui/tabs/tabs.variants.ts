import { cva } from "class-variance-authority";

import { tabsListBase, tabsTriggerBase, tabsContentBase } from "./tabs.styles";

export const tabsListVariants = cva(tabsListBase, { variants: {}, defaultVariants: {} });
export const tabsTriggerVariants = cva(tabsTriggerBase, { variants: {}, defaultVariants: {} });
export const tabsContentVariants = cva(tabsContentBase, { variants: {}, defaultVariants: {} });
