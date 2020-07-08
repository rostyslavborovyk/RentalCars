import React, {Fragment, useEffect, useState} from "react";
import {ItemsRow} from "../../common/components/ItemsRow";
import {store} from "../../index";
import {getCookie} from "../../common/js/cookies";
import {selectCars, selectCost, selectPage, selectPending} from "../../redux/storeSelectors/carsSelectors";
import {connect} from "react-redux";
import {fetchCars, fetchDeleteCar} from "../../redux/fetch/carsFetch";
import {getNumOfItemsPerPage} from "../../common/js/numOfItemsPerPage";

// todo make NUM_OF_ITEMS_PER_PAGE dynamical with regard to users page height
let NUM_OF_ITEMS_PER_PAGE = 4;

const CarsList = (state) => {
  const [render, setRender] = useState(false);

  const getColumnHeaders = () => {
    return ["Car description", "Rental cost", "Number of orders"]
  }

  const getRowDataKeys = () => {
    return ["car_description", "rental_cost", "number_of_orders"]
  }

  useEffect(() => {
    console.log("Fetching cars")
    NUM_OF_ITEMS_PER_PAGE = getNumOfItemsPerPage()
    const cost = selectCost(state.state)
    fetchCars(
      NUM_OF_ITEMS_PER_PAGE,
      (selectPage(state.state) - 1) * NUM_OF_ITEMS_PER_PAGE,
      cost.fromCost,
      cost.byCost
    )(state.dispatch)

    const unsubscribe = store.subscribe(() => {
      setRender(!render)
    })

    return unsubscribe
  }, [
    state.state.cars.page,
    state.state.cars.fromCost,
    state.state.cars.byCost,
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
        {selectCars(state.state).map((elem, idx) => (
          <ItemsRow
            isHeader={false}
            idx={idx}
            data={elem}
            key={idx}
            isAdmin={getIsAdmin()}
            rowDatakeys={getRowDataKeys()}
            itemId={elem.car_id}
            deleteFunc={fetchDeleteCar}
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
)(CarsList)
