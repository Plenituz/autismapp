import React, { Component } from 'react';

export default class HomePage extends Component {

   render() {
    return (
          <div className="homepage">
              <section class="hero is-medium">
							  <div class="hero-body hero-container">
							      <div class="container has-text-centered">
							        <div class="column is-6 is-offset-3">
							          <h1 class="title hero-title">
							          	Autism App Name
							          </h1>
							          <h2 class="subtitle hero-sub">
							            A learning platform for Autism.
							          </h2>
							          <div id="hero-buttons">
							          	<button class="button is-warning is-medium" id="teachers-button">Teachers</button>
							          	<button class="button is-success is-medium" id="students-button">Students</button>
							          </div>
							        </div>
							      </div>
							    </div>
             	</section>

             	<section>
						     <div class="columns features cards-section">
						      <div class="column is-4">
						        <div class="card is-shady">
						          <div class="card-image has-text-centered">
						              <i class="fa fa-pencil"></i>
						          </div>
						          <div class="card-content">
						            <div class="content">
						              <h4>Learning Platform</h4>
						              <p>Our gamified learning platform is based on PECS (Picture Exchange Communication System) to provide a fun learning system. </p>
						              <p><a href="#">Learn more</a></p>
						            </div>
						          </div>
						        </div>
						      </div>
						      <div class="column is-4">
						        <div class="card is-shady">
						          <div class="card-image has-text-centered">
						              <i class="fa fa-graduation-cap"></i>
						          </div>
						          <div class="card-content">
						            <div class="content">
						              <h4>Educator Platform</h4>
						              <p>Autism App provides tools for educators by providing insights into each individual child's learning needs.</p>
						              <p><a href="#">Learn more</a></p>
						            </div>
						          </div>
						        </div>
						      </div>
						      <div class="column is-4">
						        <div class="card is-shady">
						          <div class="card-image has-text-centered">
						              <i class="fa fa-puzzle-piece"></i>
						          </div>
						          <div class="card-content">
						            <div class="content">
						              <h4>Track Progress</h4>
						              <p>Keep of track of your child's progress as they learn and earn achievements through the learning platform.</p>
						              <p><a href="#">Learn more</a></p>
						            </div>
						          </div>
						        </div>
						      </div>
						    </div>
             	</section>

          </div>
    )
  }
}

