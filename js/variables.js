export const baseApiUrl = "https://mycoffeecorner.charlottevalset.no/wp-json/wp/v2/posts/";
export const endpointApiUrl = "?acf_format=standard&per_page=12";

export async function getBlogPosts(url) {
  try {
    const response = await fetch(url);
    const json = response.json();

    if (json) {
      return json;
    }
  } catch (error) {
    console.log("An error occured", error);
    throw new Error(error);
  }
}
