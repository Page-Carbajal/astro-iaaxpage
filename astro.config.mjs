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
      defaultLocale: 'es'
    },
    serialize(page) {
      console.log('Page: ', page);
      
      return page;
    }
  }), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })],
  tailwindConfig: './tailwind.config.js'
});