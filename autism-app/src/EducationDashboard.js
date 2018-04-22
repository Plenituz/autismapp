import React, { Component } from 'react';
import StudentsGallery from './StudentsGallery';

const students = ["Joe", "Alice", "Fred", "Christina", "Joe", "Alex"]
const teacher = ["Mr. Joe"]

export default class EducationDashboard extends Component {
  
  


  render() {
    return (
      <div className="educational-dashboard" >
        <h1 class="title is-3 welcome">Welcome {teacher}</h1>
     		<StudentsGallery students={students} />
      </div>
    );
  }
}
