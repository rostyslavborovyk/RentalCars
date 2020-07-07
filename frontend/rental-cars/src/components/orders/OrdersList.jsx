import React, {Fragment, useEffect, useState} from "react";
import {ItemsRow} from "../../common/components/ItemsRow";
import {store} from "../../index";
import {fetchOrders} from "../../redux/fetch/ordersFetch";
import {getCookie} from "../../common/js/cookies";
import {selectDate, selectOrders, selectPage, selectPending} from "../../redux/storeSelectors/ordersSelectors";
import {connect} from "react-redux";
import {getNumOfItemsPerPage} from "../../common/js/numOfItemsPerPage";

let NUM_OF_ITEMS_PER_PAGE = 4;

const OrdersList = (state) => {
  const [render, setRender] = useState(false);

  const getColumnHeaders = () => {
    return ["Car number", "Client passport num", "Add date", "Rental time", "Car rental cost", "Total cost"]
  }

  const getRowDataKeys = () => {
    return ["car_number", "client_passport_num", "add_date", "rental_time", "car_rental_cost", "total_cost"]
  }

  useEffect(() => {
    console.log("Fetching orders")
    NUM_OF_ITEMS_PER_PAGE = getNumOfItemsPerPage()
    const date = selectDate(state.state)
    fetchOrders(
      NUM_OF_ITEMS_PER_PAGE,
      (selectPage(state.state) - 1) * NUM_OF_ITEMS_PER_PAGE,
      date.fromDate,
      date.toDate
    )(state.dispatch)

    const unsubscribe = store.subscribe(() => {
      setRender(!render)
    })

    return unsubscribe
  }, [
    state.state.orders.page,
    state.state.orders.fromDate,
    state.state.orders.toDate,
  ])

  const getIsAdmin = () => {
    return getCookie("isAdmin")
  }

  const showList = () => {
    return (
      <table className="table">
        <thead id="items-table-header">
        <ItemsRow
          isHeader={true}
          columnHeaders={getColumnHeaders()}
        />
        </thead>
        <tbody id="orders-table">
        {selectOrders(state.state).map((elem, idx) => (
          <ItemsRow
            isHeader={false}
            idx={idx}
            data={elem}
            key={idx}
            isAdmin={getIsAdmin()}
            rowDatakeys={getRowDataKeys()}
            itemId={elem.order_id}
          />
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

