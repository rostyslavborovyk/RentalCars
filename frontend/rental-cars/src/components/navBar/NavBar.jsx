import React, {Fragment} from "react";
import {NavLink} from 'react-router-dom';

export const NavBar = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">RentalCars</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/orders"
                            >
                                Orders
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/clients"
                            >
                                Clients
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                to="/cars"
                            >
                                Cars
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </nav>

        </Fragment>
    )
}