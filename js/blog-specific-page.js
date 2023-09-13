import { baseApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const blogDetailsUrl = "/posts?acf_format=standard";

const blogPostContainer = document.querySelector(".blog-post_container");
const errorMessage = createMessage("error");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const jsonSpecific = await getBlogPosts(`${baseApiUrl}${blogDetailsUrl}/${id}`);

async function fetchBlogSpecificImage() {
  try {
    blogPostContainer.innerHTML = "";

    const blogPostImage = document.createElement("img");
    blogPostImage.setAttribute("alt", `${jsonSpecific[0].acf.images.alt}`);
    blogPostImage.src = jsonSpecific[0].acf.images.url;
    blogPostImage.className = "blog-post_image";
    blogPostContainer.appendChild(blogPostImage);
  } catch (error) {
    console.log("An error occured", error);
    blogPostContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}

fetchBlogSpecificImage();
