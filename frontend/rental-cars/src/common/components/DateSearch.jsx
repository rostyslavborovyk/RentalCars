import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import swal from 'sweetalert';

const DateSearch = (state) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const formatDate = (date) => {
    const monthStr = (date.getMonth() + 1).toString()
    const month = monthStr.length === 1 ? `0${monthStr}` : monthStr

    const dayStr = date.getDate().toString()
    const day = dayStr.length === 1 ? `0${dayStr}` : dayStr

    return `${date.getFullYear()}-${month}-${day}`
  }

  const handleBtn = () => {
    const fromDate = new Date(dateFrom)
    const toDate = new Date(dateTo)
    if (toDate > fromDate) {
      const fromDateFormatted = formatDate(fromDate)
      const toDateFormatted = formatDate(toDate)
      state.dispatch(state.action({
        fromDate: fromDateFormatted,
        toDate: toDateFormatted
      }))
    } else {
      swal(
        "Invalid input!",
        "Date from should be earlier then date to",
        "warning"
      )
    }

  }

  return (
    <Fragment>
      <div>
        <ul className="dateList">
          <li>
            <div className="dateSearchElem">
              <label htmlFor="dateFrom">Date from:</label>
              <input
                type="date"
                id="dateFrom"
                className="form-control"
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
          </li>
          <li>
            <div className="dateSearchElem">
              <label htmlFor="dateTo">Date to:</label>
              <input
                type="date"
                id="dateTo"
                className="form-control"
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </li>
          <li>
            <div className="dateSearchElem">
              <button
                className="btn dateSearchBtn btn-dark"
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
)(DateSearch)
