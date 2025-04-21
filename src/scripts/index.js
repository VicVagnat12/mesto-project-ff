import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, likeCard } from "../components/card";
import { closePopup, openPopup } from "../components/modal";

const placesList = document.querySelector(".places__list");

function openImage(evt) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const image = evt.target;

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;

  openPopup(document.querySelector(".popup_type_image"));
};

initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard, likeCard, openImage);
  placesList.append(cardElement);
});

const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");

function fillEditPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

function profileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  nameProfile.textContent = name;
  jobProfile.textContent = job;

  const popupElement = evt.target.closest(".popup");
  closePopup(popupElement);
};

formEditProfile.addEventListener("submit", profileFormSubmit);

editButton.addEventListener("click", function () {
  const editPopup = document.querySelector(".popup_type_edit");
  fillEditPopup();
  openPopup(editPopup);
});

const formNewPlace = document.forms["new-place"];
const addCardButton = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", function () {
  const newCardPopup = document.querySelector(".popup_type_new-card");
  openPopup(newCardPopup);
});

function cardFormSubmit(evt) {
  evt.preventDefault();

  const newCardName = cardNameInput.value;
  const newCardSrc = urlInput.value;
  const card = {
    name: newCardName,
    link: newCardSrc,
  };

  cardNameInput.value = "";
  urlInput.value = "";

  const cardElement = createCard(card, deleteCard, likeCard, openImage);
  placesList.prepend(cardElement);

  const popupElement = evt.target.closest(".popup");
  closePopup(popupElement);
};

formNewPlace.addEventListener("submit", cardFormSubmit);
