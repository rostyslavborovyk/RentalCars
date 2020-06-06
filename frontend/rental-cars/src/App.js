import React from 'react';
import './App.css';
import Login from "./components/login_register/Login";
import {BrowserRouter, Route} from "react-router-dom";
import RegisterPage from "./components/login_register/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={RegisterPage}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
