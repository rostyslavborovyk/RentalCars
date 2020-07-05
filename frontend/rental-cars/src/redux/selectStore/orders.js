export const selectPage = (state) => {
  return state.orders.page
}

export const selectNumOfPages = (state) => {
  return state.orders.num_of_pages
}

export const selectDate = (state) => {
  return {
    fromDate: state.orders.fromDate,
    toDate: state.orders.toDate
  }
}

