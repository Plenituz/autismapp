import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Cookie from './assets/cookie.jpg';
import axios from 'axios';

export default class LogIn extends Component {

//this.props.type

	handleLogin = (event) => {
		event.preventDefault();
		// this.props.logIn();
 		
		const data = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };

    axios.post(`http://localhost:3001/login`, data)
      .then(res => {
        console.log(res);
        this.props.logIn(res.data);
      })

	}

  render(){
  	return(
  	<section class="hero is-fullheight" id="login-hero">
 			<div class="hero-body">
 				<div class="container has-text-centered">
 					<div class="column is-4 is-offset-4">
 						<h3 class="title has-text-grey">Login</h3>
 						<p class="subitlte has-text-grey">Please login to proceed</p>
 						<div class="box" id="login-box">
 							<form onSubmit={this.handleLogin}>	

	              <div class="field">
	                <div class="control">
	                  <input class="input is-medium" type="username" placeholder="Username" ref="username"></input>
	                </div>
              	</div>

	             <div class="field">
	                <div class="control">
	                  <input class="input is-medium" type="password" placeholder="Your Password" ref="password"></input>
	                </div>
               </div>

               <button class="button is-block is-info is-medium is-fullwidth">Login</button>

               <p class="has-text-grey" id="login-footer">
               	 	<NavLink exact className="nav-link-login" activeClassName='active' to="/SignUp">Sign Up</NavLink> &nbsp; &nbsp; &nbsp; &nbsp;
               	 	<NavLink exact className="nav-link-login" activeClassName='active' to="/ForgotPassword">Forgot Password</NavLink>
               </p>

 							</form>
 						</div>
 					</div>
 				</div>
 			</div>
 		</section>
  	);
  }


}