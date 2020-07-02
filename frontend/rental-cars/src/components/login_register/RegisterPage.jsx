import React, {useState, Fragment} from "react";
import s from "./login_register.module.css";
import {NavLink, Redirect} from "react-router-dom";

const RegisterPage = (props) => {
  return (
    <div className={s.baseContainer}>
      <div className={s.header}>
        Register
        <NavLink to="/login">
          Login
        </NavLink>
      </div>
      <RegisterForm/>
    </div>
  );
}

const RegisterForm = (props) => {
  // todo add validation to forms
  // todo add automatic login after registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passportNum, setPassportNum] = useState("");
  const [password, setPassword] = useState("");

  const [successSubmit, setSuccessSubmit] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()
    const data = {
      "first_name": firstName,
      "last_name": lastName,
      "passport_number": passportNum,
      "password": password,
    }
    fetch("http://localhost:5000/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then((res => {
        if (res.status === 200) {
          alert("Registered!")
          setSuccessSubmit(true)
        }
      }))
  }

  return (
    <Fragment>
      {successSubmit && <Redirect to="/"/>}
      <form>
        <div className={s.formGroup}>
          <input
            id="reg_first_name"
            type="text"
            name="first_name"
            placeholder="First name"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          />
        </div>
        <div className={s.formGroup}>
          <input
            id="reg_last_name"
            type="text"
            name="last_name"
            placeholder="Last name"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={s.formGroup}>
          <input
            id="reg_passport_num"
            type="text"
            name="passport"
            placeholder="Passport number"
            autoComplete="off"
            onChange={(e) => setPassportNum(e.target.value)}
          />
        </div>
        <div className={s.formGroup}>
          <input
            id="reg_password"
            type="text"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className={s.btn} onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  )
}
export default RegisterPage;