import { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupIsOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupIsOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupIsOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const promise = api.getUserInformation();
    Promise.all(promise)
      .then((userProfileResponse) => {
        setCurrentUser(userProfileResponse);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleUpdateUser({ newName, newDescription }) {
    api.editProfile({ newName, newDescription })
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(`${err}`))
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
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

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

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
