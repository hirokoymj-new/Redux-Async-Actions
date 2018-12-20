import React, {Component} from 'react';
import { connect } from 'react-redux';
import {editDepartment} from '../actions/departments';
import DepartmentForm from './DepartmentForm';

class EditDepartmentPage extends Component{
  constructor(props){
    super(props);
    this.state = {message: ''}
    this.formRef = React.createRef();
  }
  render(){
    return(
      <div>
        <h1>Edit Department</h1>
        <p>{this.state.message}</p>
        <DepartmentForm 
          department={this.props.singleDepartment}
          ref={this.formRef}
          onSubmit={(formData)=>{
            this.props.dispatch( editDepartment(this.props.match.params.id, formData) )
              .then(()=>{
                this.setState({
                  message: 'Success to edit!!'
                });
                this.formRef.current.onReset()
              })
          }}/>
      </div>
    )
  }
}  
const mapStateToProps = (state, props) => {
  return {
    singleDepartment: state.departments.find((department) => department._id === props.match.params.id)
  };
};
export default connect(mapStateToProps)(EditDepartmentPage);