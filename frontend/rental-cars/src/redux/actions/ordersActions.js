// import {DECREMENT_PAGE, INCREMENT_PAGE} from "./pageActions";

export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';
export const SET_DATE = 'SET_DATE';

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

export function incrementPage() {
  return {
    type: INCREMENT_PAGE
  }
}


export function decrementPage() {
  return {
    type: DECREMENT_PAGE,
  }
}

export function setDate(date) {
  return {
    type: SET_DATE,
    date: date
  }
}