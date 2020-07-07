import {
  DECREMENT_ORDERS_PAGE,
  FETCH_ORDERS_ERROR,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS,
  INCREMENT_ORDERS_PAGE, SET_ORDERS_DATE
} from "../actions/ordersActions";

const initialOrdersState = {
  pending: false,
  orders: [],
  error: null,
  page: 1,
  num_of_pages: 1,
  fromDate: null,
  toDate: null,
  deletedFlag: null  // if car deletes flag changes to trigger page reloading
}

export function OrdersReducer(state = initialOrdersState, action) {
  switch(action.type) {
    case FETCH_ORDERS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        pending: false,
        orders: action.orders.items,
        num_of_pages: action.orders.num_of_pages
      }

    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case INCREMENT_ORDERS_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case DECREMENT_ORDERS_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case SET_ORDERS_DATE:
      return {
        ...state,
        fromDate: action.date.fromDate,
        toDate: action.date.toDate
      }
    default:
      return state;
  }
}
