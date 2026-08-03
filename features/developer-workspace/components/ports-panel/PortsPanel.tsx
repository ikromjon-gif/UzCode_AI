"use client";

import { Copy, Play, Square } from "lucide-react";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";

import { samplePorts } from "../../constants/sample-ports";

/** UzCode AI — PortsPanel. No networking — status/actions are all static/inert. */
export function PortsPanel() {
  return (
    <div className="h-full overflow-auto p-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Port</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Label</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {samplePorts.map((port) => (
            <TableRow key={port.id}>
              <TableCell className="font-mono">{port.port}</TableCell>
              <TableCell className="uppercase text-muted-foreground">{port.protocol}</TableCell>
              <TableCell>
                <Badge variant={port.status === "open" ? "success" : "outline"}>{port.status}</Badge>
              </TableCell>
              <TableCell>{port.label}</TableCell>
              <TableCell className="flex justify-end gap-0.5">
                {port.status === "open" ? (
                  <IconButton aria-label={`Stop ${port.label}`} variant="ghost" size="sm" className="h-6 w-6" icon={<Square className="h-3.5 w-3.5" />} />
                ) : (
                  <IconButton aria-label={`Open ${port.label}`} variant="ghost" size="sm" className="h-6 w-6" icon={<Play className="h-3.5 w-3.5" />} />
                )}
                <IconButton aria-label={`Copy URL for ${port.label}`} variant="ghost" size="sm" className="h-6 w-6" icon={<Copy className="h-3.5 w-3.5" />} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
