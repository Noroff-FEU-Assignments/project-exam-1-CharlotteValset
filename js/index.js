import { baseApiUrl, endpointApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const indexBlogPostContainer = document.querySelector(".blog_card-container");
const errorMessage = createMessage("error");

async function fetchIndexBlogCard() {
  try {
    indexBlogPostContainer.innerHTML = "";

    const json = await getBlogPosts(`${baseApiUrl}${endpointApiUrl}`);

    const blogCardContainer = document.createElement("div");
    blogCardContainer.classList = "blog_card blog_card-index";
    indexBlogPostContainer.appendChild(blogCardContainer);

    const blogCardImage = document.createElement("img");
    blogCardImage.setAttribute("alt", `${json[9].acf.images.alt}`);
    blogCardImage.classList = "blog_card-image";
    blogCardImage.src = `${json[9].acf.images.url}`;
    blogCardContainer.appendChild(blogCardImage);

    const blogCardTexContainer = document.createElement("div");
    blogCardTexContainer.classList = "blog_card-textbox";
    blogCardContainer.appendChild(blogCardTexContainer);

    const blogCardHeading = document.createElement("h2");
    blogCardHeading.classList = "blog_card-heading";
    blogCardHeading.innerText = json[9].acf.title;
    blogCardTexContainer.appendChild(blogCardHeading);

    const blogCardText = document.createElement("p");
    blogCardText.classList = "blog_card-text";
    blogCardText.innerText = json[9].acf.short_text;
    blogCardTexContainer.appendChild(blogCardText);

    const readMoreButton = document.createElement("a");
    readMoreButton.classList = "cta cta-card";
    readMoreButton.href = `blog-specific-page.html?id=${json[9].id}`;
    readMoreButton.innerText = "Read more";
    blogCardTexContainer.appendChild(readMoreButton);
  } catch (error) {
    console.log(error);
    blogPostsListContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}
fetchIndexBlogCard();
