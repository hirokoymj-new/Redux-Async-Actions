import departmentsReducer from '../../reducers/departments';
import departments from '../fixtures/departments';

test('should set default state', () => {
  const action = {type: '@@INIT'};
  const state = departmentsReducer(undefined, action);
  expect(state.departments).toEqual([]);
});

test('should get all departments', () => {
  const action = {
      type: 'FETCH_DEPARTMENTS_FULFILLED',
      payload: departments
    };
  const state = departmentsReducer(undefined, action);
  expect(state.departments).toEqual(departments);
});

test('should delete a department', () => {
  const currentState = {
    isFetching: false,
    error: null,
    departments: departments    
  }
  const action = {
    type: 'DELETE_DEPARTMENT_FULFILLED',
    payload: {
      id: departments[1]._id,
      deleted: departments[1]
    }
  };

  const state = departmentsReducer(currentState, action);
  expect(state.departments).toEqual([
    departments[0], departments[2]
  ]);
});

test('should delete a department if a department not found', () => {
  const currentState = {
    isFetching: false,
    error: null,
    departments: departments    
  }
  const action = {
    type: 'DELETE_DEPARTMENT_FULFILLED',
    payload: {id: '-99', deleted: {}}
  };

  const state = departmentsReducer(currentState, action);
  expect(state.departments).toEqual(departments);
});

test('should create new department', () => {
  const currentState = {
    isFetching: false,
    error: null,
    departments: departments    
  }
  const action = {
    type: 'CREATE_DEPARTMENT_FULFILLED',
    payload: {name: 'New department'}
  }  
  const state = departmentsReducer(currentState, action);
  expect(state.departments).toEqual([
    ...currentState.departments,
    action.payload
  ]);
});

test('Edit department test', ()=>{
  const name = "My department";
  const currentState = {
    departments: departments    
  }
  const action = {
    type: 'EDIT_DEPARTMENT_FULFILLED',
    payload: {
      _id: departments[0]._id,
      name
    }
  }
  const state = departmentsReducer(currentState, action);
  expect(state.departments[0].name).toBe(name);
});