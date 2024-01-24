import {SITE} from "@config";
import type {APIRoute} from "astro";


const {url: siteUrl} = SITE;
const robots =
  siteUrl.includes("dev")
  || siteUrl.includes("localhost")
  || siteUrl.includes("netlify")
    ? "User-agent: *\n" + "Disallow: /" + "".trim()
    : `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robots, {headers: {"Content-Type": "text/plain"}});
};
