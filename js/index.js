import { baseApiUrl, endpointApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const json = await getBlogPosts(`${baseApiUrl}${endpointApiUrl}`);
const errorMessage = createMessage("error");

const blogCardContainer = document.querySelector(".blog_card-container");

async function fetchBlogCardContent() {
  try {
    blogCardContainer.innerHTML = "";

    const blogCardImageContainer = document.createElement("a");
    blogCardImageContainer.href = `blog-specific-page.html?id=${json[9].id}`;
    blogCardContainer.appendChild(blogCardImageContainer);

    const blogCardImage = document.createElement("img");
    blogCardImage.setAttribute("alt", `${json[9].acf.images.alt}`);
    blogCardImage.classList = "blog_card-image";
    blogCardImage.src = `${json[9].acf.images.url}`;
    blogCardImageContainer.appendChild(blogCardImage);
  } catch (error) {
    console.log("An error occured", error);
    blogCardContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}

fetchBlogCardContent();
