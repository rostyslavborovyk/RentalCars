import React, {Fragment, useState} from "react";
import {Redirect} from "react-router";



export const AddItem = (props) => {
  const [redirect, setRedirect] = useState(false)
  const handleBtn = () => {
    setRedirect(true)
  }
  return (
    <Fragment>
      {redirect && <Redirect to={"/add/car"}/>}
      <div>
        <ul className="searchList">
          <li>
            <div className="dateSearchElem">
              <button
                type="button"
                className="btn btn-primary add-btn"
                onClick={handleBtn}
              >
                {`Add ${props.itemName}`}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}
