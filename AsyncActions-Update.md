# Redux Async Actions - UPDATE
- Async actions allows us to keep the RESTful API calls separated from React component. 
  
## Liv Demo
https://async-actions.herokuapp.com/

### 1. Add Middleware
**Added two redux middlewares in creatStore.**
- [Redux thunk](https://github.com/reduxjs/redux-thunk)
  >Redux Thunk middleware allows you to write action creators that return a function instead of an action object.
- [Redux logger](https://github.com/LogRocket/redux-logger)


```js
import { createStore, applyMiddleware} from "redux";
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import departmentsReducer from '../reducers/departments';

const middleware = applyMiddleware(thunk, createLogger()); 
export default () => {
  const store = createStore(departmentsReducer, middleware);
  return store;
};
```

### 2. Async Action - returns a function!
- In `editDepartment()`, a function returns instead action object.

**Async action**
[src/client/actions/departments.js](./src/client/actions/departments.js)

```js
/**
 * @param {string} id - Departmente Id
 * @param {object} updates - Update info from edit form
 * @description
 * response.data is "updated data with a department Id"
 */
export const editDepartment = (id, updates) => {
  return (dispatch) => {
    dispatch({type: "EDIT_EMPLOYEE"});
    axios.put(`/api/departments/${id}`, updates)
      .then((response) => {
        dispatch({type: "EDIT_EMPLOYEE_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "EDIT_EMPLOYEE_REJECTED", payload: err})
      })
  }
}
```

**Back-End  RESTful API - PUT**
[src/server/route/departments.js](./src/server/routes/departments.js)

```js
router.put('/:id', (req, res)=>{
  let id = req.params.id;
  const {name} = req.body;  
  const update = {
    name
  }

  Department.findOneAndUpdate({_id: id}, update, {new: true}, (err, department)=>{
    if(err) return res.status(500).send(err);
    if(!department) return res.status(404).send('Can not find data');
    res.json(department); //!!! send modified document to React!!!
  });
})
```

## 3. Reducer
JavaScript promise has three status 1) Pending, 2) Fulfilled, 3) Rejected and Reducer has to have three types to related Promise status.

- EDIT_DEPARTMENT
- EDIT_DEPARTMENT_**REJECTED**
- EDIT_DEPARTMENT_**FULFILLED**

```js
const departmentsDefaultState = {
  isFetching: false,
  error: null,
  departments: []
};

const departmentsReducer = (state=departmentsDefaultState, action) => {
  switch (action.type) {
    case "EDIT_DEPARTMENT": {
      return {...state, isFetching: true}
    }
    case "EDIT_DEPARTMENT_REJECTED": {
      return {...state, isFetching: false, error: action.payload}
    }
    case "EDIT_DEPARTMENT_FULFILLED": {
      const updatedDepartments = state.departments.map((department)=>{
        if(department.id === action.updates.id){
          return {
            ...department,
            ...action.updates
          };
        }else{
          return department;
        }
      })
//      console.log(updatedDepartments);
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
```

## 4. Access Redux store in React component!
Here are the steps to access Redux store into React component.

1. Convert a regular component to **a connected component**. A connected component becomes to access Redux infomation.
   
2. Import `editDepartment()` from action/departments.js
3. Create EditDepartment Page and Department Form components.
4. Calls dispatch() in `onSubmit()` to edit data.

**Here is the entire code!**

**EditDepartmentPage**
```js
import React, {Component} from 'react';
import { connect } from 'react-redux';
// Import a necessary function from an action file.
import {editDepartment} from '../actions/departments';
import DepartmentForm from './DepartmentForm';

const EditDepartmentPage = (props) =>{
    return(
      <div>
        <h1>Edit Department Page</h1>
        <DepartmentForm 
          department={props.singleDepartment}
          onSubmit={(formData)=>{
            // Calls dispatch to edit data!!
            props.dispatch( editDepartment(props.match.params.id, formData) )
          }}/>
      </div>
    )
}  
const mapStateToProps = (state, props) => {
  return {
    singleDepartment: state.departments.find((department) => department._id === props.match.params.id)
  };
};
// Convert a regular component to a connected component.
export default connect(mapStateToProps)(EditDepartmentPage);
```

**DepartmentForm**
```js
import React, {Component} from 'react';
import { connect } from 'react-redux';

export default class DepartmentForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      departmentName: this.props.department ? this.props.department.name : ''
    }
  }
  handleChange = (e)=>{
    this.setState({
      departmentName: e.target.value
    })
  }
  onSubmit = (e) =>{
    e.preventDefault();
    const formData = {
      name: this.state.departmentName
    }
    console.log('formData', formData);
    this.props.onSubmit(formData);
  }
  render(){
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Department Name:</label>
          <input type="text" name="departmentName" value={this.state.departmentName} onChange={this.handleChange} />
          <button type="submit">{this.props.department ? "Edit" : "Add"}</button>
        </form>        
      </div>
    )
  }
}
```

## Screenshot in Redux dev tool
![](public/images/editDepartment.png)


## References:
- [Redux Async Actions](https://redux.js.org/advanced/async-actions)
