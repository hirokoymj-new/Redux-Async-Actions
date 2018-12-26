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
      const updateDepartments = state.departments.filter(({ _id }) => _id !== action.payload.id);
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
      return {
        ...state,
        isFetching: false,
        departments: [...state.departments, action.payload],
      }
    }
    case "EDIT_DEPARTMENT": {
      return {...state, isFetching: true}
    }
    case "EDIT_DEPARTMENT_REJECTED": {
      return {...state, isFetching: false, error: action.payload}
    }
    case "EDIT_DEPARTMENT_FULFILLED": {
      console.log('EDIT_DEPARTMENT_FULFILLED');
      const updatedDepartments = state.departments.map(({_id})=>{
        console.log("_id", _id)
        if(_id === action.payload.id){
          return {
            ...department,
            ...action.payload.updatedData
          };
        }else{
          return department;
        }
      })
      return {
        ...state,
        // Override rest of properties to update.
        isFetching: false,
        departments: updatedDepartments
      }
    }    
  }
  return state
}
export default departmentsReducer;