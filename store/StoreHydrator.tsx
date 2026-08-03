"use client";

import * as React from "react";

import { useUiStore } from "./ui-store";

/**
 * UzCode AI — StoreHydrator
 * Manually triggers zustand persist's rehydration exactly once,
 * after mount — pairs with ui-store's `skipHydration: true`. This
 * guarantees the first client render matches the server-rendered
 * default state (no hydration mismatch), then updates to the
 * persisted value immediately after. Renders nothing.
 */
export function StoreHydrator() {
  React.useEffect(() => {
    useUiStore.persist.rehydrate();
  }, []);

  return null;
}
