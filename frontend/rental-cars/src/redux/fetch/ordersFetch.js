import {fetchOrdersError, fetchOrdersPending, fetchOrdersSuccess} from "../actions/ordersActions"

export const fetchOrders = (
  numOfItems = 10,
  offset = 0,
  fromDate = null,
  toDate = null
) => {
  return dispatch => {
    dispatch(fetchOrdersPending());
    let url = `http://localhost:5000/api/orders/table?num_of_items=${numOfItems}&offset=${offset}`
    if (fromDate && toDate){
      url += `&from_date=${fromDate}&to_date=${toDate}`
    }
    fetch(url)
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