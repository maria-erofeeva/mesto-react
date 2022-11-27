import React from "react";

function ImagePopup() {
  return (
<div className="popup popup_type_image" id="popup-open-image">
        <div className="popup__image-container">
            <img src="#" alt="Снимок из галереи" className="popup__foto" />
            <figcaption className="popup__figcaption"></figcaption>
            <button className="popup__close-icon" id="popup-open-image-close-button" type="button"
                aria-label="Close"></button>
        </div>
    </div>
  );
}

export default ImagePopup;