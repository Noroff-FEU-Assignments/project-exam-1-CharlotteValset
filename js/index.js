import { baseApiUrl, endpointApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const json = await getBlogPosts(`${baseApiUrl}${endpointApiUrl}`);
const errorMessage = createMessage("error");

const latestPostsContainer = document.querySelector(".carousel-mobile");

async function fetchLatestPostsImage() {
  try {
    latestPostsContainer.innerHTML = "";

    for (let i = 0; i < json.length; i++) {
      if (i === 4) {
        break;
      }

      const latestPostsCard = document.createElement("a");
      latestPostsCard.href = `blog-specific-page.html?id=${json[i].id}`;
      latestPostsCard.classList = "carousel-mobile";
      latestPostsContainer.appendChild(latestPostsCard);

      const latestPostsCardImage = document.createElement("img");
      latestPostsCardImage.setAttribute("alt", `${json[i].acf.images.alt}`);
      latestPostsCardImage.classList = "latest-posts_card-image";
      latestPostsCardImage.src = `${json[i].acf.images.url}`;
      latestPostsCard.appendChild(latestPostsCardImage);
    }
  } catch (error) {
    console.log("Ooops, something happend!", error);
    latestPostsContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}

fetchLatestPostsImage();
