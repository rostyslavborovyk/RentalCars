import React, {Fragment} from "react";
import {NavBar} from "../navBar/NavBar";
import {OrdersList} from "./OrdersList";
import {DateBar} from "./DateBar";
import {Pagination} from "./Pagination";

export const Orders = () => {
  return (
    <Fragment>
      <NavBar/>
      <div className="orders-table-container">
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10">
            <DateBar/>
            <OrdersList/>
            <Pagination/>
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    </Fragment>
  )
}
