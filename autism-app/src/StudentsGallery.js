import React, { Component } from 'react';
import StudentCard from './StudentCard';
import StudentPage from './StudentPage';

export default class StudentsGallery extends Component {
  constructor(props){
    super(props);
  }


	renderStudentGallery = () => {
		return this.props.students.map((item)=> {return (
				  <StudentCard
							name={item}
							pickStudent={this.props.pickStudent}
					/>)
				})
	}


  render() {
    return (
    	<div>
        <h1 class="title is-3 welcome">Welcome {this.props.teacher}</h1>
	      <div className="students-gallery" >
	      	{this.renderStudentGallery()}
	      </div>
      </div>
    );
  }
}
