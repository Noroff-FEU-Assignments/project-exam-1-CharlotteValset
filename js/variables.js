export const baseApiUrl = "https://mycoffeecorner.charlottevalset.no/wp-json/wp/v2/posts/";
export const endpointApiUrl = "?acf_format=standard&per_page=12";

export async function getBlogPosts(url) {
  try {
    // Send a GET request to the specified URL using the Fetch API
    const response = await fetch(url);
    // Parse the response body as JSON
    const json = response.json();

    // Check if the JSON data exists (not null or undefined)
    if (json) {
      // If JSON data is available, return it
      return json;
    }
  } catch (error) {
    console.log("An error occured", error);
    throw new Error(error);
  }
}
