import React, { Component } from 'react';
import StudentCard from './StudentCard';
import StudentPage from './StudentPage';

export default class StudentsGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentStudent: null,
    };
  }


	renderStudentGallery = () => {



		return this.state.currentStudent != null
			? <StudentPage student={this.state.currentStudent}/>
		  : this.props.students.map((item)=> {return (
				  <StudentCard
							name={item}
							pickStudent={this.pickStudent}
					/>)
				})
	}
	
	pickStudent = (id) => {
		this.setState({ currentStudent: id });
	}

  render() {
    return (
      <div className="students-gallery" >
      	{this.renderStudentGallery()}
      </div>
    );
  }
}
