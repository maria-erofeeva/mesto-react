import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      newName: name,
      newDescription: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        onChange={handleNameChange}
        value={ name || ""}
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
        value={ description || ""}
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
