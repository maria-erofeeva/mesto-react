import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const user = useContext(CurrentUserContext);

  const isOwn = card.owner._id === user._id;

  const cardDeleteButtonClassName = `gallery__delete-button ${
    isOwn ? "" : "gallery__delete-button_inactive"
  }`;

  const isLiked = card.likes.some((i) => i._id === user._id);

  const cardLikeButtonClassName = `gallery__like-button ${
    isLiked ? "gallery__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="gallery__card">
      <img
        src={card.link}
        className="gallery__image"
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Delete"
        onClick={handleDeleteClick}
      ></button>
      <div className="gallery__card-text">
        <h2 className="gallery__card-title">{card.name}</h2>
        <div className="gallery__like-button-container">
          <button
            className={cardLikeButtonClassName}
            id="gallery-like-button"
            type="button"
            aria-label="Like"
            onClick={handleLikeClick}
          ></button>
          <span
            className="gallery__like-button-counter"
            id="gallery-like-button-counter"
          ></span>
        </div>
      </div>
    </div>
  );
}

export default Card;
