import React, {Fragment} from "react";
import NavBar from "../navBar/NavBar";
import {connect} from "react-redux";
import {decrementCarsPage, incrementCarsPage} from "../../redux/actions/carsActions";
import Pagination from "../../common/components/Pagination";
import {selectNumOfPages, selectPage} from "../../redux/storeSelectors/carsSelectors";
import CarsList from "./CarsList";
import {RentalCostBar} from "./RentalCostBar";
import {AddItem} from "../../common/components/AddItem";
import auth from "../../authentification/auth";

const Cars = (props) => {
  return (
    <Fragment>
      <NavBar/>
      <div className="orders-table-container">
        <div className="row">
          <RentalCostBar
            icon={props.toolbarIc}
          >
            {auth.isAuthentificated() &&
              <AddItem
                itemName={"car"}
                addLink={"add/car"}
              />
            }

          </RentalCostBar>
        </div>
        <div className="row">
          <div className="col-1">
          </div>
          <div className="col-10">
            <CarsList/>
            <Pagination
              selectNumOfPagesFunc={selectNumOfPages}
              selectPageFunc={selectPage}
              decrementPageFunc={decrementCarsPage}
              incrementPageFunc={incrementCarsPage}
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
)(Cars)
