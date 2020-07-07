import React, {Fragment, useEffect, useState} from "react";
import {ItemsRow} from "../../common/components/ItemsRow";
import {store} from "../../index";
import {getCookie} from "../../common/js/cookies";
import {selectClients, selectDate, selectPage, selectPending} from "../../redux/storeSelectors/clientsSelectors";
import {connect} from "react-redux";
import {fetchClients, fetchDeleteClient} from "../../redux/fetch/clientsFetch";
import {getNumOfItemsPerPage} from "../../common/js/numOfItemsPerPage";
import {fetchDeleteCar} from "../../redux/fetch/carsFetch";

// todo make NUM_OF_ITEMS_PER_PAGE dynamical with regard to users page height
let NUM_OF_ITEMS_PER_PAGE = 4;

const ClientsList = (state) => {
  const [render, setRender] = useState(false);

  const getColumnHeaders = () => {
    return ["First name", "Last name", "Registration date", "Number of orders"]
  }

  const getRowDataKeys = () => {
    return ["first_name", "last_name", "registration_date", "number_of_orders"]
  }


  useEffect(() => {
    console.log("Fetching clients")
    NUM_OF_ITEMS_PER_PAGE = getNumOfItemsPerPage()
    const date = selectDate(state.state)
    fetchClients(
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
    state.state.clients.page,
    state.state.clients.fromDate,
    state.state.clients.toDate,
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
        {selectClients(state.state).map((elem, idx) => (
          <ItemsRow
            isHeader={false}
            idx={idx}
            data={elem}
            key={idx}
            isAdmin={getIsAdmin()}
            rowDatakeys={getRowDataKeys()}
            itemId={elem.client_id}
            deleteFunc={fetchDeleteClient}
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
)(ClientsList)

