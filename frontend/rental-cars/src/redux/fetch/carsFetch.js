import {deleteCarSuccess, fetchCarsError, fetchCarsPending, fetchCarsSuccess} from "../actions/carsActions"

export const fetchCars = (
  numOfItems = 10,
  offset = 0,
  fromCost = null,
  byCost = null,
) => {
  return dispatch => {
    dispatch(fetchCarsPending());
    let url = `http://localhost:5000/api/cars/table?num_of_items=${numOfItems}&offset=${offset}`
    if (fromCost && byCost) {
      url += `&from_cost=${fromCost}&by_cost=${byCost}`
    }
    fetch(url)
      .then(res => {
        if (res.error) {
          throw(res.error);
        }
        return res.json()
      })
      .then(data => {
        dispatch(fetchCarsSuccess(data));
        return data;
      })
      .catch(error => {
        console.log("error")
        console.log(error)
        dispatch(fetchCarsError(error));
      })
  }
}

export const fetchDeleteCar = (car_id) => {
  return dispatch => {
    let url = `http://localhost:5000/api/cars/${car_id}`
    fetch(url, {
      method: "DELETE"
    })
      .then(res => {
        if (res.error) {
          throw(res.error);
        }
        dispatch(deleteCarSuccess());
      })
      .catch(error => {
        console.log("error")
        console.log(error)
        dispatch(fetchCarsError(error));
      })
  }
}