import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRouteElement";
import Header from "./Header";
import Register from './Register';
import Login from './Login';
import InfoTooltip from "./InfoTooltip";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import Footer from "./Footer";
import api from "../utils/Api";
import {getContent, authorize, register} from '../utils/auth';

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);;
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard
  const [email, setEmail] = React.useState('');;
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });
  const [isRegister, setIsRegister] = React.useState({
    status: '',
    message: '',
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    api.getCards()
    .then((card) => {
      setCards(card);
    }) 
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { 
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, [isLoggedIn]);

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }; 

  React.useEffect(() => {
    tokenCheck();
  }, []);


  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsOpenInfoTooltip(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data.avatar)
      .then((serverData) => {
        setCurrentUser(serverData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data.name, data.about)
      .then((serverData) => {
        setCurrentUser(serverData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddCard(card) {
    api
      .createCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleChange (evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function signOut () {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  };

  function handleRegister (evt) {
    evt.preventDefault();
    const { password, email } = formValue;
    register(password, email)
      .then(() => {
        setFormValue({ email: "", password: "" });
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: true,
          message: 'Вы успешно зарегистрировались',
        });
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setIsRegister({
          status: false,
          message: 'Что-то пошло не так! Попробуйте ещё раз',
        });
        console.log(`Ошибка ${err}`);
      });
  };

  function handleLogin (evt) {
    evt.preventDefault();
    const { password, email } = formValue;
    authorize(password, email)
      .then(() => {
        setFormValue({ email: '', password: '' });
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={email} onSignOut={signOut} />

      <Routes>
        <Route path='/' 
          element={<ProtectedRoute
            element={Main}
            isLoggedIn={isLoggedIn}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
        />} />

        <Route  path='/sign-up'
          element={<Register
            handleChange={handleChange}
            onRegister={handleRegister}
            title='Регистрация'
            buttonText='Зарегистрироваться'
            formValue={formValue}
        />}/>
        
        <Route path='/sign-in' 
          element={<Login 
            htitle='Вход'
            buttonText='Войти'
            onLogin={handleLogin}
            handleChange={handleChange}
            formValue={formValue}
        />}/>

        <Route
          path='/*'
          element={isLoggedIn ? (<Navigate to='/' replace />) : 
            (<Navigate to='/sign-in' replace />)
          }
        />
      </Routes>

      {isLoggedIn && <Footer />}

      <InfoTooltip
        isRegister={isRegister}
        isOpen={isOpenInfoTooltip}
        onClose={closeAllPopups}
        alt={'Статус'}
        popup={'auth-res'}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddCard}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup 
        popup={'picture'}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <PopupWithForm 
        title={'Вы уверены?'} 
        popup={'delete-card'} 
        submitButtonText={'Да'}
        onClose={closeAllPopups}
      />
        
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
