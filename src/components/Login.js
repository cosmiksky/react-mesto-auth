import React from "react"

function Login({title, buttonText, onLogin}) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleEmail = (e) => {
      setEmail(e.target.value);
    };
  
    function handleSubmit(e) {
      e.preventDefault();
      onLogin({
        email,
        password,
      });
    }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="register">
        <h2 className="register__welcom">{title}</h2>
        <input id="email" value={email} name="email" type="email" placeholder="Email" className="register__input" onChange={handleEmail} />
        <input id="password" value={password} name="password" type="password" placeholder="Пароль" className="register__input" onChange={handlePassword} />
          <button type="submit" className="register__button">{buttonText}</button>
      </form>
    </div>
  );
}

export default Login;