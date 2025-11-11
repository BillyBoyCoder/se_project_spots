import "./index.css";
import { enableValidation } from "../scripts/validation.js";
import Api from "../utils/Api.js";

// API configuration
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f5b3fe93-a8c5-4a6d-b9be-8689b3b67c2f",
    "Content-Type": "application/json",
  },
});

// DOM elements - cards
const cardTemplate = document.querySelector("#card-template");
const cardsListElement = document.querySelector(".cards__list");

// DOM elements - profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const newPostBtn = document.querySelector(".profile__new-post-btn");

// DOM elements - modals
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__submit-btn");

const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSaveBtn = newPostModal.querySelector(".modal__submit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__img-close-btn");

// DOM elements - avatar modal
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

// DOM elements - delete modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteSubmitBtn = deleteModal.querySelector(".modal__submit-btn_delete");
const deleteCancelBtn = deleteModal.querySelector(".modal__submit-btn_cancel");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");

// DOM elements - form inputs
const profileNameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

// Global variables for delete functionality
let cardToDelete = null;

// Modal management
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

// Card creation function
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

  // Set initial like state based on data
  if (data.isLiked) {
    likeButton.classList.add("card__like-button_liked");
  }

  // Like button: toggle liked state via API
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__like-button_liked");
    
    if (isLiked) {
      // Unlike the card
      api.unlikeCard(data._id)
        .then((updatedCard) => {
          likeButton.classList.remove("card__like-button_liked");
          data.isLiked = updatedCard.isLiked;
        })
        .catch((err) => {
          console.error("Error unliking card:", err);
        });
    } else {
      // Like the card
      api.likeCard(data._id)
        .then((updatedCard) => {
          likeButton.classList.add("card__like-button_liked");
          data.isLiked = updatedCard.isLiked;
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    }
  });

  // Delete button: open delete confirmation modal
  deleteButton.addEventListener("click", () => {
    cardToDelete = { element: cardElement, data: data };
    openModal(deleteModal);
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

// Validation helper function
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

// Form submission handlers
function handleProfileFormSubmit(evt) {
  // Prevent the default form submit behavior
  evt.preventDefault();

  // Get the form values
  const name = profileNameInput.value;
  const about = descriptionInput.value;

  // Send the updated profile data to the API
  api
    .editUserInfo({ name, about })
    .then((updatedUser) => {
      // Update the DOM with the response from the server
      profileName.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;

      // Reset the form and close the modal
      evt.target.reset();
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
      // You could show an error message to the user here
    });
}



function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  // Get the form values
  const name = cardCaptionInput.value;
  const link = linkInput.value;

  // Send the new card data to the API
  api.addCard({ name, link })
    .then((newCardData) => {
      // Create and add the card element to the DOM using the response from server
      const newCardElement = getCardElement(newCardData);
      cardsListElement.prepend(newCardElement);

      // Reset the form and close the modal
      evt.target.reset();
      closeModal(newPostModal);
    })
    .catch((err) => {
      console.error("Error adding card:", err);
      // You could show an error message to the user here
    });
}


  // Avatar form submission handler
  function handleAvatarSubmit(evt) {
    // Prevent default form submit behavior
    evt.preventDefault();
    
    // Get the avatar URL from the input
    const avatar = avatarInput.value;
    
    // Send the updated avatar data to the API
    api.editAvatarInfo({ avatar })
      .then((updatedUser) => {
        // Update the avatar image in the DOM
        const profileAvatar = document.querySelector(".profile__avatar");
        if (profileAvatar) {
          profileAvatar.src = updatedUser.avatar;
        }
        
        // Reset the form and close the modal
        evt.target.reset();
        closeModal(avatarModal);
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
        // You could show an error message to the user here
      });
  }

// Event listeners
// Avatar modal
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
  // Initialize button state but skip showing validation errors
  updateModalSubmitState(avatarModal, true);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

// Delete modal
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  
  if (cardToDelete && cardToDelete.data && cardToDelete.data._id) {
    // Call API to delete card
    api.deleteCard(cardToDelete.data._id)
      .then(() => {
        // Remove card from DOM
        cardToDelete.element.remove();
        cardToDelete = null;
        closeModal(deleteModal);
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  }
}

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
  cardToDelete = null;
});

deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
  cardToDelete = null;
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Edit profile modal
editProfileBtn.addEventListener("click", function () {
  // Open the modal
  openModal(editProfileModal);

  // Fill in the current values of the profile into the form inputs
  profileNameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  // Run validation handlers and update submit button on open
  updateModalSubmitState(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// Attach submit listener to the edit profile form
const editProfileForm = editProfileModal.querySelector(".modal__form");
if (editProfileForm) {
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);
}

// New post modal
newPostBtn.addEventListener("click", function () {
  // Open the modal
  openModal(newPostModal);
  // Initialize button state but skip showing validation errors
  updateModalSubmitState(newPostModal, true);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Create the submit listener for new post
newPostModal.addEventListener("submit", handleAddCardSubmit);

// Preview modal
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Initialize API data
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    // Handle cards
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsListElement.append(cardElement);
    });

    // Handle the user's information
    // - set the src of the avatar image
    const profileAvatar = document.querySelector(".profile__avatar");
    if (profileAvatar && userInfo.avatar) {
      profileAvatar.src = userInfo.avatar;
    }

    // - set the textContent of both the text elements
    if (userInfo.name) {
      profileName.textContent = userInfo.name;
    }
    if (userInfo.about) {
      profileDescription.textContent = userInfo.about;
    }
  })
  .catch((err) => {
    console.error("Error fetching app info:", err);
  });

// Initialize validation
enableValidation(window.validationSettings);
