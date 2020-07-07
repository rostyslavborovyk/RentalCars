export const selectPage = (state) => {
  return state.cars.page
}

export const selectNumOfPages = (state) => {
  return state.cars.num_of_pages
}

export const selectCost = (state) => {
  return {
    fromCost: state.cars.fromCost,
    byCost: state.cars.byCost
  }
}

export const selectCars = (state) => {
  return state.cars.cars
}

export const selectPending = (state) => {
  return state.cars.pending
}

