// Create the initialCards array
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Street at dusk",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

// Select the template and the container for cards
const cardTemplate = document.querySelector("#card-template");
const cardsListElement = document.querySelector(".cards__list");

// Create a function that builds a card element from data
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  imageElement.src = data.link;
  imageElement.alt = data.name;
  titleElement.textContent = data.name;

  // Like button: toggle liked state on click
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_liked");
  });

  // Delete button: remove the card from DOM
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Image click: open preview modal with larger image and caption
  imageElement.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// Render initial cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsListElement.prepend(cardElement);
});

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__submit-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__submit-btn");

// Profile text elements (where current values are displayed)
const profileName = document.querySelector(".profile__name");
console.log(`Profile Name: ${profileName.textContent} `);
const profileDescription = document.querySelector(".profile__description");

// Form input elements (where values need to be filled)
const profileNameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

// Preview image modal elements
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__img-close-btn");

// Modal open and close functions
const openModalClass = "modal_is-opened";

function openModal(modal) {
  if (!modal) return;
  modal.classList.add(openModalClass);

  // Handler to close modal if clicking on overlay (not content)
  function overlayClickHandler(evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  }
  // Attach handler and store reference for cleanup
  modal._overlayClickHandler = overlayClickHandler;
  modal.addEventListener("mousedown", overlayClickHandler);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove(openModalClass);
  // Remove overlay click handler if present
  if (modal._overlayClickHandler) {
    modal.removeEventListener("mousedown", modal._overlayClickHandler);
    delete modal._overlayClickHandler;
  }
}

// Convenience helper: run the project's validation handlers for all inputs
// inside a modal and update the submit button state. This dispatches an
// 'input' event for each input so the existing listeners run (show errors)
// then calls the shared toggleButtonState helper exposed by validation.js.
function updateModalSubmitState(modal, skipErrorDisplay = false) {
  if (
    !modal ||
    typeof window.toggleButtonState !== "function" ||
    !window.validationSettings
  )
    return;
  const form = modal.querySelector(".modal__form");
  if (!form) return;
  const inputs = Array.from(
    form.querySelectorAll(window.validationSettings.inputSelector)
  );
  const submit = form.querySelector(
    window.validationSettings.submitButtonSelector
  );

  // Special case for new post modal: disable button if both inputs are empty
  if (modal.id === "new-post-modal") {
    const cardImageInput = form.querySelector("#card-image-input");
    const cardCaptionInput = form.querySelector("#card-caption-input");
    if (
      cardImageInput &&
      cardCaptionInput &&
      !cardImageInput.value.trim() &&
      !cardCaptionInput.value.trim()
    ) {
      submit.disabled = true;
      submit.classList.add(window.validationSettings.inactiveButtonClass);
      // Clear any existing error states when both are empty
      inputs.forEach((input) => {
        input.classList.remove(window.validationSettings.inputErrorClass);
        const errorElement = input.nextElementSibling;
        if (errorElement) {
          errorElement.textContent = "";
          errorElement.classList.remove(window.validationSettings.errorClass);
        }
      });
      return; // Skip normal validation
    }
  }

  // Only show validation UI if we're not skipping error display
  if (!skipErrorDisplay) {
    inputs.forEach((inp) =>
      inp.dispatchEvent(new Event("input", { bubbles: true }))
    );
  }
  // Always update submit button state
  window.toggleButtonState(inputs, submit, window.validationSettings);
}

newPostBtn.addEventListener("click", function () {
  // Open the modal
  openModal(newPostModal);
  // Initialize button state but skip showing validation errors
  updateModalSubmitState(newPostModal, true);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

editProfileBtn.addEventListener("click", function () {
  // Open the modal
  openModal(editProfileModal);

  // Fill in the current values of the profile
  // into the form inputs
  // by setting the value property of each input element.
  profileNameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // Run validation handlers and update submit button on open
  updateModalSubmitState(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  // Close the modal
  closeModal(editProfileModal);
});

// Attach submit listener to the edit profile form so evt.target is the form
const editProfileForm = editProfileModal.querySelector(".modal__form");
if (editProfileForm) {
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);
} else {
  // Fallback: keep old behavior on the button (less ideal)
  editProfileSaveBtn.addEventListener("click", handleProfileFormSubmit);
}
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

function handleProfileFormSubmit(evt) {
  // Prevent the default form submit behavior
  evt.preventDefault();

  // Insert these new values into the textContent
  // property of the corresponding profile elements.
  // Use textContent to avoid interpreting user input as HTML
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = descriptionInput.value;

  evt.target.reset();

  // Close the modal.
  closeModal(editProfileModal);
}

// Select the necessary form elements. You should select
// these from inside the modal, not the document.
//const addCardFormElement =  newPostModal.querySelector("#new-post-modal");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Build a new card from input values and add it to the DOM as first item.
  const newCardData = {
    name: cardCaptionInput.value,
    link: linkInput.value,
  };

  const newCardElement = getCardElement(newCardData);
  cardsListElement.prepend(newCardElement);

  evt.target.reset();

  // Close the modal.
  closeModal(newPostModal);
}

// Create the submit listener.
newPostModal.addEventListener("submit", handleAddCardSubmit);
