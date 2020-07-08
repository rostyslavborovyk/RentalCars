import React, {Fragment} from "react";
import NavBar from "../navBar/NavBar";
import {connect} from "react-redux";
import ClientsList from "./ClientsList";
import Pagination from "../../common/components/Pagination";
import {selectNumOfPages, selectPage} from "../../redux/storeSelectors/clientsSelectors";
import {decrementClientsPage, incrementClientsPage, setClientsDate} from "../../redux/actions/clientsActions";
import {ToolBar} from "../../common/components/ToolBar";

const Clients = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <div className="animation-container">
        <div className="row">
          <ToolBar
            dateSearchAction={setClientsDate}
            icon={props.toolbarIc}
          >
          </ToolBar>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10">
            <ClientsList/>
            <Pagination
              selectNumOfPagesFunc={selectNumOfPages}
              selectPageFunc={selectPage}
              decrementPageFunc={decrementClientsPage}
              incrementPageFunc={incrementClientsPage}
            />
          </div>
          <div className="col-1">
          </div>
        </div>
      </div>
    </Fragment>
  )
}


export default connect(
  state => ({
    state: state
  })
)(Clients)
