import React from "react";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePass(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin({ email, password });
  }
  return (
    <div className="authorization">
      <h1 className="authorization__title">{props.title}</h1>
      <form className="authorization-form" onSubmit={handleSubmit}>
        <input
          className="authorization-form__input"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="E-mail"
          type="email"
          required
        />
        <input
          name="password"
          className="authorization-form__input"
          value={password}
          onChange={handleChangePass}
          minLength={8}
          placeholder="Пароль"
          type="password"
          required
        />
        <button
          className="authorization-form__button"
          type="submit"
          name="save"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;