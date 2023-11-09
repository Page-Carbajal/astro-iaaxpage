import dotenv from "dotenv";

dotenv.config();

const GRAPHQL_URL = process.env.WP_GRAPQL_URL ?? undefined;
const FEATURED_CATEGORY_ID = process.env.FEATURED_ARTICLES_CATEGORY_ID ?? 0;
const ARTICLES_CATEGORY_ID = process.env.ARTICLES_CATEGORY_ID ?? 0;
const POEMS_CATEGORY_ID = process.env.POEMS_CATEGORY_ID ?? 0;


async function fetchAPI(query: string, { variables }:any = {}) {

  if( !GRAPHQL_URL ){
    console.log('********** GRAPHQL_URL IS UNDEFINED ************');
    return {data: null};
  }


  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}


export const getTextFromHtml = (html: string, wordCount: number = 20): string => {
  // Remove HTML tags
  const regex = /<[^>]*>/g;
  const plainText = html.replace(regex, '');

  // Split text into words and calculate sentence length
  const words = plainText.split(/\s+/);
  // const sentenceLength = Math.ceil(words.length / 20) * 20;

  // Return first 20 words or sentence length, whichever is less
  const truncatedText = words.slice(0, wordCount).join(' ');

  return truncatedText;
}

export const formatDate = (date: string) => {
  return Intl.DateTimeFormat('es-mx', {
    dateStyle: "medium",
    timeStyle: "short",
  }).format( Date.parse(date) );
}


export async function getSiteInfo(): Promise<{title: string, description: string}>{
  const data = await fetchAPI(`
  {
    generalSettings {
      title
      description
    }
  }
  `);

  return data?.generalSettings;
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


export async function getLatestPublishedPosts(articles: boolean = true) {
  const categoryId = articles ? ARTICLES_CATEGORY_ID : POEMS_CATEGORY_ID;

  const data = await fetchAPI(`
  {
    posts(first: 100, where: {status: PUBLISH, categoryId: ${categoryId}}) {
      nodes {
        databaseId
        date
        slug
        title
        excerpt
        content
      }
    }
  }
  `);

  return data?.posts;
}


export async function getLatestFeaturedArticle() {
  const data = await fetchAPI(`
  {
    posts(where: {orderby: {field: DATE, order: DESC}, categoryId: ${FEATURED_CATEGORY_ID}, status: PUBLISH}, first: 1) {
      nodes {
        id
        date
        slug
        title
        content
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
  }  
  `);

  return data?.posts?.nodes?.length > 0 ? data.posts.nodes[0] : undefined;
}


export async function getPoems() {
  const data = await fetchAPI(`
  {
    posts(where: {categoryName: "poemas"}) {
      nodes {
        id
        date
        slug
        title
        content
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
  }  
  `);

  return data?.posts?.nodes?.length > 0 ? data.posts.nodes[0] : undefined;
}