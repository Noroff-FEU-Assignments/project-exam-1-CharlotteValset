import { baseApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

// Fetch Blog Posts
const blogListEndApiUrl = "?acf_format=standard&per_page=10";

async function fetchBlogPosts(offset) {
  try {
    return await getBlogPosts(`${baseApiUrl}${blogListEndApiUrl}&offset=${offset}`);
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
  readMoreButton.innerText = "Find out more";
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

// Display blog cards
async function displayBlogCards() {
  try {
    //Check to see if we are loading more posts, if so exit function
    if (loadingMorePosts) {
      return;
    }
    //Indicatior if we are currently loading more posts
    loadingMorePosts = true;

    // Display loading spinner
    loaderContainer.style.display = "block";

    //Calculate the offset for fetching blog posts
    const offset = newOffset;
    // Determine how many blog cards to fetch.
    // If initial set of cards has not been displayed, fetch "initialCardsToShow" (10).
    // If not, fetch "cardsPerLoad" (2)
    const cardsToFetch = displayedBlogCards < initialCardsToShow ? initialCardsToShow : cardsPerLoad;

    const json = await fetchBlogPosts(offset, cardsToFetch);
    // If totalBlogCards is 0, update it with the total number of blog posts
    if (totalBlogCards === 0) {
      totalBlogCards = json.total;
    }

    // If no blog posts is fetched, exit the function
    if (json.length === 0) {
      loadingMorePosts = false;
      loaderContainer.style.display = "none";
      return;
    }

    // Loop through fetched json, create a blog card for each blog post and display it.
    json.forEach((blogData) => {
      const blogCard = createBlogCard(blogData);
      blogPostsListContainer.appendChild(blogCard);
    });

    // If less than 10 blog posts were fetched, dont display loading indicator
    if (json.length < 10) {
      loadingMorePosts = false;
    }

    // Check if all blog cards have been displayed
    if (displayedBlogCards >= totalBlogCards) {
      // If so, remove load more button
      const loadMoreCta = document.querySelector(".loadmore-cta");
      if (loadMoreCta) {
        loadMoreCta.remove();
      }
    } else if (json.length === 10) {
      // If there are more posts to load, create and display load more button
      const loadMoreCta = document.createElement("button");
      loadMoreCta.classList = "cta loadmore-cta";
      loadMoreCta.innerText = "Load more posts...";
      loadMoreCta.addEventListener("click", function () {
        // If we are not loading more posts when button is clicked, show the next set of cards and remove button to prevent multiple clicks
        if (!loadingMorePosts) {
          newOffset += 10;
          displayBlogCards();
          blogPostsListContainer.removeChild(loadMoreCta);
        }
      });
      blogPostsListContainer.appendChild(loadMoreCta);
    } else {
      // If not loading more posts and number of fetched posts are fewer than 10, loading is done
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
