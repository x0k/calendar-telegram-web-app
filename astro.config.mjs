import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://x0k.github.io",
  base: "/telegram-web-inputs",
  vite: {
    server: {
      port: 443,
      host: "0.0.0.0",
      hmr: {
        host: "telegram-web-inputs.local",
        port: 443,
      },
      https: {
        key: fs.readFileSync("./.certs/telegram-web-inputs.local.key"),
        cert: fs.readFileSync("./.certs/telegram-web-inputs.local.crt"),
      },
    },
  },
  server: {
    port: 443,
    host: "telegram-web-inputs.local",
  }
});
