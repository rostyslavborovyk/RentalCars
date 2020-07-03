import {LOGIN, LOGOUT} from "../actions/loginActions";

const getIsLogged = () => {
  const isLogged = localStorage.getItem("isLogged");
  const timeOut = localStorage.getItem("isLoggedTimeout")
  if (timeOut){
    if (parseInt(timeOut) - (new Date().getTime()) < 0){
      localStorage.setItem("isLogged", "false");
      return isLogged === "false";

    }
    console.log(`Seconds till logout: ${(parseInt(timeOut) - (new Date().getTime())) / 1000}`)
  }
  return isLogged === "true";
}

const initialOrdersState = {
  isLogged: getIsLogged()
}

export function LoginReducer(state = initialOrdersState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        isLogged: true
      }
    case LOGOUT:
      return {
        isLogged: false
      }
    default:
      return state;
  }
}
