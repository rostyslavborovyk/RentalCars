import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";

function ItemDelete(state) {
  const [isDeleted, setIsDeleted] = useState(false)

  const showDeleteBtn = () => (
    <button
      className="btn btn-outline-danger btn-sm action-btn"
      onClick={() => {
        console.log("Deleting")
        console.log(state.deleteFunc)
        state.deleteFunc(state.id)(state.dispatch)
        setIsDeleted(true)
      }}
    >
      &times;
    </button>
  )

  const showDeletedAnimation = () => (
    <img className="success-delete" src="success_delete_tick.png" alt=""/>
  )

  return (
    <Fragment>
      {!isDeleted ? showDeleteBtn() : showDeletedAnimation()}
    </Fragment>
  );
}

// ItemDelete.propTypes = {
//   id: PropTypes.string,
//   deleteFunc: PropTypes.func,
// }

export default connect(
  state => ({
    state: state
  })
)(ItemDelete);