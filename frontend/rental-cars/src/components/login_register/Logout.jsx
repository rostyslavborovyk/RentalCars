import React, {Fragment, useState} from "react";
import s from "./login_register.module.css";
import {NavLink, Redirect} from "react-router-dom";
import auth from "../../authentification/auth"

const Logout = async (props) => {
  return (
    <Fragment>
      <div>
        <h1>Logging out</h1>
      </div>
    </Fragment>
  );
}

export default Logout;
