import { applyMiddleware, createStore } from 'redux'; 
import axios from "axios";
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const defaultState = {
  fetching: false,
  fetched: false,
  lat:0,
  lon:0,
  error: null
}
const reducer = (state=defaultState, action) =>{
  switch(action.type){
    case "FETCH_USERS_START" : {
      return{...state, fetching: true}
      break;
    }
    case "FETCH_USERS_ERROR" : {
      return {...state, fetching: false}
      break;
    }
    case "RECEIVE_USERS" : {
      return{...state, fetching: false, fetched: true, lat: action.lat, lon: action.lon}
      break;
    }
  }
  return state
}

//const middleware = applyMiddleware(thunk, logger());
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

//store.dispatch({type: "FOO"})

store.dispatch((dispatch) =>{
  dispatch({type: "FETCH_USERS_START"});
  axios.get("http://ipinfo.io/json?token=4cb10e9b3bcb4c")
    .then((response) =>{
      const [lat, lon] = response.data.loc.split(",");
      let city = response.data.city;
      dispatch({type: "RECEIVE_USERS", lat: lat, lon: lon })
    })
    .catch((err)=>{
      dispatch({type: "FETCH_USERS_ERROR", error: err})
    })
})