const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const deleteCard = function (evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
};

const createCard = function (card, deleteCallback) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCallback);

  return cardElement;
};

initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});
