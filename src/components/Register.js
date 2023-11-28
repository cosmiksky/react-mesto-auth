import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form onSubmit={handleSubmit} name="register" className="register" noValidate>
      <h2 className="register__welcom">Регистрация</h2>
      <input name="email" type="email" placeholder="Email" value={email} className="register__input" onChange={handleEmailChange} />
      <input name="password" type="password" placeholder="Пароль" value={password} className="register__input" onChange={handlePasswordChange} />
      <button type="submit" className="register__button"> Зарегистрироваться </button>
      <div className="register__signin">
        <Link to="/sign-in" className="register__subtitle"> Уже зарегистрированы? Войти </Link>
      </div>
    </form>
  );
}
export default Register;