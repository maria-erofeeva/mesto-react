import React from "react";

function Card({ card, onCardClick, onDeletePopup }) {

  return (
    <div className="gallery__card">
      <img src={card.link} className="gallery__image" alt={card.name} onClick={() => onCardClick(card) } />
      <button
        className="gallery__delete-button"
        type="button"
        aria-label="Delete"
        onClick={card.onDeletePopup}
      ></button>
      <div className="gallery__card-text">
        <h2 className="gallery__card-title">{card.name}</h2>
        <div className="gallery__like-button-container">
          <button
            className="gallery__like-button"
            id="gallery-like-button"
            type="button"
            aria-label="Like"
            onClick={() => {}}
          ></button>
          <span
            className="gallery__like-button-counter"
            id="gallery-like-button-counter"
          >
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
