import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = ({cards,onCardLike, onCardDelete, onCardClick, onEditProfile, onAddPlace, onEditAvatar}) => {
  const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">

          <section className="profile">
            <div className="profile__container">
              <img 
                src={currentUser.avatar} 
                className="profile__avatar" 
                alt="Аватар" 
              />
              <div className="profile__overlay">
                <button 
                  className="profile__edit-avatar"
                  onClick={onEditAvatar}
                />
              </div>
            </div>
            <div className="profile__info">
              <div className="profile__text">
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__job">{currentUser.about}</p>
              </div>
              <button 
                className="profile__edit-button" 
                type="button" 
                aria-label="Редактировать"
                onClick={onEditProfile}
              />
            </div>
            <button 
              className="profile__add-button" 
              type="submit" 
              aria-label="Добавить"
              onClick={onAddPlace}
            />
          </section>

          <section className="elements">
            <ul className="elements__list" aria-label="Фотографии путешествий">
            {cards.map((card) => {
                return (
                <Card 
                  card={card} 
                  key={card._id} 
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />)
            })}
            </ul>
          </section>
          
        </main>
    );
};

export default Main