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

