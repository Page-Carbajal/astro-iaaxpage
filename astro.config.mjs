import dotenv from "dotenv";
import tailwind from '@astrojs/tailwind';
import {defineConfig} from 'astro/config';

dotenv.config();

const homeUrl = process.env.HOME_URL;

// https://astro.build/config
// import image from "@astrojs/image";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: homeUrl,
  redirects: {
    '/1': homeUrl,
    '/articulos': homeUrl,
    '/articulos/rumbo-al-2020': homeUrl,
    '/articulos/soluciones-para-mexico': homeUrl,
    '/articulos/mejorando-mi-apariencia-personal': homeUrl,
    '/articulos/3226': '/articulos/lecciones-por-aprender',
    '/articulos/el-ayuno-intermitente-no-te-da-superpoderes': homeUrl,
    '/articulos/ninja-hazte-un-favor-y-tomate-a-ti-mismo-en-serio': homeUrl,
  },
  integrations: [tailwind({
    config: {}
  }), sitemap({
    i18n: {
      defaultLocale: 'es',
      locales: {
        es: 'es-MX'
      }
    },
    // lastmod: Intl.DateTimeFormat('en', {dateStyle: "short"}).format(new Date()),
    changefreq: 'weekly',
    lastmod: new Date(),
    entryLimit: 500,

  }), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  })],
  tailwindConfig: './tailwind.config.js'
});
