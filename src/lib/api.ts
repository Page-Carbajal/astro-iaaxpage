import dotenv from "dotenv";
import * as process from "process";

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

  const data = await fetchAPI(`
  {
    posts(where: {status: PUBLISH, categoryId: ${categoryId}}, first: 1000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.posts;
}


export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`
  {
    post(id: "${slug}", idType: SLUG) {
      id
      slug
      date
      title
      content(format: RENDERED)
      featuredImage {
        node {
          date
          slug
          altText
          caption
          sourceUrl
          guid
          fileSize
          mediaType
          mimeType
        }
      }
    }
  }
  `);
  return data?.post;
}

