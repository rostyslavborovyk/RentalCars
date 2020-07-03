import React, {Fragment} from "react";

export const DateSearch = () => {
  return (
    <Fragment>
      <div id="dateSearchContainer">
        <ul className="dateList">
          <li>
            <div className="dateSearchElem">
              <label htmlFor="dateFrom">Date from:</label>
              <input type="date" id="dateFrom" className="form-control"/>
            </div>
          </li>
          <li>
            <div className="dateSearchElem">
              <label htmlFor="dateTo">Date from:</label>
              <input type="date" id="dateTo" className="form-control"/>
            </div>
          </li>
          <li>
            <div className="dateSearchElem">
              <button className="btn dateSearchBtn">Search</button>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}
