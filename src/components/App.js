import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Card from "./Card.js";
import { api } from '../utils/api.js'

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupIsOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupIsOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupIsOpen] =
    React.useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  

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
    setIsDeleteCardOpen(false)
    setSelectedCard();
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onDeletePopup={handleDeletePopupClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          button="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Имя"
            className="popup__input popup__input_type_name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="name-error popup__input-error"></span>
          <input
            type="text"
            name="about"
            id="description"
            placeholder="Описание"
            className="popup__input popup__input_type_description"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="description-error popup__input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="add-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="name"
            placeholder="Название"
            className="popup__input popup__input_type_title"
            id="popup-add-card-title"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup-add-card-title-error popup__input-error"></span>
          <input
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_image"
            id="popup-add-card-link"
            type="url"
            required
          />
          <span className="popup-add-card-link-error popup__input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name="add-card"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_image"
            id="popup-edit-photo-link"
            type="url"
            required
          />
          <span className="popup-edit-photo-link-error popup__input-error popup__input-error_edit-photo"></span>
        </PopupWithForm>

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isDeleteCardOpen}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
