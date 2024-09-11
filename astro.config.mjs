import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import remarkMermaid from 'astro-diagram/remark-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://x0k.github.io",
  base: "/telegram-web-inputs",
  markdown: {
    remarkPlugins: [
      remarkMermaid
    ]
  }
});
