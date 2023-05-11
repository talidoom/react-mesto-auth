import React from 'react';

const ImagePopup = ({card, popup, onClose}) => {
  
    return (
        <div className={`popup popup_type_${popup} ${card ? 'popup_opened' : ''}`}>
          <div className="popup__pic-block">
            <button 
              className="popup__close-but" 
              type="button" 
              aria-label="Закрыть" 
              onClick={onClose}
            />
            <img 
              className="popup__img" 
              src={card ? card.link : '#'} 
              alt={card ? card.name : ''}
            />
            <p className="popup__description">{card ? card.name : ''}</p>
          </div>
        </div>
    );
};

export default ImagePopup;