import type {APIRoute} from "astro";
import getWordpressPosts, {getLatestPosts} from "@utils/wordpressClient.ts";

export const GET: APIRoute = async ({params, request}) => {

  const posts = await getLatestPosts(true, 200);
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
