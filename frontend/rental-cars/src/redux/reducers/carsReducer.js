import {
  DECREMENT_CARS_PAGE, DELETE_CAR_SUCCESS,
  FETCH_CARS_ERROR,
  FETCH_CARS_PENDING,
  FETCH_CARS_SUCCESS,
  INCREMENT_CARS_PAGE, SET_CARS_COST
} from "../actions/carsActions";

const initialCarsState = {
  pending: false,
  cars: [],
  error: null,
  page: 1,
  num_of_pages: 1,
  fromCost: null,
  byCost: null,
  deletedFlag: null  // if car deletes flag changes to trigger page reloading
}

export function CarsReducer(state = initialCarsState, action) {
  switch(action.type) {
    case FETCH_CARS_PENDING:
      return {
        ...state,
        pending: true
      }
    case FETCH_CARS_SUCCESS:
      return {
        ...state,
        pending: false,
        cars: action.cars.items,
        num_of_pages: action.cars.num_of_pages
      }

    case FETCH_CARS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case INCREMENT_CARS_PAGE:
      return {
        ...state,
        page: state.page + 1
      }
    case DECREMENT_CARS_PAGE:
      return {
        ...state,
        page: state.page - 1
      }
    case SET_CARS_COST:
      return {
        ...state,
        fromCost: action.cost.fromCost,
        byCost: action.cost.byCost
      }
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        deletedFlag: !state.deletedFlag
      }
    default:
      return state;
  }
}
