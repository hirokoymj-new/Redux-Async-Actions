import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createDepartment} from '../actions/departments';

//export default class AddDepartmentPage extends Component{
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
    this.props.dispatch( createDepartment(formData));
  }
  render(){
    return(
      <div>
        <h1>Add Department Page</h1>
        <form onSubmit={this.onSubmit}>
          <label></label>
          <input type="text" name="departmentName" value={this.state.departmentName} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}  
export default connect()(AddDepartmentPage);