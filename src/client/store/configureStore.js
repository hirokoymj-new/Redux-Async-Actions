//import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createStore, applyMiddleware} from "redux";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import departmentsReducer from '../reducers/departments';
//import titlesReducer from '../reducers/jobTitles';

const middleware = applyMiddleware(thunk, createLogger()); 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () => {
//   const store = createStore(
//     combineReducers({
//       departments: departmentsReducer,
//     }),    
//     composeEnhancers(middleware)
//   );
//   return store;
// };

export default () => {
  const store = createStore(departmentsReducer, composeEnhancers(middleware));
  return store;
};



