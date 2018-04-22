import React, { Component } from 'react';
import HomePage from './HomePage';
import LearningApp from './LearningApp';
import Dashboard from './Dashboard';
import EducationDashboard from './EducationDashboard';
import Register from './Register';
import LogIn from './LogIn';
import NavigationBar from './NavigationBar';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import 'bulma/css/bulma.css'

import './App.css';


function PrivateRoute ({component: Component, loggedIn, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => loggedIn === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}} } />}
    />
  )
}

function PublicRoute ({component: Component, loggedIn, logIn, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => loggedIn === false
        ? <Component {...props} logIn={logIn} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {
   constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      user: null,
    };
  }

  logIn = (user) => {
    this.setState({ loggedIn: true, user: user});
  }
  logOut = () => {
    this.setState({ loggedIn: false });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.loggedIn === false && (prevState.loggedIn !== this.state.loggedIn)){
      this.setState({ redirect: true });
    }
  }

           // <Route path="/Register" render={()=><Register />} />
           //   <Route path="/LogIn" render={()=><LogIn logIn={this.logIn} loggedIn={this.state.loggedIn} /> } />

   render() {
    return (
        <Router>
          <div className="App">
             <NavigationBar loggedIn={this.state.loggedIn} logOut={this.logOut} />
             <Route exact path="/" render={()=><HomePage />} />
             <PrivateRoute loggedIn={this.state.loggedIn} path="/LearningApp" component={LearningApp} />
             <PrivateRoute loggedIn={this.state.loggedIn} path="/EducationDashboard" component={EducationDashboard} />
             <PrivateRoute loggedIn={this.state.loggedIn} path="/Dashboard" component={Dashboard} />
             <PublicRoute loggedIn={this.state.loggedIn} logIn={this.logIn} path="/Register" component={Register} />
             <PublicRoute loggedIn={this.state.loggedIn} logIn={this.logIn} path="/LogIn" component={LogIn} />
          </div>
        </Router>

    )
  }
}

export default App;
