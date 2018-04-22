import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import achievement1 from './assets/achievement1.jpg'
import achievement2 from './assets/achievement2.jpg'


export default class Dashboard extends Component {
  
  render() {
    return (
      <div className="dashboard" >
        <div className="tile is-ancestor">
          <div className="tile is-8 is-parent">
              <div className="tile is-child box">
                <div className="categories">
                  <h1 class="title category-pick">Pick a Category</h1>
                    <div>
                      <Link className="button is-link category-button is-medium" to="/LearningApp">Emotions</Link>
                      <Link className="button is-success category-button is-medium" to="/Language">Language</Link>
                    </div>
                </div>
              </div>
          </div>
          <div className="tile is-parent is-vertical">
            <div className="tile is-child box">
              <h1 class="title is-4">Welcome, #USERNAME</h1>
            </div>
            <div className="tile is-child box">
              <h1 class="title is-4">Achievements: </h1>
              <img class="achievement" src={achievement1}></img>
              <img class="achievement" src={achievement2}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
