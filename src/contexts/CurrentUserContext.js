import React from 'react';
import avatar from '../images/profile-ava.jpg';

export const CurrentUserContext = React.createContext();

export const defaultUser = {
    name: "Лара Крофт",
    about: "Путешественник",
    avatar: avatar,
  };