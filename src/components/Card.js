import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.cardData);
  }

  function onLikeClick() {
    props.onCardLike(props.cardData);
  }

  function onDeleteClick() {
    props.onCardDelete(props.cardData);
  }

  return (
    <div className="gallery__card">
      <img src={props.link} className="gallery__image" alt={props.name} onClick={handleClick} />
      <button
        className="gallery__delete-button"
        type="button"
        aria-label="Delete"
        onClick={onDeleteClick}
      ></button>
      <div className="gallery__card-text">
        <h2 className="gallery__card-title">{props.name}</h2>
        <div className="gallery__like-button-container">
          <button
            className="gallery__like-button"
            id="gallery-like-button"
            type="button"
            aria-label="Like"
            onClick={onLikeClick}
          ></button>
          <span
            className="gallery__like-button-counter"
            id="gallery-like-button-counter"
          >
            {props.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
