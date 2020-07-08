export const FETCH_CARS_PENDING = 'FETCH_CARS_PENDING';
export const FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS';
export const FETCH_CARS_ERROR = 'FETCH_CARS_ERROR';
export const INCREMENT_CARS_PAGE = 'INCREMENT_CARS_PAGE';
export const DECREMENT_CARS_PAGE = 'DECREMENT_CARS_PAGE';
export const SET_CARS_COST= 'SET_CARS_COST';
export const DELETE_CAR_PENDING= 'DELETE_CAR_PENDING';
export const DELETE_CAR_SUCCESS= 'DELETE_CAR_SUCCESS';
export const DELETE_CAR_ERROR= 'DELETE_CAR_ERROR';

export function fetchCarsPending() {
  return {
    type: FETCH_CARS_PENDING
  }
}

export function fetchCarsSuccess(cars) {
  return {
    type: FETCH_CARS_SUCCESS,
    cars: cars
  }
}

export function fetchCarsError(error) {
  return {
    type: FETCH_CARS_ERROR,
    error: error
  }
}

export function incrementCarsPage() {
  return {
    type: INCREMENT_CARS_PAGE
  }
}


export function decrementCarsPage() {
  return {
    type: DECREMENT_CARS_PAGE,
  }
}

export function setCarsCost(cost) {
  return {
    type: SET_CARS_COST,
    cost: cost
  }
}

export function deleteCarPending() {
  return {
    type: DELETE_CAR_PENDING
  }
}

export function deleteCarSuccess() {
  return {
    type: DELETE_CAR_SUCCESS,
  }
}

export function deleteCarError(error) {
  return {
    type: DELETE_CAR_ERROR,
    error: error
  }
}
