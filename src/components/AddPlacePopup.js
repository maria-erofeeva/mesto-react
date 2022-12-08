import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [buttonText, setButtonText] = useState("Создать");

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Создание...');

    props.onAddPlace({
      newCardName: name,
      newCardLink: link,
    });
  }


  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);


  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        className="popup__input popup__input_type_title"
        id="popup-add-card-title"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        required
      />
      <span className="popup-add-card-title-error popup__input-error"></span>
      <input
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_image"
        id="popup-add-card-link"
        type="url"
        value={link}
        onChange={(evt) => setLink(evt.target.value)}
        required
      />
      <span className="popup-add-card-link-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
