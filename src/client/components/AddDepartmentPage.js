import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createDepartment} from '../actions/departments';

class AddDepartmentPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      departmentName: '',
      message: ''
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
    this.props.dispatch( createDepartment(formData) )
      .then(()=>{
        this.setState({
          message: "Success!"
        });
        this.onReset();
      })
  }
  onReset = () =>{
    this.setState({
      departmentName: '',
    })
  }
  render(){
    return(
      <div>
        <h1>Add Department</h1>
        <p>{this.state.message}</p>
        <form onSubmit={this.onSubmit}>
          <label>Department Name:</label>
          <input type="text" name="departmentName" value={this.state.departmentName} onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}  
export default connect()(AddDepartmentPage);