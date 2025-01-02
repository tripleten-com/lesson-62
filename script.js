const messageList = [
  {
    image: "https://code.s3.yandex.net/web-code/card__image.jpg",
    text: "¡Hola, necesitamos ajustar nuestro chat lo antes posible!"
  },
  {
    text: "Aquí está la tarjeta de chat del usuario.",
    isOwner: true
  },
  {
    image: "https://code.s3.yandex.net/web-code/card__image.jpg",
    text: "¡La respuesta!"
  },
];

class Card {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEventListeners() {
    this._element.querySelector(".card__text").addEventListener("click", () => {
      this._handleMessageClick();
    });
  }

  _handleMessageClick() {
    this._element.querySelector(".card__text").classList.toggle("card__text_is-active");
  }
}

class UserCard extends Card {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._text = data.text;
  }

  generateCard() {
    super._getTemplate();
    super._setEventListeners();

    this._element.querySelector(".card__paragraph").textContent = this._text;

    return this._element;
  }
};

class DefaultCard extends Card {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._text = data.text;
    this._image = data.image;
  }

  generateCard() {
    super._getTemplate();
    super._setEventListeners();

    this._element.querySelector(".card__avatar").src = this._image;
    this._element.querySelector(".card__paragraph").textContent = this._text;

    return this._element;
  }
}

messageList.forEach((item) => {
  const card = item.isOwner
    ? new UserCard(item, ".card-template_type_user")
    : new DefaultCard(item, ".card-template_type_default");

  const cardElement = card.generateCard();

  document.body.append(cardElement);
});