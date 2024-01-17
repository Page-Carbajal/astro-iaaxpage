import qs from "qs";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const STRAPI_API_URL = process.env.STRAPI_API_URL ?? undefined;
const STRAPI_ACCESS_TOKEN = process.env.STRAPI_ACCESS_TOKEN ?? 0;
const STRAPI_PAGE_SIZE = parseInt(process.env.STRAPI_PAGE_SIZE ?? "7")

export type GetArticlesProps = {
  fields: string|string[],
  pageSize?: number,
  sort?: string[]
}

type StrapiRequestProps = {
  filters?: any,
  sort?: string[],
  pagination?: {
    pageSize?: number | string,
    page?: number,
  },
  fields?: string | string[],
}


export async function getArticles(props: GetArticlesProps) {
  const {
    fields = '*',
    pageSize = STRAPI_PAGE_SIZE,
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
    }
  }

  if (parsedFields) {
    payload.fields = parsedFields;
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


export async function getArticleBySlug(slug: string) {
  const articlesUrl = `${STRAPI_API_URL}/articles`;
  const payload: StrapiRequestProps = {
    filters: {
      slug: slug.trim()
    },
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

