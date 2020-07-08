import React, {Fragment, useState} from "react";
import NavBar from "../navBar/NavBar";
import OrdersList from "./OrdersList";
import {ToolBar} from "../../common/components/ToolBar";
import Pagination from "../../common/components/Pagination";
import {connect} from "react-redux";
import {selectNumOfPages, selectPage} from "../../redux/storeSelectors/ordersSelectors";
import {decrementOrdersPage, incrementOrdersPage, setOrdersDate} from "../../redux/actions/ordersActions";
import {AddItem} from "../../common/components/AddItem";
import auth from "../../authentification/auth";
import {RentalCostBar} from "../cars/RentalCostBar";

const Orders = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <div className="orders-table-container">
        <div className="row">
          <ToolBar
            dateSearchAction={setOrdersDate}
            icon={props.toolbarIc}
          >
            {auth.isAuthentificated() &&
            <AddItem
              itemName={"order"}
              addLink={"add/order"}
            />
            }
          </ToolBar>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10">
            <OrdersList />
            <Pagination
              selectNumOfPagesFunc={selectNumOfPages}
              selectPageFunc={selectPage}
              decrementPageFunc={decrementOrdersPage}
              incrementPageFunc={incrementOrdersPage}
            />
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default connect(
  state => ({
    state: state
  })
)(Orders)
