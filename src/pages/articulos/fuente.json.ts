import type {APIRoute} from "astro";
import {getLatestArticles} from "../../lib/strapiClient";


export const GET: APIRoute = async ({params, request}) => {

  const posts = await getLatestArticles();
  const headers = {
    'Content-Type': 'application/json'
  };

  return new Response(
    JSON.stringify({
      responseCount: posts.length,
      posts: posts
    }), {headers: headers}
  );

}
