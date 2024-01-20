import dotenv from "dotenv";
import type {APIRoute} from "astro";

dotenv.config();

const {SITE_URL: siteUrl} = process.env;

const robots =
  siteUrl?.includes("dev") || siteUrl?.includes("netlify")
    ? "User-agent: *\n" + "Disallow: /" + "".trim()
    : `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", siteUrl).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robots, {headers: {"Content-Type": "text/plain"}});
};
