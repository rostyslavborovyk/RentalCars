import {FETCH_ORDERS_ERROR, FETCH_ORDERS_PENDING, FETCH_ORDERS_SUCCESS} from "../actions/ordersActions";

const initialOrdersState = {
  pending: false,
  orders: [],
  error: null
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
        orders: action.orders
      }
    case FETCH_ORDERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      return state;
  }
}
