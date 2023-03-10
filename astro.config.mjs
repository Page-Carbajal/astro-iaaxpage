import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import dotenv from "dotenv";
dotenv.config();
const homeUrl = process.env.HOME_URL;

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: homeUrl,
  integrations: [tailwind({
    config: {}
  }), image(), sitemap({
    i18n: {
      defaultLocale: 'es',
      locales: {
        es: 'ex-MX'
      }
    },
    // lastmod: Intl.DateTimeFormat('en', {dateStyle: "short"}).format(new Date()),
    changefreq: 'weekly',
    lastmod: new Date(),
    entryLimit: 100
  }), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })],
  tailwindConfig: './tailwind.config.js'
});