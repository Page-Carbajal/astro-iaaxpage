import dotenv from "dotenv";
import * as process from "process";
import {getArticleBySlug, getArticles} from "./strapiClient.ts";

dotenv.config();

const GRAPHQL_URL = process.env.WP_GRAPHQL_URL ?? undefined;
const POEMS_CATEGORY_ID = process.env.WP_POEMS_CATEGORY_ID ?? 0;
const ARTICLES_CATEGORY_ID = process.env.WP_ARTICLES_CATEGORY_ID ?? 0;


async function fetchAPI(query: string, {variables}: any = {}) {

  if (!GRAPHQL_URL) {
    console.log('********** GRAPHQL_URL IS UNDEFINED ************');
    return {data: null};
  }


  const headers = {'Content-Type': 'application/json'};
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({query, variables}),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}


export const formatDate = (date: string) => {
  return Intl.DateTimeFormat('es-mx', {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(Date.parse(date));
}


export async function getAllPublishedPostsSlugs(articles: boolean = true) {

  const categoryId = articles ? ARTICLES_CATEGORY_ID : POEMS_CATEGORY_ID;
  const response = await getArticles({fields: ['manual_published_at', 'slug'], pageSize: 100})
  const slugs = response.data.map(({attributes}: any) => {
    return {
      params: {slug: attributes.slug},
    };
  });

  return slugs;
}


export async function getPostBySlug(slug: string) {
  const post = await getArticleBySlug(slug);

  return post;
}

