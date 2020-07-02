import React, {Fragment, useEffect, useState} from "react";
import {OrdersRow} from "./OrdersRow";
import {store} from "../../index";
import {fetchOrders} from "../../redux/fetch/ordersFetch";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

export const OrdersList = () => {
  const [render, setRender] = useState(false);

  store.subscribe(() => {
    console.log(store.getState())
    setRender(!render)
  })
  useEffect(() => {
    console.log("Fetching orders")
    fetchOrders()(store.dispatch)
  }, [])

  const selectOrders = (state) => {
    return state.orders
  }

  const showList = () => {
    return (
      <table className="table">
        <thead>
        <OrdersRow isHeader={true}/>
        </thead>
        <tbody id="orders-table">
        {selectOrders(store.getState()).map((elem, idx) => (
          <OrdersRow isHeader={false} idx={idx} data={elem} key={idx}/>
        ))}
        {console.log("render")}
        </tbody>
      </table>
    )
  }
  return (
    <Fragment>
      {showList()}
    </Fragment>
  )
}
