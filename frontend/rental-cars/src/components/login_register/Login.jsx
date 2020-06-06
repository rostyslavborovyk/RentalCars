import React from "react";
import s from "./login_register.module.css";
import {NavLink} from "react-router-dom";

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
    return (
        <form>
            <div className={s.formGroup}>
                <input type="text" name="passport" placeholder="Passport number"/>
            </div>
            <div className={s.formGroup}>
                <input type="password" name="password" placeholder="Password"/>
            </div>
            <div>
                <button type="button" className={s.btn}>
                    Submit
                </button>
            </div>
        </form>
    )
}
export default Login;
