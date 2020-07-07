export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';
export const INCREMENT_ORDERS_PAGE = 'INCREMENT_ORDERS_PAGE';
export const DECREMENT_ORDERS_PAGE = 'DECREMENT_ORDERS_PAGE';
export const SET_ORDERS_DATE = 'SET_ORDERS_DATE';
export const DELETE_ORDER_PENDING= 'DELETE_ORDER_PENDING';
export const DELETE_ORDER_SUCCESS= 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_ERROR= 'DELETE_ORDER_ERROR';

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

export function incrementOrdersPage() {
  return {
    type: INCREMENT_ORDERS_PAGE
  }
}


export function decrementOrdersPage() {
  return {
    type: DECREMENT_ORDERS_PAGE,
  }
}

export function setOrdersDate(date) {
  return {
    type: SET_ORDERS_DATE,
    date: date
  }
}

export function deleteOrderPending() {
  return {
    type: DELETE_ORDER_PENDING
  }
}

export function deleteOrderSuccess() {
  return {
    type: DELETE_ORDER_SUCCESS,
  }
}

export function deleteOrderError(error) {
  return {
    type: DELETE_ORDER_ERROR,
    error: error
  }
}
