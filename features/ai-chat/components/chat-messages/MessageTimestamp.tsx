export function MessageTimestamp({ iso }: { iso: string }) {
  const time = new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <time dateTime={iso} className="text-xs text-muted-foreground">
      {time}
    </time>
  );
}
