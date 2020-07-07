import React, {Fragment} from 'react';

function ItemUpdate() {
  const handleBtn = () => {
    console.log("Not implemented")
  }

  return (
    <Fragment>
      <button
        className="btn btn-outline-info btn-sm action-btn update-btn"
        onClick={handleBtn}
      >
        <span id="pencil">&#9998;</span>
      </button>
    </Fragment>
  );
}

export default ItemUpdate;
