import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {OrdersReducer} from "./redux/reducers/ordersReducer";
import {LoginReducer} from "./redux/reducers/loginReducer";
import thunk from "redux-thunk";
// import {PageReducer} from "./redux/reducers/pageReducer";
import {Provider} from "react-redux";

const middlewares = [thunk];

const allReducers = combineReducers({
    orders: OrdersReducer,
    login: LoginReducer,
    // page: PageReducer
  }
)

export const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root', applyMiddleware(...middlewares))
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
