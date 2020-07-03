export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export function fetchOrdersPending() {
  return {
    type: FETCH_ORDERS_PENDING
  }
}

export function fetchOrdersSuccess(orders) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export function fetchOrdersError(error) {
  return {
    type: FETCH_ORDERS_ERROR,
    error: error
  }
}
