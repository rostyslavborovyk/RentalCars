import React, {Fragment, useEffect, useState} from "react";
import {OrdersRow} from "./OrdersRow";
import {store} from "../../index";
import {fetchOrders} from "../../redux/fetch/ordersFetch";
import {getCookie} from "../../common/js/cookies";
import {selectDate, selectPage} from "../../redux/selectStore/orders";
import {connect} from "react-redux";

const NUM_OF_ITEMS_PER_PAGE = 4;

const OrdersList = (state) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    console.log("Fetching orders")
    console.log(selectDate(state.state))
    const date = selectDate(state.state)
    fetchOrders(
      NUM_OF_ITEMS_PER_PAGE,
      (selectPage(state.state)-1) * NUM_OF_ITEMS_PER_PAGE,
      date.fromDate,
      date.toDate
    )(state.dispatch)

    const unsubscribe = store.subscribe(() => {
      console.log(state)
      setRender(!render)
    })

    return unsubscribe
  }, [
    state.state.orders.page,
    state.state.orders.fromDate,
    state.state.orders.toDate,
  ])

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
        {selectOrders(state.state).map((elem, idx) => (
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
      {selectPending(state.state) ? showLoader() : showList()}
    </Fragment>
  )
}

export default connect(
  state => ({
    state: state
  })
)(OrdersList)

