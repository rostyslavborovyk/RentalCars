import React, {Fragment} from 'react';

function ItemDelete(props) {

  return (
    <Fragment>
      <button
        className="btn btn-outline-danger btn-sm action-btn"
        onClick={() => props.deleteFunc(props.id)}
      >
        &times;
      </button>
    </Fragment>
  );
}

// ItemDelete.propTypes = {
//   id: PropTypes.string,
//   deleteFunc: PropTypes.func,
// }

export default ItemDelete;