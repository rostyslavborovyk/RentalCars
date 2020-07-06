export const selectPage = (state) => {
  return state.clients.page
}

export const selectNumOfPages = (state) => {
  return state.clients.num_of_pages
}

export const selectDate = (state) => {
  return {
    fromDate: state.clients.fromDate,
    toDate: state.clients.toDate
  }
}

export const selectClients = (state) => {
  return state.clients.clients
}

export const selectPending = (state) => {
  return state.clients.pending
}

