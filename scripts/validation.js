// validation.js
// Expose enableValidation(config) to wire browser validation messages into
// adjacent .modal__error elements. The function accepts a configuration object:
// {
//   formSelector,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass
// }

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = inputElement.nextElementSibling;
  if (!errorElement) return;
  errorElement.textContent = errorMessage;
  // Toggle classes according to config instead of inline styles
  if (errorMessage) {
    if (config.errorClass) errorElement.classList.add(config.errorClass);
    if (config.inputErrorClass) inputElement.classList.add(config.inputErrorClass);
  } else {
    if (config.errorClass) errorElement.classList.remove(config.errorClass);
    if (config.inputErrorClass) inputElement.classList.remove(config.inputErrorClass);
  }
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.checkValidity()) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return false;
  }
  showInputError(formElement, inputElement, "", config);
  return true;
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    // On submit, check all inputs and prevent submission if any invalid
    const allValid = inputList.every((input) => checkInputValidity(formElement, input, config));
    if (!allValid) evt.preventDefault();
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (!buttonElement) return;
  const hasInvalid = inputList.some((input) => !input.checkValidity());
  if (hasInvalid) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Export for use by other scripts; browsers without module support can access via window
if (typeof module !== "undefined") {
  module.exports = { enableValidation };
} else {
  window.enableValidation = enableValidation;
}

// Per project requirements: call enableValidation from this file using a
// configuration object tailored to this project's selectors/classes.
// Update these values if you change markup/classes elsewhere.
try {
  const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };

  // Call enableValidation to wire validation on page load.
  if (typeof window !== "undefined" && typeof window.enableValidation === "function") {
    window.enableValidation(settings);
  } else if (typeof enableValidation === "function") {
    enableValidation(settings);
  }
} catch (err) {
  // don't throw during import; initialization is best-effort
   console.warn("Validation auto-init failed:", err);
}
