import React from "react";
import s from "./login_register.module.css";
import {NavLink} from "react-router-dom";

const RegisterPage = (props) => {
    return (
        <div className={s.baseContainer}>
            <div className={s.header}>
                Register
                <NavLink to="/login">
                    Login
                </NavLink>
            </div>
                <RegisterForm />
        </div>
    );
}

const RegisterForm = (props) => {
    return (
        <form>
            <div className={s.formGroup}>
                <input type="text" name="username" placeholder="Username"/>
            </div>
            <div className={s.formGroup}>
                <input type="text" name="passport" placeholder="Passport number"/>
            </div>
            <div className={s.formGroup}>
                <input type="text" name="email" placeholder="Email"/>
            </div>
            <div className={s.formGroup}>
                <input type="text" name="password" placeholder="Password"/>
            </div>
            <div>
                <button type="button" className={s.btn}>
                    Submit
                </button>
            </div>
        </form>
    )
}
export default RegisterPage;