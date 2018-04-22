import React, { Component } from 'react';
import StudentsGallery from './StudentsGallery';
import StudentPage from './StudentPage';

const students = ["Joe", "Alice", "Fred", "Christina", "Joe", "Alex"]
const teacher = ["Mr. Joe"]

export default class EducationDashboard extends Component {
    constructor(props){
    super(props);
    this.state = {
      currentStudent: null,
    };
  }
  
  pickStudent = (id) => {
		this.setState({ currentStudent: id });
	}

	renderStudentGallery = () => {
		return this.state.currentStudent != null
			? <StudentPage student={this.state.currentStudent}/>
		  : <StudentsGallery students={students} teacher={teacher} pickStudent={this.pickStudent}/>
	}
	

  render() {
    return (
      <div className="educational-dashboard" >
        {this.renderStudentGallery()}
      </div>
    );
  }
}
