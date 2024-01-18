import dotenv from "dotenv";
import type { SiteProps } from "@utils/types";
import * as process from "process";

dotenv.config();

export const SITE: SiteProps = {
  url: process.env.HOME_URL || 'http://localhost:4321',
  title: process.env.SITE_TITLE || "Blog de Desarrollo Personal",
  author: process.env.SITE_AUTHOR || "Iaax Page" ,
  description: process.env.SITE_DESCRIPTION,
  defaultImageUrl: process.env.SITE_DEFAULT_IMAGE_URL,
  wpGraphQlUrl: process.env.WP_GRAPHQL_URL
};
