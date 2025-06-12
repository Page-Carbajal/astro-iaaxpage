import {getArticleBySlug, getArticles, type GetArticlesProps, getLatestArticles} from "./strapiClient";


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
      article_category:{
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

  if( 'articles' == categorySlug ){
    slugPayload.filters.article_category = {
      slug: { $in: ['featured', categorySlug]}
    }
  }


  const response = await getArticles(slugPayload);

  if (!response?.data) {
    console.warn('No data returned from getArticles');
    return [];
  }

  const slugs = response.data
    .filter((article: any) => article?.slug)
    .map((article: any) => {
      return {
        params: {slug: article.slug},
      };
    });

  return slugs;
}


export async function getPostBySlug(slug: string) {
  const post = await getArticleBySlug(slug);

  return post;
}

