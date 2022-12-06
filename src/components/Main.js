import React, {useEffect, useState, useContext} from "react";
import { api } from "../utils/api.js";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then(cards => setCards(cards))
      .catch(err => console.log(`${err}`))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}

function handleCardDelete(card) {
  api.deleteCard(card._id)
    .then(() => {
      setCards(cards => cards.filter(c => c._id !== card._id))
    })
    .catch(err => console.log(`${err}`));
}

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
        {cards.map((card) => (
          <Card
          key={card.id}
          card={card}
          onCardDelete={handleCardDelete}
          onCardClick={props.onCardClick}
          onCardLike={handleCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
