import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__image"
            id="profile-image"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div className="profile__image-overlay"></div>
        </div>
        <div className="profile__description">
          <div className="profile__name">
            <h1 className="profile__current-name">{currentUser.name}</h1>
            <button
              className="profile__name-edit"
              type="button"
              aria-label="Edit"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-photo-button"
          aria-label="Add Photo"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery" aria-label="outCards">
        {props.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardDelete={props.onCardDelete}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
