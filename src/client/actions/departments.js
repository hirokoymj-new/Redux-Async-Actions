import axios from "axios";

/**
 * Get all department data. Calls HTTP GET request. 
 * @example
 * store.dispatch(fetchDepartments())
 */
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

/**
 * Delete a department. Calls HTTP DELETE request. 
 * @param {string} id - Department Id
 * @example
 * store.dispatch(deleteDepartment({name:'Sales'}))
 */
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

/**
 * Create a department. Calls HTTP POST request. 
 * @param {object} departmentData
 * @example
 * store.dispatch(createDepartment({name:'Sales'}))
 * store.dispatch(createDepartment({name:'Sales'})).then(()=>{console.log('Save!')})
 */
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

/**
 * Edit a department. Calls HTTP PUT request. 
 * @param {string} id - departmente Id
 * @param {object} updates - update data {name: 'IT'}
 * @example
 * store.dispatch(editDepartment(10, {name:'Sales'}))
 * store.dispatch(editDepartment(10, {name:'Sales'})).then(()=>{console.log('Edit success!')})
 */
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

