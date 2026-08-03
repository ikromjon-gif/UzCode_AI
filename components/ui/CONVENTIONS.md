# UI Component Conventions (Sprint 3)

Every component under `components/ui/<name>/` follows a five-file
structure:

```
components/ui/button/
  Button.tsx           Implementation — forwardRef, composes variants + styles
  button.types.ts        Prop contract (extends the relevant HTML/Radix props)
  button.variants.ts      cva() variant registry (variant/size/state → classes)
  button.styles.ts        Shared class fragments consumed by variants.ts
                          and/or Component.tsx (base layout, icon sizing maps,
                          focus-ring composition) — NOT itself a cva() call
  index.ts                Barrel — the only import path other code should use
```

`variants.ts` vs `styles.ts`: `variants.ts` is the declarative
variant→class mapping (what changes per prop). `styles.ts` is shared,
non-variant class fragments reused across the component (or across a
compound component's sub-parts, e.g. Card's Header/Content/Footer).
This keeps `cva()` calls focused and avoids repeating base classes.

## Token-only styling

No component references a raw hex color, px value, or ms duration.
Every class either:
- uses a Tailwind utility whose value was itself defined by a design
  token in `app/globals.css` (`bg-primary`, `rounded-button`,
  `shadow-card`, `text-sm`), or
- uses an arbitrary-value utility pointing at a CSS custom property
  (`z-[var(--z-modal)]`, `duration-[var(--duration-fast)]`) for token
  categories where relying on Tailwind's auto-generated utility name
  would be guessing at unconfirmed naming behavior.

## Composition, not inheritance

- **Radix UI primitives** back every component with real interaction
  logic (focus trap, portal, roving tabindex, keyboard nav): Checkbox,
  RadioGroup, Switch, Select, Avatar, Separator, Progress, Tabs,
  Dialog, Popover, Tooltip, DropdownMenu, Toast, ScrollArea.
- **Modal composes Dialog.** **Sheet and Drawer both compose Dialog**
  too — different slide-direction styling over the same underlying
  primitive, avoiding a second overlay dependency (e.g. `vaul`) for
  what is fundamentally the same interaction pattern. This is a
  deliberate scope decision — flagged for review.
- **`asChild` (via `@radix-ui/react-slot`)** is supported on Button
  and IconButton, so either can render as a different element (e.g.
  a `<Link>`) without losing styling — composition over a `href` prop
  special-case.
- Components with no complex interaction logic stay dependency-free:
  Badge, Avatar fallback letters, Separator (visual line, though the
  interactive/orientation-aware version uses Radix), Skeleton,
  Spinner, Alert, Table, Container, Stack, Grid, Divider, EmptyState,
  ErrorState, LoadingState.

## Accessibility baseline

Every interactive component: keyboard operable, visible focus via the
shared `.focus-ring` utility (Sprint 2), correct ARIA role/label
passthrough, and screen-reader-only text (`sr-only`) where a visual
label is intentionally omitted (e.g. IconButton requires an
`aria-label` prop — enforced at the type level, not just documented).

## Testing readiness

No test files this sprint. Every component exports a plain, typed
function component with no hidden internal state coupling — safe to
render directly in Vitest + React Testing Library, and every
interactive element carries stable roles/labels for Playwright
selectors, once a test framework is chosen (still an open item from
the Sprint 1 audit).
