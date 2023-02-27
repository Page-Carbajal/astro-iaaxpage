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
export default defineConfig({
  site: homeUrl,
  integrations: [tailwind({
    config: {}
  }), image(), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date('2022-02-24'),
  })],
  tailwindConfig: './tailwind.config.js'
});