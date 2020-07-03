import React, {Fragment, useEffect, useState} from "react";
import {OrdersRow} from "./OrdersRow";
import {store} from "../../index";
import {fetchOrders} from "../../redux/fetch/ordersFetch";
import {getCookie} from "../../common/cookies";


export const OrdersList = () => {
  const [render, setRender] = useState(false);
  store.subscribe(() => {
    console.log(store.getState())
    setRender(!render)
  })
  // todo set unsubscribe func because of memory leaks
  useEffect(() => {
    console.log("Fetching orders")

    fetchOrders()(store.dispatch)

  }, [])

  const selectOrders = (state) => {
    return state.orders.orders
  }

  const selectPending = (state) => {
    return state.orders.pending
  }

  const getIsAdmin = () => {
    return getCookie("isAdmin")
  }

  const showList = () => {
    return (
      <table className="table">
        <thead>
        <OrdersRow isHeader={true}/>
        </thead>
        <tbody id="orders-table">
        {selectOrders(store.getState()).map((elem, idx) => (
          <OrdersRow isHeader={false} idx={idx} data={elem} key={idx} isAdmin={getIsAdmin()}/>
        ))}
        </tbody>
      </table>
    )
  }

  const showLoader = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <Fragment>
      {selectPending(store.getState()) ? showLoader() : showList()}
    </Fragment>
  )
}
