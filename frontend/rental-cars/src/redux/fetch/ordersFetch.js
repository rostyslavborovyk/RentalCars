import {
  deleteOrderError,
  deleteOrderSuccess,
  fetchOrdersError,
  fetchOrdersPending,
  fetchOrdersSuccess
} from "../actions/ordersActions"

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

export const fetchDeleteOrder = (order_id) => {
  return dispatch => {
    let url = `http://localhost:5000/api/orders/${order_id}`
    fetch(url, {
      method: "DELETE"
    })
      .then(res => {
        if (res.error) {
          throw(res.error);
        }
        dispatch(deleteOrderSuccess());
      })
      .catch(error => {
        console.log("error")
        console.log(error)
        dispatch(deleteOrderError(error));
      })
  }
}