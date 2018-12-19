const departmentsDefaultState = {
  isFetching: false,
  error: null,
  departments: []
};

const departmentsReducer = (state=departmentsDefaultState, action) => {
  switch (action.type) {
    case "FETCH_DEPARTMENTS": {
      return {...state, isFetching: true}
    }
    case "FETCH_DEPARTMENTS_REJECTED": {
      return {...state, isFetching: false, error: action.payload}
    }
    case "FETCH_DEPARTMENTS_FULFILLED": {
      return {
        ...state,
        isFetching: false,
        departments: action.payload,
      }
    }
    case "DELETE_DEPARTMENT": {
      return {...state, isFetching: true}
    }
    case "DELETE_DEPARTMENT_REJECTED": {
      return {...state, isFetching: false, error: action.payload}
    }
    case "DELETE_DEPARTMENT_FULFILLED": {
      console.log('DELETE_DEPARTMENT_FULFILLED');
      const updateDepartments = state.departments.filter(({ _id }) => _id !== action.payload._id);
      console.log(updateDepartments);
      return {
        ...state,
        isFetching: false,
        departments: updateDepartments
      }
    }
    case "CREATE_DEPARTMENT": {
      return {...state, isFetching: true}
    }
    case "CREATE_DEPARTMENT_REJECTED": {
      return {...state, isFetching: false, error: action.payload}
    }
    case "CREATE_DEPARTMENT_FULFILLED": {
      console.log('CREATE_DEPARTMENT_FULFILLED');
      console.log(action.payload); //check if new department received correctly!!
      return {
        ...state,
        isFetching: false,
        departments: [...state.departments, action.payload],
      }
    }
  }
  return state
}
export default departmentsReducer;