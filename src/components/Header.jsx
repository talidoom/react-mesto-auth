import React from 'react';
import headerLogo from '../images/logo-header.svg'
import { Link, Route, Routes } from "react-router-dom";

const Header = ({ email, onSignOut }) => {
    return (
        <header className="header">
          <img src={headerLogo} className="header__logo" alt="Логотип" />

          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link className="header__link" to="/sign-in">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link className="header__link" to="/sign-up">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <div className="header__user-info">
                  <p className="header__user-email">{email}</p>
                  <button className="header__button-logout" onClick={onSignOut}>
                    Выйти
                  </button>
                </div>
              }
            />
          </Routes>
        </header>
    );
};

export default Header;