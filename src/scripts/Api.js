class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "f5b3fe93-a8c5-4a6d-b9be-8689b3b67c2f",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}


export default Api;