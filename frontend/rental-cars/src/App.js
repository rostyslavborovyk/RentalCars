import React from 'react';
import Login from "./components/login_register/Login";
import {BrowserRouter, Route} from "react-router-dom";
import RegisterPage from "./components/login_register/RegisterPage";
import Orders from "./components/orders/Orders";
import {Main} from "./components/mainPage/Main";
import Clients from "./components/clients/Clients";
import Cars from "./components/cars/Cars";
import {connect} from "react-redux";
import {AddCar} from "./components/cars/AddCar";
import {AddOrder} from "./components/orders/AddOrder";

function App(state) {
    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/add/car" component={AddCar}/>
                <Route path="/add/order" component={AddOrder}/>
                <Route path="/orders" render={() => <Orders toolbarIc={"orders_ic.png"}/>}/>
                <Route path="/clients" render={() => <Clients toolbarIc={"clients_ic.png"}/>}/>
                <Route path="/cars" render={() => <Cars toolbarIc={"cars_ic.png"}/>}/>
            </div>
        </BrowserRouter>
    );
}

export default connect(
  state => ({
      state: state
  })
)(App);
