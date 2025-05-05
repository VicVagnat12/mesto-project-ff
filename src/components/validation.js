export {validationConfig, enableValidation, clearValidation};

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__submit_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
};

const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, options);
    });
};

const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    { inputErrorClass, errorClass }
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (
    formElement,
    inputElement,
    { inputErrorClass, errorClass }
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

const isValid = (formElement, inputElement, options) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            options
        );
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

const setEventListeners = (formElement, options) => {
    const inputList = Array.from(
        formElement.querySelectorAll(options.inputSelector)
    );
    const buttonElement = formElement.querySelector(options.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, options);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            isValid(formElement, inputElement, options);
            toggleButtonState(inputList, buttonElement, options);
        });
    });
};

const clearValidation = (formElement, options) => {
    const inputList = Array.from(
        formElement.querySelectorAll(options.inputSelector)
    );
    const buttonElement = formElement.querySelector(options.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, options);
        inputElement.setCustomValidity("");
    });
    toggleButtonState(inputList, buttonElement, options);
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, options) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(options.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(options.inactiveButtonClass);
    }
};
