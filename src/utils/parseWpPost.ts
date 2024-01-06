import {SITE} from "@config";
import {formatDate} from "../lib/api.ts";
import {getTextStringFromHtml} from "@page-carbajal/wp-graphql";

export const parsePost = (p: any) => {
  const postDescription = getTextStringFromHtml(
    !p?.excerpt ? p.content : p.excerpt
  );

  return {
    id: p?.databaseId,
    slug: p?.slug,
    collection: "blog", // Category
    body: p.content,
    featuredImage: p?.featuredImage?.node?.guid || undefined,
    data: {
      author: SITE.author,
      pubDatetime: Date.parse(p.date),
      title: p.title,
      postSlug: p.slug,
      draft: p.status === "publish",
      description: postDescription,
      formattedDate: formatDate(p.date)
    },
  };
};
