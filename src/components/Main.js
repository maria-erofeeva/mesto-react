import React, { useState } from "react";
import { api } from "../utils/api.js";
import Card from "./Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState("Жак-Ив Кусто");
  const [userDescription, setUserDescription] = React.useState(
    "Исследователь океана"
  );
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const promises = [api.getUserInformation(), api.createCardsList()];
    console.log(promises)
    console.log(api.getUserInformation())
    Promise.all(promises)
      .then(([userProfileResponse, initialCardsResponse]) => {
        setUserName(userProfileResponse.name);
        setUserDescription(userProfileResponse.about);
        setUserAvatar(userProfileResponse.avatar);
        setCards(initialCardsResponse);
      })

      .catch((error) => {
        console.log(error);
      });
  });

  console.log({ userAvatar });

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={userAvatar}
            alt={userName}
            className="profile__image"
            id="profile-image"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <div className="profile__image-overlay"></div>
        </div>
        <div className="profile__description">
          <div className="profile__name">
            <h1 className="profile__current-name">{userName}</h1>
            <button
              className="profile__name-edit"
              type="button"
              aria-label="Edit"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__status">{userDescription}</p>
        </div>
        <button
          className="profile__add-photo-button"
          aria-label="Add Photo"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery" aria-label="outCards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onDeleteClick={props.onDeleteClick}
            />
          ))}
        </section>
    </main>
  );
}

export default Main;
