import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchDepartments, deleteDepartment} from '../actions/departments';

class DepartmentListPage extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch( fetchDepartments() );  // dispatch async action!!!
  }

  render() {
      return (
        <div>
          <h1>Redux Async Action Demo - Read</h1>
          <ul>
            {
              this.props.departments.map((department) =>
                <li 
                  key={department._id}>
                    {department.name} 
                    <button
                      onClick={()=>{ 
                        this.props.dispatch(deleteDepartment(department._id)); 
                        this.props.history.push('/');
                      }}>
                    Delete
                    </button>
                </li>
              )
            }
          </ul>                
        </div>
      ) 
  }  
};
const mapStateToProps = (state) => {
  return {
    departments: state.departments,
    error: state.departments.error
  };
};
export default connect(mapStateToProps)(DepartmentListPage);
