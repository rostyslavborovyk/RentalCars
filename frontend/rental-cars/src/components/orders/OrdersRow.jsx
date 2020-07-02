import React, {Fragment} from "react";
import OrderDelete from "./OrderDelete";
import OrderUpdate from "./OrderUpdate";

export const OrdersRow = (props) => {
  const showHeader = () => (
    <tr>
      <th>Car number</th>
      <th>Client passport num</th>
      <th>Add date</th>
      <th>Rental time</th>
      <th>Car rental cost</th>
      <th>Total cost</th>
    </tr>
  );

  const showRow = () => (
    <tr className="row-hover">
      <td>{props.data.car_number}</td>
      <td>{props.data.client_passport_num}</td>
      <td>{props.data.add_date}</td>
      <td>{props.data.rental_time}</td>
      <td>{props.data.car_rental_cost}</td>
      <td>{props.data.total_cost}</td>
      <td className="row-action">
        <OrderDelete id={props.data.order_id}/>
      </td>
      <td className="row-action">
        <OrderUpdate id={props.data.order_id}/>
      </td>
    </tr>
  );

  return (
    <Fragment>
      {props.isHeader ? showHeader() : showRow()}
    </Fragment>
  );
}
