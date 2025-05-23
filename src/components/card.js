export { createCard, deleteCard, likeCard };
import { likeRequest, deleteCardRequest } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const createCard = function (
  card,
  deleteCallback,
  likeCallback,
  imageCallback,
  userId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCallback);
  cardElement.dataset.cardId = card._id;

  if (card.likes && card.likes.some((user) => user._id === userId)) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", deleteCallback);
  } else {
    deleteButton.remove();
  }

  cardElement.querySelector(".card__like-count").textContent =
    card.likes.length;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", imageCallback);

  return cardElement;
};

const deleteCard = function (evt) {
  const cardElement = evt.target.closest(".card");
  deleteCardRequest(cardElement.dataset.cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

function likeCard(evt) {
  let method = "";
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    method = "PUT";
  } else {
    method = "DELETE";
  }
  likeRequest(evt.target.closest(".card").dataset.cardId, method)
    .then((cardData) => {
      evt.target.nextElementSibling.textContent = cardData.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}
