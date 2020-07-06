import {fetchClientsError, fetchClientsPending, fetchClientsSuccess} from "../actions/clientsActions"

export const fetchClients = (
  numOfItems = 10,
  offset = 0,
  fromDate = null,
  toDate = null
) => {
  return dispatch => {
    dispatch(fetchClientsPending());
    let url = `http://localhost:5000/api/clients/table?num_of_items=${numOfItems}&offset=${offset}`
    if (fromDate && toDate){
      url += `&from_date=${fromDate}&to_date=${toDate}`
    }
    fetch(url)
      .then(res => {
        if(res.error) {
          throw(res.error);
        }
        return res.json()
      })
      .then(data => {
        dispatch(fetchClientsSuccess(data));
        return data;
      })
      .catch(error => {
        console.log("error")
        console.log(error)
        dispatch(fetchClientsError(error));
      })

  }
}