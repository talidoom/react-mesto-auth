// export const baseUrl = 'https://auth.nomoreparties.co';

// const getJson = (res) => {
//   return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
// };

// export const register = (password, email) => {
//   return fetch(`${baseUrl}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   }).then(getJson);
// };

// export const authorize = (password, email) => {
//   return fetch(`${baseUrl}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ password, email }),
//   })
//     .then(getJson)
//     .then((data) => {
//       localStorage.setItem("jwt", data.token);
//       return data;
//     });
// };

// export const getContent = (token) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then(getJson);
// };

class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkPromiseStatus(res) {
      if (res.ok) {
          return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      })
      .then(this._checkPromiseStatus);
  }

  login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      .then(this._checkPromiseStatus);
  }

  checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkPromiseStatus);
  }
}

const auth = new Auth("https://auth.nomoreparties.co");
export default auth;