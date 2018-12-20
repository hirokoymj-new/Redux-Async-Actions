import axios from "axios";

// Read departments.
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

// Delete a department.
export const deleteDepartment = (id) => {
  return function(dispatch) {
    dispatch({type: "DELETE_DEPARTMENT"});
    console.log(`/api/departments/${id}`);
    axios.delete(`/api/departments/${id}`)
      .then((response) => {
        dispatch({type: "DELETE_DEPARTMENT_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "DELETE_DEPARTMENT_REJECTED", payload: err})
      })
  }
}

// Create a department.
export const createDepartment = (departmentData={}) => {
  return function(dispatch) {
    const {
      name = '',
    } = departmentData;
    dispatch({type: "CREATE_DEPARTMENT"});
    axios.post("/api/departments", departmentData)
      .then((response) => {
        dispatch({type: "CREATE_DEPARTMENT_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "CREATE_DEPARTMENT_REJECTED", payload: err})
      })
  }
}

/**
 * Edit a department. Calls RESTful API PUT request. 
 * @param {string} id - departmente Id
 * @param {object} updates - update data {name: 'IT'}
 * @example
 * store.dispatch(editDepartment(10, {name:'Sales'}))
 * store.dispatch(editDepartment(10, {name:'Sales'})).then(()=>{console.log('Edit success!')})
 */
export const editDepartment = (id, updates) => {
  return (dispatch) => {
    dispatch({type: "EDIT_EMPLOYEE"});
    return axios.put(`/api/departments/${id}`, updates)
      .then((response) => {
        dispatch({type: "EDIT_EMPLOYEE_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "EDIT_EMPLOYEE_REJECTED", payload: err})
      })
  }
}

