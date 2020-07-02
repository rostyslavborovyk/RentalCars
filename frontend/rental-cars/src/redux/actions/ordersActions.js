export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export function fetchOrdersPending() {
  return {
    type: FETCH_ORDERS_PENDING
  }
}

export function fetchOrdersSuccess(orders) {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export function fetchOrdersError(error) {
  return {
    type: FETCH_ORDERS_ERROR,
    error: error
  }
}

// export const fetchOrders = async () => {
//   return {
//     type: "FETCH_ORDERS",
//     payload: [
//       {
//         "order_id": "07035d78457641cba2b62315caa07aa2",
//         "car_number": "876fa87435874d60a77ccfe6b4db1fa8",
//         "client_passport_num": "qwe2",
//         "add_date": "20.06.20",
//         "rental_time": 1,
//         "car_rental_cost": 200.0,
//         "total_cost": 200.0
//       },
//       {
//         "order_id": "15ed3edb54264bc7bec3d2ad0f506c44",
//         "car_number": "6fad085e9dc94f3195a1a983482631d4",
//         "client_passport_num": "qw23r",
//         "add_date": "08.06.20",
//         "rental_time": 2,
//         "car_rental_cost": 100.0,
//         "total_cost": 200.0
//       },
//       {
//         "order_id": "53580bd2644c46689bfc91e8721557fc",
//         "car_number": "659098dc91d840f6be1076db6f89fd7c",
//         "client_passport_num": "er21w",
//         "add_date": "27.06.20",
//         "rental_time": 5,
//         "car_rental_cost": 140.0,
//         "total_cost": 700.0
//       }
//     ]
//   }
// }