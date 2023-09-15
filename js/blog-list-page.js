import { baseApiUrl } from "./variables.js";
import { endpointApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const blogPostsListContainer = document.querySelector(".blog_card-container");
const errorMessage = createMessage("error");

async function fetchblogCard() {
  try {
    blogPostsListContainer.innerHTML = "";

    const json = await getBlogPosts(`${baseApiUrl}${endpointApiUrl}`);

    for (let i = 0; i < json.length; i++) {
      if (i === 10) {
        break;
      }

      const blogCardContainer = document.createElement("div");
      blogCardContainer.classList = "blog_card";
      blogPostsListContainer.appendChild(blogCardContainer);

      const blogCardImage = document.createElement("img");
      blogCardImage.setAttribute("alt", `${json[i].acf.images.alt}`);
      blogCardImage.classList = "blog_card-image";
      blogCardImage.src = `${json[i].acf.images.url}`;
      blogCardContainer.appendChild(blogCardImage);

      const blogCardTexContainer = document.createElement("div");
      blogCardTexContainer.classList = "blog_card-textbox";
      blogCardContainer.appendChild(blogCardTexContainer);

      const blogCardHeading = document.createElement("h2");
      blogCardHeading.classList = "blog_card-heading";
      blogCardHeading.innerText = json[i].acf.title;
      blogCardTexContainer.appendChild(blogCardHeading);

      const blogCardText = document.createElement("p");
      blogCardText.classList = "blog_card-text";
      blogCardText.innerText = json[i].acf.short_text;
      blogCardTexContainer.appendChild(blogCardText);

      const readMoreButton = document.createElement("a");
      readMoreButton.classList = "cta cta-card";
      readMoreButton.href = `blog-specific-page.html?id=${json[i].id}`;
      readMoreButton.innerText = " Read more";
      blogCardTexContainer.appendChild(readMoreButton);
    }
  } catch (error) {
    console.log(error);
    blogPostsListContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}
fetchblogCard();
