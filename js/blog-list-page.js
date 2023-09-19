import { baseApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

// Fetch Blog Posts
const blogListEndApiUrl = "?acf_format=standard&per_page=10";

async function fetchBlogPosts(offset, limit) {
  try {
    return await getBlogPosts(`${baseApiUrl}${blogListEndApiUrl}&offset=${offset}&limit=${limit}`);
  } catch (error) {
    throw new Error(error);
  }
}
// Create Blog Card
function createBlogCard(blogData) {
  const blogCardContainer = document.createElement("div");
  blogCardContainer.classList = "blog_card";

  const blogCardImage = document.createElement("img");
  blogCardImage.setAttribute("alt", `${blogData.acf.images.alt}`);
  blogCardImage.classList = "blog_card-image";
  blogCardImage.src = `${blogData.acf.images.url}`;
  blogCardContainer.appendChild(blogCardImage);

  const blogCardTexContainer = document.createElement("div");
  blogCardTexContainer.classList = "blog_card-textbox";
  blogCardContainer.appendChild(blogCardTexContainer);

  const blogCardHeading = document.createElement("h2");
  blogCardHeading.classList = "blog_card-heading";
  blogCardHeading.innerText = blogData.acf.title;
  blogCardTexContainer.appendChild(blogCardHeading);

  const blogCardText = document.createElement("p");
  blogCardText.classList = "blog_card-text";
  blogCardText.innerText = blogData.acf.short_text;
  blogCardTexContainer.appendChild(blogCardText);

  const readMoreButton = document.createElement("a");
  readMoreButton.classList = "cta cta-card";
  readMoreButton.href = `blog-specific-page.html?id=${blogData.id}`;
  readMoreButton.innerText = " Read more";
  blogCardTexContainer.appendChild(readMoreButton);

  return blogCardContainer;
}

// Display Blog Cards
const loaderContainer = document.querySelector(".loader-container");
const blogPostsListContainer = document.querySelector(".blog_card-container");
const errorMessage = createMessage("error");

let loadingMorePosts = false;
const initialCardsToShow = 10;
const cardsPerLoad = 2;
let totalBlogCards = 12;
let displayedBlogCards = 0;
let newOffset = 0;

async function displayBlogCards() {
  try {
    if (loadingMorePosts) {
      return;
    }

    loadingMorePosts = true;
    loaderContainer.style.display = "block";

    const offset = newOffset;
    const cardsToFetch = displayedBlogCards < initialCardsToShow ? initialCardsToShow : cardsPerLoad;
    const json = await fetchBlogPosts(offset, cardsToFetch);

    if (totalBlogCards === 0) {
      totalBlogCards = json.total;
    }

    if (json.length === 0) {
      loadingMorePosts = false;
      loaderContainer.style.display = "none";
      return;
    }

    json.forEach((blogData) => {
      const blogCard = createBlogCard(blogData);
      blogPostsListContainer.appendChild(blogCard);
    });

    if (json.length < 10) {
      loadingMorePosts = false;
    }

    if (displayedBlogCards >= totalBlogCards) {
      const loadMoreCta = document.querySelector(".loadmore-cta");
      if (loadMoreCta) {
        loadMoreCta.remove();
      }
    } else if (json.length === 10) {
      const loadMoreCta = document.createElement("button");
      loadMoreCta.classList = "cta loadmore-cta";
      loadMoreCta.innerText = "Load more posts...";
      loadMoreCta.addEventListener("click", function () {
        if (!loadingMorePosts) {
          newOffset += 10;
          displayBlogCards();
          blogPostsListContainer.removeChild(loadMoreCta);
        }
      });
      blogPostsListContainer.appendChild(loadMoreCta);
    } else {
      loadingMorePosts = false;
    }
  } catch (error) {
    console.log(error);
    blogPostsListContainer.innerHTML = errorMessage;
    throw new Error(error);
  } finally {
    loadingMorePosts = false;
    loaderContainer.style.display = "none";
  }
}

displayBlogCards();
