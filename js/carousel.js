import { baseApiUrl, endpointApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

// Carousel inspired by https://codepen.io/Nathan_James/pen/BvNLzO?editors=1010 and modified

const carousel = document.getElementById("carousel");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const errorMessage = createMessage("error");
// Initialize the current position of the cards in the carousel
let currentPosition = 0;

// Function to display a specific set of cards in the carousel
function showCards(visibleCards) {
  const cardElements = carousel.querySelectorAll(".latest-posts_card");

  // Loop through card elements and set their display style
  cardElements.forEach((currentCard, i) => {
    if (i >= visibleCards && i < visibleCards + 3) {
      // If the current card should be visible, display it
      currentCard.style.display = "block";
    } else {
      // If the current card should be hidden, dont display it
      currentCard.style.display = "none";
    }
  });
}

// Function to fetch blog posts and create card elements and display them
async function fetchAndCreateCards() {
  try {
    carousel.innerHTML = "";

    const json = await getBlogPosts(`${baseApiUrl}${endpointApiUrl}`);

    for (let i = 0; i < json.length && i < 9; i++) {
      const card = document.createElement("a");
      card.classList = "latest-posts_card";
      card.href = `/blog-specific-page.html?id=${json[i].id}`;
      carousel.appendChild(card);

      const cardImage = document.createElement("img");
      cardImage.classList = "latest-posts_card-image";
      cardImage.setAttribute("alt", `${json[i].acf.images.alt}`);
      cardImage.src = `${json[i].acf.images.url}`;
      card.appendChild(cardImage);

      const cardTitle = document.createElement("h3");
      cardTitle.classList = "latest-posts_card-heading";
      cardTitle.innerText = `${json[i].acf.title}`;
      card.appendChild(cardTitle);
    }
    showCards(currentPosition);
  } catch (error) {
    console.error(error);
    carousel.innerHTML = errorMessage;
  }
}

// Function to display the next set of cards in the carousel
function nextCards() {
  // Calculate the new current position for the next set of cards
  currentPosition = (currentPosition + 3) % carousel.children.length;
  // Show the cards at the new position
  showCards(currentPosition);
}

// Function to display the previous set of cards in the carousel
function prevCards() {
  // Calculate the new current position for the previous set of cards
  currentPosition = (currentPosition - 3 + carousel.children.length) % carousel.children.length;
  // Show the cards at the new position
  showCards(currentPosition);
}

// Add event listeners to left and right buttons to navigate through cards
leftButton.addEventListener("click", prevCards);
rightButton.addEventListener("click", nextCards);

fetchAndCreateCards();
