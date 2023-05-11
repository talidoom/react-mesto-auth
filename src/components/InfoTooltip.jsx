import React from "react";
import successfulRegistration  from '../images/successful.svg';
import errorRegistration from '../images/error.svg';

const InfoTooltip = ({isOpen, onClose, isRegister, alt, popup }) => {
  const popupIsOpen = isOpen ? 'popup_opened' : '';

  return ( 
    <div
      className={`popup popup_type_${popup} ${popupIsOpen}`}
    >
      <div className="popup__conteiner" onClick={(evt) => evt.stopPropagation()}>
        <button
          className="popup__close-but"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__auth-image"
          src={isRegister.status ? successfulRegistration : errorRegistration}
          alt={alt}
        />
        <h2 className="popup__title popup__title_auth">
          {isRegister.message}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;