# 🧠 UzCode AI

> AI-powered software engineering platform — build smarter, code faster, deploy everywhere.

> Sprint 1 — Project Foundation. Application pages have not been built yet (see Sprint 5+).

## Tech Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- TailwindCSS · shadcn/ui (config only, components land in Sprint 3)
- Framer Motion · Zustand · TanStack Query
- ESLint (flat config) · Prettier · Husky + lint-staged

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint autofix |
| `npm run format` | Prettier write |
| `npm run typecheck` | TypeScript check (no emit) |

## Folder Structure (Feature-Based Architecture)

```
app/            App Router routes, layouts, metadata
components/
  ui/           shadcn/ui primitives (populated in Sprint 3)
  theme/        Theme provider infrastructure
features/       Self-contained feature modules (components/hooks/services/types per feature)
hooks/          Shared, cross-feature hooks
lib/            Shared utilities (e.g. cn())
services/       Shared API/service clients
store/          Zustand global stores
types/          Shared TypeScript types
constants/      App-wide constants (site config, etc.)
schemas/        Zod schemas
utils/          Pure helper functions
styles/         Non-Tailwind global styles (reserved)
public/         Static assets
```

Every feature added from Sprint 5 onward owns its own
`components/ hooks/ services/ types/ schemas/ constants/` per the
Constitution's Folder Rules — nothing feature-specific lives at the
root level.

## Governing Documents

Read in this order before contributing:

1. `PROJECT_KNOWLEDGE.md`
2. `UZCODE-CONSTITUTION.md`
3. `MASTER_PROMPT.md`
4. `SPRINT_TASKS.md` (canonical 24-sprint roadmap)

## Design System (Sprint 2)

- **Tokens:** `lib/design-tokens/` — color, typography, spacing, radius,
  shadows, motion primitives, semantic animation, z-index, breakpoints,
  container, opacity, blur, border-width, focus-ring. Barrel export at
  `lib/design-tokens/index.ts`.
- **CSS tokens:** `app/globals.css` — same values as CSS custom
  properties, mapped through Tailwind v4's `@theme inline` to generate
  utility classes (`bg-primary`, `shadow-card`, `z-modal`, etc.).
- **Typography scale:** practical fixed scale — 12/14/16/18/20/24/30/36/48/60/72px.
- **Icon library:** Lucide (`lucide-react`) — not yet installed;
  declared in `components.json` and installed the moment Sprint 3's
  first component needs an icon.
- **Component scaffold:** `components/ui/<name>/` for all 13
  foundational components (Button, Input, Card, Badge, Avatar, Modal,
  Dialog, Tooltip, Dropdown, Table, Tabs, Skeleton, Spinner), each
  following the `Component.tsx` / `component.types.ts` /
  `component.styles.ts` / `index.ts` convention documented in
  `components/ui/CONVENTIONS.md`. **Placeholders only — no final UI
  yet (Sprint 3 scope).**

## UI Component Library (Sprint 3)

38 production-ready components across 5 categories, each following
the 5-file convention in `components/ui/CONVENTIONS.md`
(`Component.tsx` / `*.types.ts` / `*.variants.ts` / `*.styles.ts` /
`index.ts`). Full list and architecture rationale in the Sprint 3
report. Import from `@/components/ui` (barrel) or a specific
component folder.

**Basic:** Button · IconButton · Input · Textarea · Label · Checkbox ·
RadioGroup · Switch · Select · Badge · Avatar · Separator · Progress ·
Skeleton · Spinner
**Layout:** Card (+ Header/Title/Description/Content/Footer) ·
Container · Stack · Grid · Divider
**Navigation:** Tabs · Breadcrumb · Pagination
**Overlay:** Dialog · Modal · Drawer · Sheet · Popover · Tooltip ·
DropdownMenu
**Feedback:** Alert · Toast (primitives only) · EmptyState · ErrorState
· LoadingState
**Data:** Table · DataTable (foundation) · ScrollArea

## Application Shell (Sprint 4)

- **`features/app-shell/`** — Sidebar (desktop rail + mobile Sheet,
  nested nav, collapsible), TopNav (sticky, project selector/search/
  notifications/theme-toggle/avatar placeholders), AppBreadcrumb,
  WorkspaceLayout (collapsible 3-panel foundation, not resizable yet),
  StatusBar, CommandPalette (⌘K, layout only), NotificationArea (Toast
  mount point), Footer.
- **`store/ui-store.ts`** — Zustand (reintroduced this sprint — first
  genuine cross-component UI state need): sidebar/panel collapse,
  command palette open, persisted to localStorage.
- **`app/(app)/`** — route group sharing the shell layout across 5
  prepared routes: `/workspace`, `/projects`, `/ai-chat`, `/deploy`,
  `/settings`. Each renders a shared `RouteSlotPlaceholder` — no real
  page content yet.
- **`components/theme/ThemeToggle.tsx`** — new reusable control (not
  app-shell-specific), first real consumer of Sprint 1/2's theme
  provider.

## Workspace Explorer Foundation (Sprint 5)

- **`features/workspace-explorer/components/tree/`** — reusable tree
  primitives (Tree, TreeItem, TreeFolder, TreeFile, TreeIndent,
  TreeChevron, TreeLabel, TreeIcon, TreeActions). Keyboard nav walks
  `[role="treeitem"]` in DOM order, so collapsed folders are
  automatically skipped with no separate "visible nodes" list to
  maintain.
- **`ExplorerPanel`** — search placeholder, new-file/new-folder
  actions, loading/empty states, composes `WorkspaceNav` (Recent
  Projects/Favorites/Pinned/Open Editors) above the tree.
- **`RightPanel`** / **`BottomPanel`** — icon-rail and tabbed module
  switchers respectively; every module/tab renders a static "ships
  later" message.
- **`EditorPlaceholder`** — welcome screen where Monaco mounts in
  Sprint 10.
- **`store/workspace-store.ts`** — Zustand, **no persist** (explicit
  this sprint): tree expansion/selection, active right-panel module,
  bottom-panel state. Left/right panel show/hide **reuses Sprint 4's
  `ui-store`** rather than duplicating that state.
- Wired into `/workspace` (replacing Sprint 4's `RouteSlotPlaceholder`
  on that one route only — the other 4 routes are untouched).

## Monaco Editor Foundation (Sprint 6)

- **`features/editor/components/monaco-editor/`** — the only file
  importing `@monaco-editor/react` directly; lazy-loaded via
  `next/dynamic({ ssr: false })`. Theme-aware (light/dark themes
  defined from Sprint 2's `lib/design-tokens/colors.ts` — Monaco needs
  literal hex, can't read CSS variables).
- **11 languages supported** out of Monaco's built-in tokenizers:
  TypeScript, JavaScript, JSON, HTML, CSS, Markdown, Python, C++,
  Java, Go, Rust — no language-server packages.
- **`EditorTabs`** — open/active/close/dirty-dot/file-icon, horizontal
  scroll, inert context menu, middle-click close.
- **`EditorSettingsPanel`** — real settings UI (font size/family, tab
  size, word wrap, minimap, line numbers) wired to the store; changes
  Monaco's options live, resets on reload (no persistence, per scope).
- **`store/editor-store.ts`** — Zustand, no persist: open tabs, active
  tab, live cursor position, dirty flags, recent files, settings. This
  IS the "File Manager" from the sprint brief — no separate component
  duplicates the same concept.
- Seeded with 2 sample tabs (`welcome.md`, `example.ts`) so the
  multi-language setup is visible without real file-open wiring.
- **Cross-cutting fixes:** `EditorTab` type promoted from
  `workspace-explorer` to shared `types/editor.ts`; file-icon lookup
  extracted from Sprint 5's `TreeIcon` to `lib/file-icon.ts`, now
  shared by both the Explorer tree and Editor Tabs.
- Wired into `/workspace`'s center slot — `EditorShell` now fills
  where Sprint 5's bare `EditorPlaceholder` was.

## AI Chat Workspace Foundation (Sprint 7)

- **`features/ai-chat/`** — reuses Sprint 4's `WorkspaceLayout` again
  (left = ConversationSidebar, center = chat area, right =
  ContextPanel) — third feature to do so (after Workspace Explorer
  and the Editor), no new panel-layout implementation needed.
- **`store/chat-store.ts`** — Zustand, no persist. `sendMessage`
  **only appends the user's own message** — it never fabricates an
  assistant reply, matching the "no AI provider, no streaming" scope.
  All assistant/system/thinking/tool-call messages are static seed
  data (`constants/sample-conversation.ts`).
- **`MarkdownRenderer`** (new deps: `react-markdown`, `remark-gfm`,
  `react-syntax-highlighter`) — tables, lists, inline code, and
  theme-aware syntax-highlighted code blocks via `CodeBlock`.
- **`ModelSelector`** — 6 models (Claude/GPT/Gemini/DeepSeek/
  OpenRouter/Local), writes to store, no API client exists for any of
  them.
- **Accepted trade-off:** `ConversationSidebar` and `ContextPanel`
  reuse Sprint 4's `ui-store` (`leftPanelCollapsed`/
  `rightPanelCollapsed`) like Sprint 5/6 did — collapse state is
  shared across `/workspace`, `/ai-chat`, etc. rather than per-route,
  consistent with the precedent already set.
- Wired into `/ai-chat`, replacing Sprint 4's `RouteSlotPlaceholder`.

## Developer Workspace Foundation (Sprint 8)

- **`features/developer-workspace/`** — Terminal (real tab
  create/close/rename, xterm.js NOT initialized — see
  `config/xterm.config.ts`), Output/Debug Console/Problems/Logs/Ports
  panels (all with static demo data), Live Preview (device-frame
  mockup, no iframe) + PreviewToolbar + DeviceSelector, and a generic
  `SplitView` primitive (no drag-resize).
- **xterm.js declared, not initialized** — `@xterm/xterm` and
  `@xterm/addon-fit` are in `package.json`; `xtermOptions`/
  `getXtermTheme()` are prepared (design-token-sourced, mirroring
  Sprint 6's `monaco-theme.ts`) but **no file imports `@xterm/xterm`**.
- **Two integration points into earlier-approved code**, both
  minimal: Sprint 5's `BottomPanel` now renders the 6 real panels
  instead of placeholder text; `WorkspaceExplorerShell`'s center slot
  now renders `DeveloperWorkspaceCenter` (Editor + optional Live
  Preview split) instead of the bare `EditorShell`.
- Dependency direction stays one-way:
  `workspace-explorer → developer-workspace → editor` — verified no
  cycles.

## AI Engine Foundation (Sprint 9)

- **`lib/ai-engine/`** — pure TypeScript architecture, no UI, no
  network calls anywhere (verified). Lives in `lib/` rather than
  `features/` since it has no components and is a shared layer other
  features consume, matching the approved System Architecture
  diagram's distinct "AI Layer" tier.
- **Provider Layer / Model Layer / Tool Registry** — static metadata
  catalogs (8 providers, 6 example models, 10 tool categories). No
  client, no execution.
- **Prompt Pipeline / Context Engine** — pure functions assembling
  structured data (`buildPrompt`, `collectContext`) — nothing is ever
  sent anywhere or read from a real filesystem.
- **Agent Foundation** — `Planner`/`Reasoner`/`Reflection` are real
  classes whose core methods throw "not implemented" (same pattern as
  Sprint 2's placeholder components); `ToolRouter`/`ResponseBuilder`
  are genuinely functional since routing/formatting isn't execution.
- **Conversation Engine** — real 8-stage pipeline; stage 5
  ("provider-request-placeholder") returns a static stub string,
  never calls a network.
- **`store/ai-store.ts`** — Zustand, no persist.
- **Deliberately not wired into `features/ai-chat`** yet — Sprint 7's
  UI-only `AiModel` and this sprint's richer `ModelDefinition`
  currently coexist independently; connecting them is real
  integration work for whichever sprint adds a live provider.

## AI Provider Integration Foundation (Sprint 10)

- **`lib/ai-engine/provider-integration/`** — extends Sprint 9's
  engine. 8 adapters (`AnthropicAdapter`, `OpenAiAdapter`,
  `GeminiAdapter`, `DeepSeekAdapter`, `OpenRouterAdapter`,
  `OllamaAdapter`, `AzureOpenAiAdapter`, `CustomAdapter`), each
  implementing Sprint 9's `ProviderAdapter` interface unmodified.
  Zero networking anywhere (verified via grep for `fetch`/`axios`/
  `XMLHttpRequest`/`WebSocket`/`setTimeout`).
- **Request Builder** — `buildUnifiedRequest()` (pure assembly) +
  `buildProviderRequest()` mapping to each provider's real wire
  shape (Anthropic/OpenAI-compatible-family/Gemini/Ollama/Custom —
  5 distinct shapes for 8 providers, since DeepSeek/OpenRouter/Azure
  OpenAI are OpenAI-API-compatible in practice).
- **Response Parser** — `parseResponse()` unifies 5 distinct raw
  mock-response shapes into one `UnifiedResponse`.
- **Error Layer / Retry Strategy / Rate Limit Registry** — unified
  `AiError` class + 7 factory functions; `shouldRetry()` and
  `getBackoffDelayMs()` are pure decision functions, never actually
  wait or loop; rate limits are static per-provider metadata only.
- **`ProviderManager` is stateless** — deliberately doesn't duplicate
  `ai-store`'s `currentProviderId`/`currentModelId` (the exact
  mistake flagged in the Sprint 8 review); every method takes the
  provider it needs as a parameter.
- Still not wired into `features/ai-chat` — same documented decision
  as Sprint 9.

## AI Runtime Foundation (Sprint 11)

- **`lib/ai-engine/runtime/`** — the orchestration layer tying
  together Sprint 9 (prompt/context/memory) and Sprint 10 (provider
  adapters/request/response). `RuntimeOrchestrator.run()` walks all 8
  named stages end to end.
- **Key integration:** the "Execute Placeholder" stage calls a
  Sprint 10 **mock** `ProviderAdapter.sendMessage()` — zero
  networking (verified), but genuinely exercises the full mock
  pipeline built across 3 sprints rather than returning an isolated
  stub.
- **Middleware Pipeline & Event Bus are real mechanisms** (actual
  ordered execution / actual pub-sub) — "no execution" means no
  listener or middleware does real AI work, not that the plumbing
  itself is fake.
- **Logger genuinely calls `console.*`** (6 levels) — no file
  writing, per spec.
- **Token Estimator** uses a ~4-chars-per-token heuristic (no
  tokenizer library), combined with Sprint 9's model pricing metadata
  for a cost estimate.
- **Bug caught during implementation:** the orchestrator initially
  passed Sprint 9's `PromptSegment[]` (shape `{kind, content}`)
  directly where Sprint 10's adapters expect `UnifiedMessage[]`
  (shape `{role, content}`) — wrong shape, would have silently passed
  bad data through an `unknown`-typed parameter with no compile
  error. Fixed by routing through Sprint 10's `buildUnifiedRequest()`.
- **`RuntimeOrchestrator`/`MetricsCollector` hold their own instance
  state** (request-scoped/counter state, not UI state) — `runtime-store.ts`
  is the separate UI-facing mirror, no duplication of the same concept.
- Still not wired into `features/ai-chat` — same documented decision
  carried from Sprints 9–10.

## Status

Current Sprint: **11 — AI Runtime Foundation** ✅
Next Sprint: unset (canonical roadmap order still needs
reconciling).
