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
  pagination?: any,
  populate?: string | string[]
  sort?: string[]
}


export type SiteInfoProps = {
  title: string,
  domain: string,
  description?: string,
  defaultImageUrl?: string,
  defaultImageSize?: {
    height?: number,
    width?: number,
  }
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
    pagination = {pageSize: STRAPI_PAGE_SIZE},
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
    pagination: pagination,
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
      article_category: {
        slug: 'featured'
      }
    },
    pagination: {pageSize: 1},
    populate: "image",
    sort: [
      "manual_published_at:desc"
    ]
  }

  const response = await getArticles(featuredArticleProps);

  return response?.data[0];
}


export async function getLatestArticles(categorySlug: string = 'articles', pageSize?: number) {
  const articlesUrl = `${STRAPI_API_URL}/articles`;
  const payload: StrapiRequestProps = {
    filters: {
      site: {
        domain: "iaaxpage.com"
      },
      article_category: {
        slug: categorySlug
      }
    },
    pagination: {
      pageSize: pageSize ?? STRAPI_PAGE_SIZE
    },
    populate: "image",
    sort: [
      "manual_published_at:desc"
    ]
  }

  if ('articles' == categorySlug) {
    payload.filters.article_category = {
      slug: {$in: ['featured', categorySlug]}
    }
  }

  const query = qs.stringify(payload);

  // console.log('>>> QUERY: ', query);

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

  // console.log('>>> JSON: ', json);

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

  const response = await res.json();

  return response?.data[0];
}

export async function getSiteByDomain(domain: string) {
  const articlesUrl = `${STRAPI_API_URL}/sites`;
  const payload: StrapiRequestProps = {
    filters: {
      domain: domain.trim()
    },
    populate: ["image", "icon"]
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

  const jsonResponse = await res.json();
  const siteInfo = jsonResponse?.data[0];
  const defaultImage = siteInfo?.image?.data;
  const site: SiteInfoProps = {
    title: siteInfo?.title,
    domain: siteInfo?.domain,
    description: siteInfo?.description,
    defaultImageUrl: defaultImage?.url,
    defaultImageSize: {
      height: defaultImage?.height,
      width: defaultImage?.width,
    }
  }

  // console.log(' >>> SITE: ', site);

  return site;
}

