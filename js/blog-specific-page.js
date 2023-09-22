import { baseApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

// Advanced Custom Fields Api-url
const acfUrl = "?acf_format=standard";

const blogPostContainer = document.querySelector(".blog-post_container");
const errorMessage = createMessage("error");

// Query string parameter
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//Fetch specific blog content based on the "id.
const jsonSpecific = await getBlogPosts(`${baseApiUrl}${id}${acfUrl}`);

// Function to fetch, create and display content
async function fetchBlogSpecificContent() {
  try {
    blogPostContainer.innerHTML = "";

    document.title = `My Coffee Corner | ${jsonSpecific.acf.title}`;

    const blogPostTitle = document.createElement("h1");
    blogPostTitle.className = "blog-post_heading";
    blogPostTitle.innerText = jsonSpecific.acf.title;
    blogPostContainer.appendChild(blogPostTitle);

    const blogPostImage = document.createElement("img");
    blogPostImage.setAttribute("alt", `${jsonSpecific.acf.images.alt}`);
    blogPostImage.src = jsonSpecific.acf.images.url;
    blogPostImage.className = "blog-post_image";
    blogPostImage.id = "blog-image";
    blogPostContainer.appendChild(blogPostImage);

    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    modalContainer.classList = "modal";
    blogPostContainer.appendChild(modalContainer);

    const modalImage = document.createElement("img");
    modalImage.setAttribute("alt", `${jsonSpecific.acf.images.alt}`);
    modalImage.src = jsonSpecific.acf.images.url;
    modalImage.className = "modal-image_styling";
    modalImage.id = "modal-image";
    modalContainer.appendChild(modalImage);

    const modalImageAltText = document.createElement("div");
    modalImageAltText.id = "modal-image_alt-text";
    modalContainer.appendChild(modalImageAltText);

    const blogTextContainer = document.createElement("div");
    blogTextContainer.className = "blog-post_text-container";
    blogPostContainer.appendChild(blogTextContainer);

    const blogPostText = document.createElement("p");
    blogPostText.className = "blog-post_text";
    blogPostText.innerText = jsonSpecific.acf.paragraph;
    blogTextContainer.appendChild(blogPostText);

    const blogPostInfoContainer = document.createElement("div");
    blogPostInfoContainer.className = "blog-post-info_container";
    blogPostContainer.appendChild(blogPostInfoContainer);

    const datePosted = document.createElement("p");
    datePosted.classList = "blog-post-info_text";
    datePosted.innerText = "Posted: " + jsonSpecific.acf.published_date;
    blogPostInfoContainer.appendChild(datePosted);

    const category = document.createElement("p");
    category.classList = "blog-post-info_text";
    category.innerText = "Category: " + jsonSpecific.acf.categories;
    blogPostInfoContainer.appendChild(category);
  } catch (error) {
    console.log("An error occured", error);
    blogPostContainer.innerHTML = errorMessage;
    throw new Error(error);
  }
}

fetchBlogSpecificContent();

// Modal inspired by https://www.w3schools.com/howto/howto_css_modal_images.asp
const modalContainer = document.getElementById("modal-container");

const blogImage = document.getElementById("blog-image");
const modalImage = document.getElementById("modal-image");
const modalAltText = document.getElementById("modal-image_alt-text");
// When the image is clicked, display modal
blogImage.onclick = function () {
  modalContainer.style.display = "block";
  modalImage.src = blogImage.src;
  modalAltText.innerText = blogImage.alt;
};
//Close modal when clicking outside
window.onclick = function (event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
};
//Make the modal close on touch-mobile
window.addEventListener("touchstart", function (event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
});
