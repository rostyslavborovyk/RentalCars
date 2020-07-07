import React, {Fragment, useEffect, useState} from "react";
import {store} from "../../index";
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
    const page = state.selectPageFunc(state.state);
    if (page > 1){
      state.dispatch(state.decrementPageFunc())
    }

  }

  const nextBtnHandler = () => {
    const page = state.selectPageFunc(state.state);
    const numOfPages = state.selectNumOfPagesFunc(state.state);
    if (page < numOfPages){
      state.dispatch(state.incrementPageFunc())
    }
  }

  const getNextBtnClass = () => (
    (state.selectPageFunc(state.state) === state.selectNumOfPagesFunc(state.state)
    || state.selectNumOfPagesFunc(state.state) === 0)
    && "disabled"
  )

  return (
    <Fragment>
      <ul id="pagination-orders">
        <li>
          <button
            type="button"
            // if page = 1 previous btn is disabled
            className={`btn btn-dark ${state.selectPageFunc(state.state) === 1 && "disabled"}`}
            onClick={previousBtnHandler}
          >Previous
          </button>
        </li>
        <li>
          <div className="btn btn-dark disabled">{state.selectPageFunc(state.state)}</div>
        </li>
        <li>
          <button
            type="button"
            className={`btn btn-dark ${getNextBtnClass()}`}
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
