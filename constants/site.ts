/**
 * UzCode AI — Site-wide constants
 * Single source of truth for metadata consumed by app/layout.tsx.
 */
export const siteConfig = {
  name: "UzCode AI",
  shortName: "UzCode AI",
  description:
    "UzCode AI is an AI-powered Software Engineering Platform for building, running, and deploying software faster with intelligent agents.",
  tagline: "Build Smarter. Code Faster. Deploy Everywhere.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com/uzcode-ai",
  },
} as const;

export type SiteConfig = typeof siteConfig;
