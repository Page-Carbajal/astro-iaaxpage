import {getArticleBySlug, getArticles, GetArticlesProps, getLatestArticles} from "./strapiClient.ts";


export const formatDate = (date: string) => {
  return Intl.DateTimeFormat('es-mx', {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(Date.parse(date));
}


export async function getAllPublishedPostsSlugs(categorySlug: string = 'articles') {
  const slugPayload: GetArticlesProps = {
    fields: [
      'slug'
    ],
    filters: {
      site: {
        domain: "iaaxpage.com"
      },
      category_id:{
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
  };
  const response = await getArticles(slugPayload);

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

