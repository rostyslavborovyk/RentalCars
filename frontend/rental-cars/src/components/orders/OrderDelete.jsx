import React, {Fragment} from 'react';

function OrderDelete(props) {
  const onClick = (id) => {

  }

  return (
    <Fragment>
      <button
        className="btn btn-outline-danger btn-sm action-btn"
        id={props.id}
        onClick={(e) => onClick(props.id)}
      >
        &times;
      </button>
    </Fragment>
  );
}

export default OrderDelete;