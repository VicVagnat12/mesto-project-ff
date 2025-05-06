import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "../components/card";
import { closePopup, openPopup } from "../components/modal";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "../components/validation";

import {
  editProfile,
  addNewCard,
  addNewAvatar,
  userPromise,
  cardsPromise,
} from "../components/api";
export { openImage, fillUserProfile, fillCards };

const inputUrl = document.querySelector("#profile-url-input");
const formEditProfile = document.forms["edit-profile"];
const formNewAvatar = document.forms["new-avatar"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const placesList = document.querySelector(".places__list");
const profileImage = document.querySelector(".profile__image");
const formNewPlace = document.forms["new-place"];
const addCardButton = document.querySelector(".profile__add-button");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
let userId = "";

const promises = [userPromise(), cardsPromise()];

Promise.all(promises)
  .then((results) => {
    fillUserProfile(results[0]);
    userId = results[0]._id;
    fillCards(results[1]);
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

const submitButtonText = {
  saving: "Сохранение...",
  save: "Сохранить",
};

function savingButtonText(buttonElement, text) {
  buttonElement.textContent = submitButtonText[text];
}

function fillUserProfile(profileData) {
  const profileImage = document.querySelector(".profile__image");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileImage.style.backgroundImage = `url(${profileData.avatar})`;
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
}

function fillCards(arrCards) {
  arrCards.forEach(function (card) {
    const cardElement = createCard(
      card,
      deleteCard,
      likeCard,
      openImage,
      userId
    );
    placesList.append(cardElement);
  });
}

function openImage(evt) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const image = evt.target;

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupCaption.textContent = image.alt;

  openPopup(document.querySelector(".popup_type_image"));
}

function openAvatar() {
  const bgImage = profileImage.style.backgroundImage;
  const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);

  if (urlMatch && urlMatch[1]) {
    inputUrl.value = urlMatch[1];
  }

  clearValidation(formNewAvatar, validationConfig);
  openPopup(document.querySelector(".popup_type_avatar"));
}

function avatarFormSubmit(evt) {
  evt.preventDefault();
  savingButtonText(evt.target.querySelector(".popup__button"), "saving");

  const newAvatarUrl = inputUrl.value;
  const popupElement = evt.target.closest(".popup");

  addNewAvatar(newAvatarUrl)
    .then((updatedData) => {
      fillUserProfile(updatedData);
      closePopup(popupElement);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      savingButtonText(evt.target.querySelector(".popup__button"), "save");
    });
}

profileImage.addEventListener("click", openAvatar);
formNewAvatar.addEventListener("submit", avatarFormSubmit);

function fillEditPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function profileFormSubmit(evt) {
  evt.preventDefault();

  savingButtonText(evt.target.querySelector(".popup__button"), "saving");
  const name = nameInput.value;
  const job = jobInput.value;
  const popupElement = evt.target.closest(".popup");

  editProfile({
    name: name,
    about: job,
  })
    .then((updatedData) => {
      fillUserProfile(updatedData);
      closePopup(popupElement);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      savingButtonText(evt.target.querySelector(".popup__button"), "save");
    });
}

formEditProfile.addEventListener("submit", profileFormSubmit);

editButton.addEventListener("click", function () {
  const editPopup = document.querySelector(".popup_type_edit");
  fillEditPopup();
  openPopup(editPopup);
  clearValidation(formEditProfile, validationConfig);
});

addCardButton.addEventListener("click", function () {
  const newCardPopup = document.querySelector(".popup_type_new-card");
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);

  openPopup(newCardPopup);
});

function cardFormSubmit(evt) {
  evt.preventDefault();

  savingButtonText(evt.target.querySelector(".popup__button"), "saving");
  const popupElement = evt.target.closest(".popup");
  const newCardName = cardNameInput.value;
  const newCardSrc = urlInput.value;
  const card = {
    name: newCardName,
    link: newCardSrc,
  };

  addNewCard(card)
    .then((updatedData) => {
      const newCard = createCard(
        updatedData,
        deleteCard,
        likeCard,
        openImage,
        userId
      );
      placesList.prepend(newCard);
      closePopup(popupElement);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    })
    .finally(() => {
      savingButtonText(evt.target.querySelector(".popup__button"), "save");
    });
}

formNewPlace.addEventListener("submit", cardFormSubmit);

enableValidation(validationConfig);
