"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

import { tabsListVariants, tabsTriggerVariants, tabsContentVariants } from "./tabs.variants";
import type { TabsListProps, TabsTriggerProps, TabsContentProps } from "./tabs.types";

/**
 * UzCode AI — Tabs
 * Built on Radix Tabs for roving-tabindex arrow-key navigation
 * between triggers and correct tabpanel/tab ARIA wiring.
 */
export const Tabs = TabsPrimitive.Root;

export const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List ref={ref} className={cn(tabsListVariants(), className)} {...props} />
  ),
);
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn(tabsTriggerVariants(), className)} {...props} />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn(tabsContentVariants(), className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
