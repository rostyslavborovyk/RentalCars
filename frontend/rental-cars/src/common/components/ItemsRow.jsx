import React, {Fragment} from "react";
import ItemDelete from "./ItemDelete";
import ItemUpdate from "./ItemUpdate";

export const ItemsRow = (props) => {
  const showHeader = () => {
    return (
      <tr>
        {props.columnHeaders.map((elem, idx) => (
          <th key={idx}>{elem}</th>
        ))}
      </tr>
    )
  }

  const showRow = () => (
    <tr className="row-hover">
      {props.rowDatakeys.map((elem, idx) => (
        <td key={idx}>{props.data[elem]}</td>
      ))}
      {props.isAdmin === "True" &&
      <Fragment>
        <td className="row-action">
          <ItemDelete
            id={props.itemId}
            deleteFunc={(itemId) => console.log(itemId)}
          />
        </td>
        <td className="row-action">
          <ItemUpdate
            id={props.itemId}
            updateFunc={(itemId) => console.log(itemId)}
          />
        </td>
      </Fragment>
      }

    </tr>
  );

  return (
    <Fragment>
      {props.isHeader ? showHeader() : showRow()}
    </Fragment>
  );
}

