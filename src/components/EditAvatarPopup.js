import React, { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const [buttonText, setButtonText] = useState("Сохранить");

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Сохранение...');

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Обновить аватар"
      buttonText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_image"
        id="popup-edit-photo-link"
        type="url"
        ref={avatarRef}
        required
      />
      <span className="popup-edit-photo-link-error popup__input-error popup__input-error_edit-photo"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
