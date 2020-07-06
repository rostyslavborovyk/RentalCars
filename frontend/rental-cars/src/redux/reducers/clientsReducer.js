import {
  DECREMENT_CLIENTS_PAGE,
  FETCH_CLIENTS_ERROR,
  FETCH_CLIENTS_PENDING,
  FETCH_CLIENTS_SUCCESS,
  INCREMENT_CLIENTS_PAGE, SET_CLIENTS_DATE
} from "../actions/clientsActions";

const initialClientsState = {
  pending: false,
  clients: [],
  error: null,
  page: 1,
  num_of_pages: 1,
  fromDate: null,
  toDate: null
}

export function ClientsReducer(state = initialClientsState, action) {
  switch(action.type) {
    case FETCH_CLIENTS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        clients: action.clients.items,
        num_of_pages: action.clients.num_of_pages
      }

    case FETCH_CLIENTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case INCREMENT_CLIENTS_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case DECREMENT_CLIENTS_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case SET_CLIENTS_DATE:
      return {
        ...state,
        fromDate: action.date.fromDate,
        toDate: action.date.toDate
      }
    default:
      return state;
  }
}
