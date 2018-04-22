import React, { Component } from 'react';


export default class StudentCard extends Component {
  
	handleClick = () => {
		this.props.pickStudent(this.props.name);
	}

  render() {
    return (
    	<div>
	      <div className="student-card" onClick={this.handleClick} >
	      </div>
	      {this.props.name}
      </div>
    );
  }
}
