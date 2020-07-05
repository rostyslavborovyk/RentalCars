import React, {Fragment, useEffect, useState} from "react";
import {selectNumOfPages, selectPage} from "../../redux/selectStore/orders";
import {store} from "../../index";
import {decrementPage, incrementPage} from "../../redux/actions/ordersActions";
import {connect} from "react-redux";

const Pagination = (state) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setRender(!render)
    })
    return unsubscribe
  }, [])

  const previousBtnHandler = (e) => {
    const page = selectPage(state.state);
    if (page > 1){
      state.dispatch(decrementPage())
    }

  }

  const nextBtnHandler = () => {
    const page = selectPage(state.state);
    const numOfPages = selectNumOfPages(state.state);
    if (page < numOfPages){
      state.dispatch(incrementPage())
    }
  }

  return (
    <Fragment>
      <ul id="pagination-orders">
        <li>
          <button
            type="button"
            // if page = 1 previous btn is disabled
            className={`btn btn-dark ${selectPage(state.state) === 1 && "disabled"}`}
            onClick={previousBtnHandler}
          >Previous
          </button>
        </li>
        <li>
          <div className="btn btn-dark disabled">{selectPage(state.state)}</div>
        </li>
        <li>
          <button
            type="button"
            className={`btn btn-dark ${selectPage(state.state) === selectNumOfPages(state.state) && "disabled"}`}
            onClick={nextBtnHandler}
          >Next</button>
        </li>
      </ul>
    </Fragment>
  )
}

export default connect(
  state => ({
    state: state
  })
)(Pagination)
