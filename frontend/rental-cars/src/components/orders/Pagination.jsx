import React, {Fragment} from "react";
import {NavLink} from 'react-router-dom';


export const Pagination = (props) => {
  return (
    <Fragment>
        <nav aria-label="...">
          <ul className="pagination  justify-content-center">
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item active">
      <span className="page-link">
        2
        <span className="sr-only">(current)</span>
      </span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

    </Fragment>
  );
}
