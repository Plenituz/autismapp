import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Cookie from './assets/cookie.jpg';

export default class NavigationBar extends Component {

   render() {
   	return this.props.loggedIn === false ?


        <div className="navigation-bar">
        
        	<nav className="navbar is-info" role="navigation" aria-label="main navigation">
							<div className="navbar-brand">
						    <img class="cookie" src={Cookie}></img>
								<div className="navbar-item nav-brand">
									Kookie
								</div>
							</div>

							<div className="navbar-menu">
								<div className="navbar-end">

									<div class="navbar-item">
											<NavLink exact className="nav-link" activeClassName='active' to="/">
												Home
											</NavLink>
									</div>

									<div class="navbar-item">
											<div>
													<NavLink className="nav-link" activeClassName='active' to="/Login">
													  Login
													</NavLink>
													<NavLink id="nav-register-link" className="nav-link" activeClassName='active' to="/Register">
													  Register
													</NavLink>
												</div>
									</div>

								</div>
							</div>
					</nav>
        </div>
    :
        <div className="navigation-bar">
        
        	<nav className="navbar is-info" role="navigation" aria-label="main navigation">
							<div className="navbar-brand">
 								<img class="cookie" src={Cookie}></img>
								<div className="navbar-item nav-brand">
									Kookie
								</div>
							</div>

							<div className="navbar-menu">
								<div className="navbar-end">

									<div class="navbar-item">
											<NavLink exact className="nav-link" activeClassName='active' to="/">
												Home
											</NavLink>
									</div>

									<div class="navbar-item">
											<NavLink exact className="nav-link" activeClassName='active' to="/Dashboard">
												Dashboard
											</NavLink>
									</div>

									<div class="navbar-item">
											<div>
													<a id="logout" onClick={this.props.logOut}>Logout</a>
												</div>
									</div>

								</div>
							</div>
					</nav>
        </div>


  }

}

