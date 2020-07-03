import {fetchLogin, fetchLogout} from "../redux/fetch/loginFetch";
import {store} from "../index";
import {deleteCookie} from "../common/cookies";

class Auth {
  // isLoggedTimeout is set to remove isLogged from local storage whe the time is off
  setIsLoggedWithTimeout(isLogged, minutes){
    localStorage.setItem("isLogged", isLogged)

    if (isLogged === "true"){
      const now = new Date().getTime()
      localStorage.setItem("isLoggedTimeout", (now + minutes * 60 * 1000).toString())
    } else {
      localStorage.removeItem("isLoggedTimeout")
    }

  }

  async login(passportNum, password) {
    const res =  fetchLogin(passportNum, password)(store.dispatch);
    if (res === true){
      this.setIsLoggedWithTimeout("true", 5)
    }
    return res
  }

  async logout() {
    const res = fetchLogout()(store.dispatch)
    if (res === true){
      this.setIsLoggedWithTimeout("false", 0)
    }
    deleteCookie("isAdmin")
    return res
  }

  selectIsAuthentificated (state) {
    return state.login.isLogged
  }

  isAuthentificated() {
    return this.selectIsAuthentificated(store.getState())
  }

}

export default new Auth();
