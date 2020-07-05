import React, {Fragment} from "react";
import {AddOrder} from "./AddOrder";
import DateSearch from "./DateSearch";

export const ToolBar = () => {
  return (
    <Fragment>
      <div className="col-1">
      </div>
      <div className="col-8">
        <DateSearch/>
      </div>
      <div className="col-2">
        <AddOrder/>
      </div>
      <div className="col-1">
      </div>
    </Fragment>
  )
}
