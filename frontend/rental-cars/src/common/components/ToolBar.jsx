import React, {Fragment} from "react";
import DateSearch from "./DateSearch";

export const ToolBar = (props) => {
  return (
    <Fragment>
      <div className="col-1">
      </div>
        <div className="col-1 img-container">
          <img src={props.icon} width="80" height="80"/>
        </div>
      <div className="col-7" id="dateSearchContainer">
        <DateSearch
          action={props.dateSearchAction}
        />
      </div>
      <div className="col-2">
        {props.children}
      </div>
      <div className="col-1">
      </div>
    </Fragment>
  )
}
