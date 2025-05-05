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
} from "../components/api";
export { openImage, placesList, fillUserProfile, fillCards};

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

const submitButtonText = {
  saving: "Сохранение...",
  save: "Сохранить",
};

function savingButtonText(buttonElement) {
  buttonElement.textContent = submitButtonText.saving;
};

function saveButtonText(buttonElement) {
  buttonElement.textContent = submitButtonText.save;
};


function fillUserProfile(profileData) {
  const profileImage = document.querySelector(".profile__image");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileElement = document.querySelector(".profile");

  profileElement.dataset.userId = profileData._id;

  profileImage.style.backgroundImage = `url(${profileData.avatar})`;
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
}

function fillCards(arrCards) {
  arrCards.forEach(function (card) {
      const cardElement = createCard(card, deleteCard, likeCard, openImage);
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
};

function openAvatar(evt) {
  evt.preventDefault();
  inputUrl.value = profileImage.style.backgroundImage.slice(5, -2);

  openPopup(document.querySelector(".popup_type_avatar"));
  clearValidation(formNewAvatar, validationConfig);
};

function avatarFormSubmit(evt) {
  evt.preventDefault();
  savingButtonText(evt.target.querySelector(".popup__button"));

  const newAvatarUrl = inputUrl.value;
  const popupElement = evt.target.closest(".popup");

  addNewAvatar(newAvatarUrl)
    .then((updatedData) => {
      fillUserProfile(updatedData);
      closePopup(popupElement);
      saveButtonText(evt.target.querySelector(".popup__button"));
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      saveButtonText(evt.target.querySelector(".popup__button"));
    });
};

profileImage.addEventListener("click", openAvatar);
formNewAvatar.addEventListener("submit", avatarFormSubmit);

function fillEditPopup() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

function profileFormSubmit(evt) {
  evt.preventDefault();

  savingButtonText(evt.target.querySelector(".popup__button"));
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
      saveButtonText(evt.target.querySelector(".popup__button"));
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      saveButtonText(evt.target.querySelector(".popup__button"));
    });
};

formEditProfile.addEventListener("submit", profileFormSubmit);

editButton.addEventListener("click", function () {
  const editPopup = document.querySelector(".popup_type_edit");
  fillEditPopup();
  openPopup(editPopup);
  clearValidation(formEditProfile, validationConfig);
});

addCardButton.addEventListener("click", function () {
  const newCardPopup = document.querySelector(".popup_type_new-card");
  openPopup(newCardPopup);
});

function cardFormSubmit(evt) {
  evt.preventDefault();

  savingButtonText(evt.target.querySelector(".popup__button"));
  const popupElement = evt.target.closest(".popup");
  const newCardName = cardNameInput.value;
  const newCardSrc = urlInput.value;
  const card = {
    name: newCardName,
    link: newCardSrc,
  };

  clearValidation(formNewPlace, validationConfig);

  addNewCard(card)
    .then((updatedData) => {
      createCard(updatedData, deleteCard, likeCard, openImage);
      closePopup(popupElement);

      cardNameInput.value = "";
      urlInput.value = "";

      saveButtonText(evt.target.querySelector(".popup__button"));
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      saveButtonText(evt.target.querySelector(".popup__button"));
    });
};

formNewPlace.addEventListener("submit", cardFormSubmit);

enableValidation(validationConfig);
