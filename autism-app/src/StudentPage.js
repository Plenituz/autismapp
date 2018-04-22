import React, { Component } from 'react';


export default class StudentPage extends Component {
  // this.props.student

  render() {
    return (
    	<div>
	      <div className="student-page"  >
	      </div>
	       {this.props.student}
      </div>

    );
  }
}
