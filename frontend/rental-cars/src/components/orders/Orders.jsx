import React, {Fragment} from "react";
import {NavBar} from "../navBar/NavBar";
import {OrdersList} from "./OrdersList";
import {ToolBar} from "./ToolBar";
// import {Pagination} from "./Pagination";

export const Orders = () => {
  return (
    <Fragment>
      <NavBar/>
      <div className="orders-table-container">
        <div className="row">
          <ToolBar/>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10">
            <OrdersList/>
            {/*<Pagination/>*/}
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    </Fragment>
  )
}
