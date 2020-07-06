import React, {Fragment} from "react";
import DateSearch from "./DateSearch";

export const ToolBar = (props) => {
  return (
    <Fragment>
      <div className="col-1">
      </div>
      <div className="col-8">
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
