import React from 'react';
import headerLogo from '../images/logo-header.svg'
import { Link, Route, Routes, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, email, onSignOut }) => {
  const location = useLocation();
  const linkText = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const buttonText = isLoggedIn ? "Выйти" : linkText;
    return (
      <header className="header">
        <img src={headerLogo} className="header__logo" alt="Логотип" />
        <div className="header__links">

        {isLoggedIn && <p className="header__user-email">{email}</p>}

        <Routes>
          <Route
            path="/react-mesto-auth"
            element={
              <Link to="/sign-in" className="header__link header__button">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link header__button">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link header__button">
                Регистрация
              </Link>
            }
          />
        </Routes>
        {isLoggedIn && (
          <button className="header__link header__button" onClick={onSignOut}>
            {buttonText}
          </button>
        )}
      </div>
      </header>
    );
};

export default Header;