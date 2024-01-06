import dotenv from "dotenv";
import process from "process";
import {SITE} from "@config";
import {parsePost} from "@utils/parseWpPost.ts";
import type {WpGraphQlRequest} from "@page-carbajal/wp-graphql";
import {setConfig, wpRequestPosts} from "@page-carbajal/wp-graphql";

dotenv.config();

const GRAPHQL_URL = process.env.WP_GRAPHQL_URL ?? undefined;
const POEMS_CATEGORY_ID = process.env.WP_POEMS_CATEGORY_ID ?? 0;
const FEATURED_CATEGORY_ID = process.env.WP_FEATURED_ARTICLES_CATEGORY_ID ?? 0;
const ARTICLES_CATEGORY_ID = process.env.WP_ARTICLES_CATEGORY_ID ?? 0;


export default async function getWordpressPosts(args: WpGraphQlRequest) {
  if (!SITE.wpGraphQlUrl) {
    return Promise.reject("GraphQl endpoint is not set!");
  }

  // Set the config before calling the
  setConfig({
    url: SITE.url,
    wpGraphqlUrl: SITE.wpGraphQlUrl,
  });

  const response = await wpRequestPosts(args);
  const posts = response?.posts?.nodes ?? [];

  return Array.isArray(posts) ? posts.map(parsePost) : [];
}


export async function getLatestPosts(articles: boolean = true, limit: int = 100) {
  const categoryId = articles ? ARTICLES_CATEGORY_ID : POEMS_CATEGORY_ID;
  const payload = categoryId ? {pageSize: limit, categoryId: categoryId} : {pageSize: limit};

  return await getWordpressPosts(payload);
}


export async function getLatestFeaturedArticle() {
  const categoryId = FEATURED_CATEGORY_ID;
  const fields = ['databaseId', 'date', 'slug', 'title', 'excerpt', 'content', 'status', 'featuredImage { node { date slug altText guid } }'];
  const payload = categoryId ? {pageSize: 1, categoryId: categoryId, fields: fields} : {pageSize: 1, fields: fields};

  const posts = await getWordpressPosts(payload);

  return Array.isArray(posts) ? posts[0] : null;
}

