export { createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

const createCard = function (
  card,
  deleteCallback,
  likeCallback,
  imageCallback
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCallback);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCallback);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", imageCallback);

  return cardElement;
};

const deleteCard = function (evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
};

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};
