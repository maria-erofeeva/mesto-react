import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const [buttonText, setButtonText] = useState("Сохранить");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText('Сохранение...');

    props.onUpdateUser({
      newName: name,
      newDescription: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameChange}
        value={name ? name : ""}
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
        onChange={handleDescriptionChange}
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
  );
}

export default EditProfilePopup;
