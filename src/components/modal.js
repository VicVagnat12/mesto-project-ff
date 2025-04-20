export { closePopup, openPopup };

const closePopup = function (popup) {
    popup.classList.remove("popup_is-opened");
    const closePopupButton = popup.querySelector(".popup__close");
    closePopupButton.removeEventListener("click", closeByCloss);
    popup.removeEventListener("click", closeByOverlay);
    document.removeEventListener("keydown", closeByEscape);
};

const openPopup = function (popup) {
    popup.classList.add("popup_is-opened");
    const closePopupButton = popup.querySelector(".popup__close");
    
    closePopupButton.addEventListener("click", closeByCloss);
    popup.addEventListener("click", closeByOverlay);
    document.addEventListener("keydown", closeByEscape);
};

function closeByCloss(evt) {
    const popupElement = evt.target.closest(".popup");
    closePopup(popupElement);
};

function closeByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
};

function closeByEscape(evt) {
    if (evt.key === "Escape" || evt.keyCode === 27) {
        const popupElement = document.querySelector(".popup_is-opened");
        closePopup(popupElement);
    }
};
