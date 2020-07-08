import {LOGIN, LOGOUT} from "../actions/loginActions";
import {deleteCookie} from "../../common/js/cookies";

const getIsLogged = () => {
  const isLogged = localStorage.getItem("isLogged");
  const timeOut = localStorage.getItem("isLoggedTimeout")
  if (timeOut && isLogged === "true"){
    if (parseInt(timeOut) - (new Date().getTime()) < 0){
      localStorage.setItem("isLogged", "false");
      deleteCookie("isAdmin")
      return false;
    }
    console.log(`Seconds till logout: ${(parseInt(timeOut) - (new Date().getTime())) / 1000}`)
  }
  return isLogged === "true";
}

const getFirstName = () => {
  return localStorage.getItem("firstName")
}

const getLastName = () => {
  return localStorage.getItem("lastName")
}

const initialOrdersState = {
  isLogged: getIsLogged(),
  firstName: getFirstName(),
  lastName: getLastName()
}

export function LoginReducer(state = initialOrdersState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state,
        isLogged: true,
        firstName: getFirstName(),
        lastName: getLastName(),
      }
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        firstName: "",
        lastName: "",
      }
    default:
      return state;
  }
}
