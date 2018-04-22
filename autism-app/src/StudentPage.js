import React, { Component } from 'react';
var BarChart = require("react-chartjs").Bar;
var RadarChart = require("react-chartjs").Radar;


var barData = {
	labels: ["January", "February", "March", "April", "May", "June"],
	datasets: [
		{
			label: "My First dataset",
			fillColor: ['rgba(255, 99, 132, 0.3)',
	                'rgba(54, 162, 235, 0.3)',
	                'rgba(255, 206, 86, 0.3)',
	                'rgba(75, 192, 192, 0.3)',
	                'rgba(153, 102, 255, 0.3)',
	                'rgba(255, 159, 64, 0.3)'],
			strokeColor: "rgba(220,220,220,0.8)",
			highlightFill: ['rgba(255, 99, 132, 0.4)',
	                'rgba(54, 162, 235, 0.4)',
	                'rgba(255, 206, 86, 0.4)',
	                'rgba(75, 192, 192, 0.4)',
	                'rgba(153, 102, 255, 0.4)',
	                'rgba(255, 159, 64, 0.4)'],
			highlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55]
		},
	]
};

var radarData = {
    labels: ['Social Skills', 'Language', 'Communication', 'Behavior'],
    datasets: [{
    		label: "student",
        fillColor: 'rgba(75, 192, 192, 0.4)',
        data: [50, 80, 20, 35],

    }]

}

export default class StudentPage extends Component {
  // this.props.student

  render() {
    return (
    	<div>
	      <div className="student-page">

		       <div id="student-header">
		       	 <div class="header-portrait">
	       		 	 <div className="student-card"> </div> 
		       	 </div>


		       	 <div class="header-info">
		       		 <h1 className="title">{this.props.student}</h1>
		       		 <h2 className="subtitle is-5 special-sub">Age: 8</h2>
		       		 <h2 className="subtitle is-5 special-sub">High Functioning</h2>
		       		 <h2 className="subtitle is-5 special-sub">Notes: Likes Trains</h2>
		       	 </div>

		         <RadarChart data={radarData} width="300" height="200" />

		       </div>

		       <div id="information-section">
			       <div id="graphs">
				      <BarChart  data={barData}  width="600" height="250" />
				      <div id="areas-of-improvement">
				      	<h1 className="title is-5">Areas of Improvement</h1>
				      	<br></br>
				       	<li>Emotion Recognition</li>
				       	<li>Social Understanding</li>
				       	<li>Communication</li>
				       </div>
			       </div>

		       </div>	
	       </div>
      </div>

    );
  }
}
