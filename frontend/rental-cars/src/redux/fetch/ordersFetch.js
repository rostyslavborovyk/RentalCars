import {fetchOrdersError, fetchOrdersPending, fetchOrdersSuccess} from "../actions/ordersActions"

export const fetchOrders = (numOfItems = 10, offset = 0) => {
  return dispatch => {
    dispatch(fetchOrdersPending());
    fetch(`http://localhost:5000/api/orders/table?num_of_items=${numOfItems}&offset=${offset}`)
      .then(res => {
        if(res.error) {
          throw(res.error);
        }
        return res.json()
      })
      .then(data => {
        dispatch(fetchOrdersSuccess(data));
        return data;
      })
      .catch(error => {
        dispatch(fetchOrdersError(error));
      })

  }
}