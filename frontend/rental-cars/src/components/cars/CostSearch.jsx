import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import swal from 'sweetalert';
import {setCarsCost} from "../../redux/actions/carsActions";

const CostSearch = (state) => {
  const [costFrom, setCostFrom] = useState("");
  const [costBy, setCostBy] = useState("");

  const handleBtn = () => {
    if (costFrom === "" || costBy === "") {
      swal(
        "Invalid input!",
        "Cost from and cost by should be set",
        "warning"
      )
    } else if (parseInt(costFrom) < parseInt(costBy)){
      console.log("Submitting")
      state.dispatch(setCarsCost({
        fromCost: costFrom,
        byCost: costBy
      }))
    } else {
      swal(
        "Invalid input!",
        "Cost from should be less then cost by or equal",
        "warning"
      )
    }
  }

  return (
    <Fragment>
      <div>
        <ul className="searchList">
          <li>
            <div className="dateSearchElem">
              <label htmlFor="costFrom">Cost from:</label>
              <input
                type="number"
                id="costFrom"
                className="form-control"
                min="0"
                max="1000"
                onChange={(e) => setCostFrom(e.target.value)}
              />
            </div>
          </li>
          <li>
            <div className="dateSearchElem">
              <label htmlFor="costBy">Cost by:</label>
              <input
                type="number"
                id="costBy"
                className="form-control"
                min="0"
                max="1000"
                onChange={(e) => setCostBy(e.target.value)}
              />
            </div>
          </li>
          <li>
            <div className="dateSearchElem">
              <button
                className="btn searchBtn btn-dark"
                onClick={handleBtn}
              >Search
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

export default connect(
  state => ({
    state: state
  })
)(CostSearch)
