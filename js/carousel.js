import { baseApiUrl, endpointApiUrl } from "./variables.js";
import { getBlogPosts } from "./variables.js";
import { createMessage } from "./errorMessage.js";

const carousel = document.getElementById("carousel");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const errorMessage = createMessage("error");
let currentPosition = 0;

function showCards(visibleCards) {
  const cardElements = carousel.querySelectorAll(".latest-posts_card");
  cardElements.forEach((currentCard, i) => {
    if (i >= visibleCards && i < visibleCards + 3) {
      currentCard.style.display = "block";
    } else {
      currentCard.style.display = "none";
    }
  });
}

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

function nextCards() {
  currentPosition = (currentPosition + 3) % carousel.children.length;
  showCards(currentPosition);
}

function prevCards() {
  currentPosition = (currentPosition - 3 + carousel.children.length) % carousel.children.length;
  showCards(currentPosition);
}

leftButton.addEventListener("click", prevCards);
rightButton.addEventListener("click", nextCards);

fetchAndCreateCards();
