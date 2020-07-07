export const FETCH_CLIENTS_PENDING = 'FETCH_CLIENTS_PENDING';
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS';
export const FETCH_CLIENTS_ERROR = 'FETCH_CLIENTS_ERROR';
export const INCREMENT_CLIENTS_PAGE = 'INCREMENT_CLIENTS_PAGE';
export const DECREMENT_CLIENTS_PAGE = 'DECREMENT_CLIENTS_PAGE';
export const SET_CLIENTS_DATE = 'SET_CLIENTS_DATE';
export const DELETE_CLIENT_PENDING= 'DELETE_CLIENT_PENDING';
export const DELETE_CLIENT_SUCCESS= 'DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_ERROR= 'DELETE_CLIENT_ERROR';

export function fetchClientsPending() {
  return {
    type: FETCH_CLIENTS_PENDING
  }
}

export function fetchClientsSuccess(clients) {
  return {
    type: FETCH_CLIENTS_SUCCESS,
    clients: clients
  }
}

export function fetchClientsError(error) {
  return {
    type: FETCH_CLIENTS_ERROR,
    error: error
  }
}

export function incrementClientsPage() {
  return {
    type: INCREMENT_CLIENTS_PAGE
  }
}


export function decrementClientsPage() {
  return {
    type: DECREMENT_CLIENTS_PAGE,
  }
}

export function setClientsDate(date) {
  return {
    type: SET_CLIENTS_DATE,
    date: date
  }
}

export function deleteClientPending() {
  return {
    type: DELETE_CLIENT_PENDING
  }
}

export function deleteClientSuccess() {
  return {
    type: DELETE_CLIENT_SUCCESS,
  }
}

export function deleteClientError(error) {
  return {
    type: DELETE_CLIENT_ERROR,
    error: error
  }
}

