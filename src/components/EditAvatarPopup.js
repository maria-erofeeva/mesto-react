import React, { useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Обновить аватар"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
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
