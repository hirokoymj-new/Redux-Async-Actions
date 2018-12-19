import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_User
const addUser = (
  {
    firstname = '',
    lastname = '',
    email = ''
  } = {}
) => ({
  type: 'ADD_USER',
  user: {
    id: uuid(),
    firstname,
    lastname,
    email
  }
});

// REMOVE_User
const removeUser = ({ id } = {}) => ({
  type: 'REMOVE_USER',
  id
});

// EDIT_User
const editUser = (id, updates) => ({
  type: 'EDIT_USER',
  id,
  updates
});



// Users Reducer
const usersDefaultState = [];

const usersReducer = (state = usersDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.user
      ];
    case 'REMOVE_USER':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_USER':
      return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates
          };
        } else {
          return user;
        };
      });
    default:
      return state;
  }
};


// Store creation
const store = createStore(
  combineReducers({
    users: usersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

const userOne = store.dispatch(addUser({ firstname: 'Jen', lastname: 'Smith', email: 'jen@gmail.com' }));
const userTwo = store.dispatch(addUser({ firstname: 'Hiroko', lastname: 'Yamaji', email:'hiroko@test.com' }));
const userThree = store.dispatch(addUser({ firstname: 'Grace', lastname: 'Brown', email:'hiroko@test.com' }));

store.dispatch(removeUser({id: userThree.user.id}));
//console.log(userThree.user.id);
store.dispatch(editUser(userTwo.user.id, {firstname: 'Alice'}));

const demoState = {
  users: [{
    id: 'poijasdfhwer',
    firstName: 'Smith',
    lastName: 'Brown',
    email: 'smith@test.com'
  }]
};
