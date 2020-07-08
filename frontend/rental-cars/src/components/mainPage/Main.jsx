import React, {Fragment, useState} from "react";
import NavBar from "../navBar/NavBar";
import {Redirect} from "react-router";


export const Main = () => {
  const [redirectPath, setRedirectPath] = useState("");

  const handleRedirect = (path) => {
    setRedirectPath(path)
  }

  return (
    <Fragment>
      {<Redirect to={redirectPath}/>}
      <NavBar/>
      <div className="container main-container">
        <div className="row main-top-banner">
          <div className="col-1">
          </div>
          <div className="col-4 main-header-container">
            <div className="">
              <h1>Rental cars</h1>
              <p>Rental cars service allows users to order cars</p>
            </div>
          </div>
          <div className="col-6">
            <div className="main-wrapper">
              <div className="main-cube">
                <div className="side-img">
                  <img src="orders_ic.png" alt="" width="200" height="200"/>
                </div>
                <div className="side-img">
                  <img src="clients_ic.png" alt="" width="200" height="200" className="side-img"/>
                </div>
                <div className="side-img">
                  <img src="cars_ic.png" alt="" width="200" height="200" className="side-img"/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10 main-orders" onClick={() => handleRedirect("/orders")}>
            <div className="main-orders-header main-content-header">
              <h1>Orders page</h1>
            </div>
            <div className="main-orders-content main-content">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="description-order-card">
                      <h3>View all orders</h3>
                      <p>You can see all orders of all clients</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="description-order-card">
                      <h3>Search orders by date</h3>
                      <p>Filter by specifying orders add date</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="description-order-card">
                      <h3>Add order</h3>
                      <p>You can add order for yourself if you logged in into service</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="description-order-card">
                      <h3>Delete orders</h3>
                      <p>You can delete orders if you logged in with admin privileges</p>
                      <small>* site owner can assign admin users</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10 main-other" onClick={() => handleRedirect("/clients")}>
            <div className="main-clients-header main-content-header">
              <h1>Clients page</h1>
            </div>
            <div className="main-clients-content main-content">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="description-client-card">
                      <h3>View all clients</h3>
                      <p>You can see all clients</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="description-client-card">
                      <h3>Find any client by date</h3>
                      <p>Filter by specifying registration date</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="description-client-card">
                      <h3>Register</h3>
                      <p>You can register into service via navigation bar link</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="description-client-card">
                      <h3>Delete other clients</h3>
                      <p>You can delete any clients if you logged in with admin privileges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10 main-other bottom-container" onClick={() => handleRedirect("/cars")}>
            <div className="main-cars-header main-content-header">
              <h1>Cars page</h1>
            </div>
            <div className="main-cars-content main-content">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div className="description-car-card">
                      <h3>View all cars</h3>
                      <p>You can see all cars</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="description-car-card">
                      <h3>Search cars by cost</h3>
                      <p>Filter by specifying cars rental cost</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="description-car-card">
                      <h3>Add car</h3>
                      <p>You can add car to service if you logged in into service</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="description-car-card">
                      <h3>Delete cars</h3>
                      <p>You can delete cars if you logged in with admin privileges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    </Fragment>
  )
}
