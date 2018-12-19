# Redux Async Actions - CREATE
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
- In `createDepartment()`, a function returns instead action object.

**Async action**
[src/client/actions/departments.js](./src/client/actions/departments.js)

```js
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
```

**Back-End  RESTful API - POST**
[src/server/route/departments.js](./src/server/routes/departments.js)

```js
router.post('/', (req, res)=>{
  const {name} = req.body;
  const department = new Department({
    name
  });

  department.save(function(err){
    if(err) return res.status(500).send(err);
    if(!department) return res.status(404).send(err);
    res.json(department);
  })
});

```

## 3. Reducer
JavaScript promise has three status 1) Pending, 2) Fulfilled, 3) Rejected and Reducer has to have three types to related Promise status.

- CREATE_DEPARTMENT
- CREATE_DEPARTMENT_**REJECTED**
- CREATE_DEPARTMENT_**FULFILLED**

```js
const departmentsDefaultState = {
  isFetching: false,
  error: null,
  departments: []
};

const departmentsReducer = (state=departmentsDefaultState, action) => {
  switch (action.type) {
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
```

## 4. Access Redux store in React component!
Here are the steps to access Redux store into React component.

1. Convert a regular component to **a connected component**. A connected component becomes to access Redux infomation.
   
2. Import `deleteDepartment()` from action/departments.js
  ```js
  import {createDepartment} from '../actions/departments';
  ```
3. Add form.
4. Calls dispatch() in `onSubmit()` to save data.
  ```js
  onSubmit = (e) =>{
    e.preventDefault();
    const formData = {
      name: this.state.departmentName
    }
    this.props.dispatch( createDepartment(formData));
  }
  ```

**Here is the entire code!**

```js
import React, {Component} from 'react';
import { connect } from 'react-redux';
// 2. import createDepartment function in action file.
import {createDepartment} from '../actions/departments';

class AddDepartmentPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      departmentName: ''
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
    //4. Call dispatch() to save form data!!
    this.props.dispatch( createDepartment(formData));
  }
  render(){
    return(
      <div>
        <h1>Add Department Page</h1>
        <form onSubmit={this.onSubmit}>
          <label></label>
          <input 
            type="text"
            name="departmentName"
            value={this.state.departmentName} 
            onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}  
// 1. Convert a regular component to a connected component. 
export default connect()(AddDepartmentPage);
```

## Redux Dev Tool screenshot
![](public/images/createDepartment.png)


## References:
- [Redux Async Actions](https://redux.js.org/advanced/async-actions)
