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
  onReset = () =>{
    this.setState({
      departmentName:''
    })
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

