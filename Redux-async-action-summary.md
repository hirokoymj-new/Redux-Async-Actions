# Redux async actions CRUD - Summary

## Async action - Fetch 
```js
export const fetchDepartments = () => {
  return function(dispatch) {
    dispatch({type: "FETCH_DEPARTMENTS"});
    axios.get("/api/departments")
      .then((response) => {
        dispatch({type: "FETCH_DEPARTMENTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_DEPARTMENTS_REJECTED", payload: err})
      })
  }
}
```

## Reducer - Fetch
```js
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
  }}    
```
<hr />



## Async action - Delete 
```js
export const deleteDepartment = (id) => {
  return function(dispatch) {
    dispatch({type: "DELETE_DEPARTMENT"});
    axios.delete(`/api/departments/${id}`)
      .then((response) => {
        dispatch({
          type: "DELETE_DEPARTMENT_FULFILLED",
          payload: {
            id: id,
            deletedData: response.data
          }
        })
      })
      .catch((err) => {
        dispatch({type: "DELETE_DEPARTMENT_REJECTED", payload: err})
      })
  }
}
```
## Reducer - Delete
```js
switch (action.type) {
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
}      
```
<hr />



# Async action - Create 
```js
export const createDepartment = (departmentData={}) => {
  return function(dispatch) {
    const {
      name = '',
    } = departmentData;
    dispatch({type: "CREATE_DEPARTMENT"});
    return axios.post("/api/departments", departmentData)
      .then((response) => {
        dispatch({type: "CREATE_DEPARTMENT_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "CREATE_DEPARTMENT_REJECTED", payload: err})
      })
  }
}
```
## Reducer - Create
```js
switch (action.type) {
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
}    
```
<hr />


# Action action - Edit 
```js
export const editDepartment = (id, updates) => {
  return function(dispatch){
    dispatch({type: "EDIT_EMPLOYEE"});
    return axios.put(`/api/departments/${id}`, updates)
      .then((response) => {
        dispatch({
          type: "EDIT_EMPLOYEE_FULFILLED",
          payload: {
            id: id,
            updatedData: response.data
          }})
      })
      .catch((err) => {
        dispatch({type: "EDIT_EMPLOYEE_REJECTED", payload: err})
      })
  }
}
```
## Reducer - Edit
```js
switch (action.type) {
  case "EDIT_DEPARTMENT": {
    return {...state, isFetching: true}
  }
  case "EDIT_DEPARTMENT_REJECTED": {
    return {...state, isFetching: false, error: action.payload}
  }
  case "EDIT_DEPARTMENT_FULFILLED": {
    const updatedDepartments = state.departments.map(({_id})=>{
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
```
