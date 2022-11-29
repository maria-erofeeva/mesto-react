import React from "react";

function ImagePopup(card) {
  console.log(card)
  return (
    <>
      <div
        className={`popup popup_type_image ${
          card.isOpen ? "popup_opened" : ""
        }`}
        id={`popup-open-image`}
      >
        <div className="popup__image-container">
          <img src={card ? card.link : ''} alt="Снимок из галереи" className="popup__foto" />
          <figcaption className="popup__figcaption">{card ? card.name : ''}</figcaption>
          <button
            className="popup__close-icon"
            id="popup-open-image-close-button"
            type="button"
            aria-label="Close"
            onClick={card.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
