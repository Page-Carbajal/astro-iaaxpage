import qs from "qs";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const STRAPI_API_URL = process.env.STRAPI_API_URL ?? undefined;
const STRAPI_ACCESS_TOKEN = process.env.STRAPI_ACCESS_TOKEN ?? 0;
const STRAPI_PAGE_SIZE = parseInt(process.env.STRAPI_PAGE_SIZE ?? "7")

export type GetArticlesProps = {
  fields: string | string[],
  filters?: any,
  pageSize?: number,
  populate?: string | string[]
  sort?: string[]
}

type StrapiRequestProps = {
  filters?: any,
  fields?: string | string[],
  pagination?: {
    pageSize?: number | string,
    page?: number,
  },
  populate?: string | string[],
  sort?: string[],
}


export async function getArticles(props: GetArticlesProps) {
  const {
    fields = '*',
    filters,
    pageSize = STRAPI_PAGE_SIZE,
    populate,
    sort = ["manual_published_at:desc"]
  } = props;
  const parsedFields = '*' == fields ? undefined : fields;
  const articlesUrl = `${STRAPI_API_URL}/articles`;
  const payload: StrapiRequestProps = {
    filters: {
      site: {
        domain: "iaaxpage.com"
      }
    },
    sort: sort,
    pagination: {
      pageSize: pageSize
    },
    populate: populate
  }

  if (parsedFields) {
    payload.fields = parsedFields;
  }

  if (filters) {
    payload.filters = filters;
  }

  const query = qs.stringify(payload);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_ACCESS_TOKEN}`
  };

  const res = await fetch(`${articlesUrl}?${query}`, {
    method: 'GET',
    headers,
  });

  return await res.json();
}


export async function getLatestFeaturedArticle() {
  const featuredArticleProps: GetArticlesProps = {
    fields: "*",
    filters: {
      category_id: {
        slug: 'featured'
      }
    },
    pageSize: 1,
    populate: "image",
    sort: [
      "manual_published_at:desc"
    ]
  }

  const response = await getArticles(featuredArticleProps);

  return response?.data[0]?.attributes;
}


export async function getLatestArticles(categorySlug: string = 'articles') {
  const articlesUrl = `${STRAPI_API_URL}/articles`;
  const payload: StrapiRequestProps = {
    filters: {
      site: {
        domain: "iaaxpage.com"
      },
      category_id: {
        slug: categorySlug
      }
    },
    pagination: {
      pageSize: 100
    },
    populate: "image",
    sort: [
      "manual_published_at:desc"
    ]
  }

  const query = qs.stringify(payload);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_ACCESS_TOKEN}`
  };

  const res = await fetch(`${articlesUrl}?${query}`, {
    method: 'GET',
    headers,
  });

  const json = await res.json();
  const {data} = json;

  return data;
}


export async function getArticleBySlug(slug: string) {
  const articlesUrl = `${STRAPI_API_URL}/articles`;
  const payload: StrapiRequestProps = {
    filters: {
      slug: slug.trim()
    },
    populate: "image"
  }

  const query = qs.stringify(payload);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_ACCESS_TOKEN}`
  };

  const res = await fetch(`${articlesUrl}?${query}`, {
    method: 'GET',
    headers,
  });

  return await res.json();
}

