import {createStore} from 'redux';

// Action generators
const setFilterText = (text) =>({
  type: 'SET_FILTER_TEXT',
  text
});
const setSortByFirstName = () =>({
  type: "SET_SORT_BY_FIRSTNAME"
});
const setSortByLastName = () =>({
  type: "SET_SORT_BY_LASTNAME"
});


// Reducer 
const defaultFilterState = {
  text: '',
  sortBy: ''
}
const filterReducer = (state=defaultFilterState, action) =>{
  switch (action.type){
    case 'SET_FILTER_TEXT':
      return{
        ...state,
        text: action.text
      }
    case 'SET_SORT_BY_FIRSTNAME':
      return{
        ...state,
        sortBy: 'firstname'
      }
    case 'SET_SORT_BY_LASTNAME':
      return{
        ...state,
        sortBy: 'lastname'
      } 
    default:
      return state;
  }
}
// Create redux store
const store = createStore(filterReducer);

// Watch 
store.subscribe(()=>{
  console.log(store.getState());
});

//Let's use redux store
// console.log(setFilterText('coffee'));
store.dispatch(setFilterText('coffee')); // text: 'coffee'

store.dispatch(setSortByFirstName()); 
store.dispatch(setSortByLastName()); 


const demoState = {
  filters: {
    text: 'rent', //firstname
    sortBy: 'firstname', // firstname or lastname or email
  }
};