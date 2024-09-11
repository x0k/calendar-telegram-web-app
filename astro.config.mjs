import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import remarkMermaid from 'astro-diagram/remark-mermaid';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: "https://x0k.github.io",
  base: "/telegram-web-inputs",
  markdown: {
    remarkPlugins: [
      remarkMermaid
    ]
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});