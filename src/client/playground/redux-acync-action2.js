import { applyMiddleware, createStore, compose } from "redux";
import axios from "axios";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const fetchUsers  = () =>({
  type: "FETCH_DEPARTMENTS",
  payload: axios.get("/api/departments")
})

const initialState = {
  fetching: false,
  fetched: false,
  departments: [],
  error: null,
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "FETCH_DEPARTMENTS_PENDING": {
      return {...state, fetching: true}
      break;
    }
    case "FETCH_DEPARTMENTS_REJECTED": {
      return {...state, fetching: false, error: action.error}
      break;
    }
    case "FETCH_DEPARTMENTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        departments: action.payload,
      }
      break;
    }
  }
  return state
}

const middleware = applyMiddleware(promise(), thunk, createLogger())
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(middleware)
);

store.dispatch({
  type: "FETCH_DEPARTMENTS",
  payload: axios.get("/api/departments")
});

//store.dispatch(fetchDEPARTMENTS());