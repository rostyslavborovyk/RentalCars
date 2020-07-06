import React from 'react';
import Login from "./components/login_register/Login";
import {BrowserRouter, Route} from "react-router-dom";
import RegisterPage from "./components/login_register/RegisterPage";
import Orders from "./components/orders/Orders";
import {Main} from "./components/mainPage/Main";
import Clients from "./components/clients/Clients";
import {Cars} from "./components/cars/Cars";
import {connect} from "react-redux";

function App(state) {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/clients" component={Clients}/>
                <Route path="/cars" component={Cars}/>
            </div>
        </BrowserRouter>
    );
}

export default connect(
  state => ({
      state: state
  })
)(App);
