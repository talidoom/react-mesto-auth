import React from "react";
import successfulRegistration  from '../images/successful.svg';
import errorRegistration from '../images/error.svg';

const InfoTooltip = ({isSignIn, isOpen, onClose, popup }) => {
  const popupIsOpen = isOpen ? 'popup_opened' : '';
  const icon = isSignIn ? successfulRegistration : errorRegistration;
  const message = isSignIn ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

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
          src={ icon }
        />
        <h2 className="popup__title popup__title_auth">
          {message}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;