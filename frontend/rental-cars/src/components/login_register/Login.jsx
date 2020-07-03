import React, {Fragment, useState} from "react";
import s from "./login_register.module.css";
import {NavLink, Redirect} from "react-router-dom";
import auth from "../../authentification/auth"

const Login = (props) => {
  return (
    <div className={s.baseContainer}>
      <div className={s.header}>
        Login
        <NavLink to="/register">
          Register
        </NavLink>
      </div>
      <LoginForm/>
    </div>
  );
}

const LoginForm = (props) => {
  const [passportNum, setPassportNum] = useState("");
  const [password, setPassword] = useState("");
  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    const isSuccessSubmit = await auth.login(passportNum, password);
    setSuccessSubmit(isSuccessSubmit);

  }

  return (
    <Fragment>
      {successSubmit && <Redirect to="/"/>}
      <form>
        <div className={s.formGroup}>
          <input
            id
            type="text"
            name="passport"
            placeholder="Passport number"
            autoComplete="off"
            onChange={(e) => setPassportNum(e.target.value)}
          />
        </div>
        <div className={s.formGroup}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" className={s.btn} onClick={handleClick}>
            Login
          </button>
        </div>
      </form>
    </Fragment>
  )
}
export default Login;
