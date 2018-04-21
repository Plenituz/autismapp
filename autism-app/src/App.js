import React, { Component } from 'react';
import HomePage from './HomePage';
import LearningApp from './LearningApp';
import Dashboard from './Dashboard';
import NavigationBar from './NavigationBar';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import 'bulma/css/bulma.css'

import './App.css';

class App extends Component {
   constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      user: {userid: "fred", progress: 0}
    };
  }


  


   render() {
    return (
        <Router>
          <div className="App">
             <NavigationBar />
             <Route exact path="/" render={()=><HomePage />} />
             <Route path="/Dashboard" render={()=><Dashboard />} />
             <Route path="/LearningApp" render={()=><LearningApp  />} />
          </div>
        </Router>

    )
  }
}

export default App;
