import React from 'react';
import Login from "./components/login_register/Login";
import {BrowserRouter, Route} from "react-router-dom";
import RegisterPage from "./components/login_register/RegisterPage";
import {NavBar} from "./components/navBar/NavBar";
import {Orders} from "./components/orders/Orders";

function App() {

    return (
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/orders" component={Orders}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
