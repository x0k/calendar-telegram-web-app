/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "tg-bg": "var(--tg-theme-bg-color)",
        "tg-secondary-bg": "var(--tg-theme-secondary-bg-color)",
        "tg-header-bg": "var(--tg-theme-header-bg-color)",
        "tg-section-bg": "var(--tg-theme-section-bg-color)",
        "tg-txt": "var(--tg-theme-text-color)",
        "tg-btn-txt": "var(--tg-theme-button-text-color)",
        "tg-section-header-txt": "var(--tg-theme-section-header-text-color)",
        "tg-subtitle-txt": "var(--tg-theme-subtitle-text-color)",
        "tg-destructive-txt": "var(--tg-theme-destructive-text-color)",
        "tg-accent-txt": "var(--tg-theme-accent-text-color)",
        "tg-hint-color": "var(--tg-theme-hint-color)",
        "tg-link-color": "var(--tg-theme-link-color)",
        "tg-btn-color": "var(--tg-theme-button-color)",
      },
      height: {
        "tg-viewport": "var(--tg-viewport-height)",
        "tg-viewport-stable": "var(--tg-viewport-stable-height)",
      },
      maxHeight: {
        "tg-viewport": "var(--tg-viewport-height)",
        "tg-viewport-stable": "var(--tg-viewport-stable-height)",
      },
      minHeight: {
        "tg-viewport": "var(--tg-viewport-height)",
        "tg-viewport-stable": "var(--tg-viewport-stable-height)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: ["selector", '[data-theme="dark"]'],
};
