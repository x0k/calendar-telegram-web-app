import { Bot } from "grammy";

import config from "../astro.config.mjs";

const astroUrl = process.env.ASTRO_URL;
const handlerUrl = process.env.HANDLER_URL;
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

const inputs = ["calendar"];

const params = new URLSearchParams();
params.set(
  "r",
  JSON.stringify({
    url: handlerUrl,
  })
);

const inputToUrl = (input) =>
  `${astroUrl}${config.base}/${input}?${params.toString()}`;

bot.command("start", async (ctx) => {
  await ctx.reply("Inputs:", {
    reply_markup: {
      inline_keyboard: inputs.map((input) => [
        {
          text: input,
          web_app: {
            url: inputToUrl(input),
          },
        },
      ]),
    },
  });
});

bot.start().catch(console.error);
