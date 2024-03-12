import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://x0k.github.io",
  base: "/calendar-telegram-web-app",
  vite: {
    server: {
      port: 443,
      host: "0.0.0.0",
      hmr: {
        host: "calendar-telegram-web-app.local",
        port: 443,
      },
      https: {
        key: fs.readFileSync("./.cert/localhost-key.pem"),
        cert: fs.readFileSync("./.cert/localhost.pem"),
      },
    },
  },
  server: {
    port: 443,
    host: "calendar-telegram-web-app.local",
  },
});
