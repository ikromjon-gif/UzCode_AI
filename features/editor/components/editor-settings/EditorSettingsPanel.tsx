"use client";

import { Settings2 } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useEditorStore } from "../../store/editor-store";

/**
 * UzCode AI — EditorSettingsPanel
 * Real settings architecture, not just types: every control here is
 * wired to editor-store's `settings` slice and actually changes
 * Monaco's options live. "No persistence" per this sprint's scope —
 * changes are in-memory only and reset on reload (no localStorage).
 */
export function EditorSettingsPanel() {
  const settings = useEditorStore((s) => s.settings);
  const updateSettings = useEditorStore((s) => s.updateSettings);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton aria-label="Editor settings" variant="ghost" size="sm" icon={<Settings2 className="h-3.5 w-3.5" />} className="h-6 w-6" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">Editor Settings</p>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="font-size">Font Size</Label>
            <Input
              id="font-size"
              type="number"
              min={10}
              max={24}
              size="sm"
              className="w-16"
              value={settings.fontSize}
              onChange={(e) => updateSettings({ fontSize: Number(e.target.value) || settings.fontSize })}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={settings.fontFamily} onValueChange={(v) => updateSettings({ fontFamily: v })}>
              <SelectTrigger id="font-family" size="sm" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="var(--font-jetbrains-mono), monospace">JetBrains Mono</SelectItem>
                <SelectItem value="'Fira Code', monospace">Fira Code</SelectItem>
                <SelectItem value="Consolas, monospace">Consolas</SelectItem>
                <SelectItem value="Menlo, monospace">Menlo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="tab-size">Tab Size</Label>
            <Select value={String(settings.tabSize)} onValueChange={(v) => updateSettings({ tabSize: Number(v) })}>
              <SelectTrigger id="tab-size" size="sm" className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="word-wrap">Word Wrap</Label>
            <Switch id="word-wrap" checked={settings.wordWrap} onCheckedChange={(v) => updateSettings({ wordWrap: v })} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="minimap">Minimap</Label>
            <Switch id="minimap" checked={settings.minimap} onCheckedChange={(v) => updateSettings({ minimap: v })} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="line-numbers">Line Numbers</Label>
            <Switch id="line-numbers" checked={settings.lineNumbers} onCheckedChange={(v) => updateSettings({ lineNumbers: v })} />
          </div>

          {/* Theme intentionally not duplicated here — Sprint 4's global
              ThemeToggle already controls light/dark app-wide, and
              MonacoEditor follows next-themes' resolvedTheme automatically. */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
