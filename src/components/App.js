import { useState, useEffect } from "react";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupIsOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupIsOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupIsOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInformation()
      .then((userProfileResponse) => {
        setCurrentUser(userProfileResponse);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .createCardsList()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(`${err}`));
  }, []);

  function handleUpdateUser({ newName, newDescription }) {
    api
      .editProfile({ newName, newDescription })
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setNewPhoto({ avatar })
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleAddPlaceSubmit({ newCardName, newCardLink }) {
    api
      .addNewCard({ newCardName, newCardLink })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .unlikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`${err}`));
    } else {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`${err}`));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleAddPlaceClick() {
    setAddPlacePopupIsOpen(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupIsOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupIsOpen(true);
  }

  function handleDeletePopupClick() {
    setIsDeleteCardOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  function closeAllPopups() {
    setAddPlacePopupIsOpen(false);
    setEditAvatarPopupIsOpen(false);
    setEditProfilePopupIsOpen(false);
    setIsDeleteCardOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeletePopup={handleDeletePopupClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={isDeleteCardOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
