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
];

// Use forEach() to log the name of each place to the console
initialCards.forEach((card) => {
  console.log(`${card.name} - ${card.link}`);
});

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSaveBtn = editProfileModal.querySelector(".modal__submit-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// Profile text elements (where current values are displayed)
const profileName = document.querySelector(".profile__name");
console.log(`Profile Name: ${profileName.textContent} `);
const profileDescription = document.querySelector(".profile__description");

// Form input elements (where values need to be filled)
const profileNameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");

// Modal open and close functions
function openModal(modal) {
  modal.classList.add("modal--open");
}

function closeModal(modal) {
  modal.classList.remove("modal--open");
}

newPostBtn.addEventListener("click", function () {
  // Open the modal
  openModal(newPostModal);
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
});

editProfileCloseBtn.addEventListener("click", function () {
  // Close the modal
  closeModal(editProfileModal);
});

editProfileSaveBtn.addEventListener("click", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  // Prevent the default form submit behavior
  evt.preventDefault();
  
  // Insert these new values into the textContent
  // property of the corresponding profile elements.
  profileName.innerHTML = profileNameInput.value;
  profileDescription.innerHTML = descriptionInput.value;

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

  // Log both input values to the console.
  console.log(`Name: ${cardCaptionInput.value}, Link: ${linkInput.value}`);

  // Close the modal.
  closeModal(newPostModal);
}

// Create the submit listener.
newPostModal.addEventListener("submit", handleAddCardSubmit);
