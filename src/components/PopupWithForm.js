import React from "react";

function PopupWithForm(props) {
  return (
    <div
        className={`popup popup_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
        id={`popup-${props.name}`}
      >
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="popup__form"
            name={props.name}
            id={`popup-${props.name}-form`}
            noValidate
          >
            {props.children}
            <button
              name="button"
              className="popup__button popup__save"
              type="submit"
              aria-label="Save"
            >
              {props.buttonText}
            </button>
          </form>
          <button
            className="popup__close-icon"
            type="button"
            aria-label="Close"
            id="popup-edit-profile-close-button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
  );
}

export default PopupWithForm;
