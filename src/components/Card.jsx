import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const {onCardClick, card, onCardLike, onCardDelete} = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-button ${isLiked && 'element__like-button_active'}`;
  const cardDeleteButtonClassName = `element__trash ${isOwn ? 'element__trash_active' : ''}`;

  function handleClickImage() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

    return (
          <li className="element">
            <button 
              onClick={handleDeleteClick}
              className={cardDeleteButtonClassName} 
              type="button" 
              aria-label="Удалить" 
            />
            <img 
                className="element__pic" 
                src={card.link} 
                alt={card.name}
                onClick={handleClickImage}
            />
            <div className="element__item">
              <h2 className="element__text">{card.name}</h2>
              <div className="element__like-container">
                <button 
                  type="button" 
                  className={cardLikeButtonClassName} 
                  aria-label="Лайк"
                  onClick={handleLikeClick}
                />
                <span className="element__like-counter">{card.likes.length}</span>
              </div>
            </div>
          </li>
    );
};

export default Card;