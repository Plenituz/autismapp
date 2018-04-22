import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

export default class Register extends Component {

//this.props.type

  signUp = (event) => {
    event.preventDefault();
    // this.refs.email, this.refs.password, this.refs.student.checked, this.refs.educator.checked

//POST 
// {
//     username
//     userType (0 for studen or 1 for teacher)
//     age
//     password
// }

  const type = this.refs.student.checked ? 0 : 1;
    const data = {
      username: this.refs.username.value,
      userType: type,
      age: 7,
      password: this.refs.password.value,
    };

    axios.post(`http://localhost:3001/register`, data)
      .then(res => {
        console.log(res);
        this.props.logIn(res.data);
      })

  }


  render(){
    return(

      <div>
        <section class="hero is-fullheight" id="login-hero">
          <div class="hero-body">
            <div class="container has-text-centered">
              <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey">Sign Up</h3>
                <div class="box" id="login-box">
                  <form onSubmit={this.signUp}> 

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
                   <div class="field">
                      <div class="control">
                        <input class="input is-medium" type="password" placeholder="Retype Password" ref="verifyPassword"></input>
                      </div>
                   </div>

                   <div class="control">
                    <label class="radio">
                      <input type="radio" name="answer" ref="student"></input>
                       &nbsp;&nbsp;Student
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label class="radio">
                      <input type="radio" name="answer" ref="educator"></input>
                      &nbsp;&nbsp;Educator
                    </label>
                  </div>

                   <button class="button is-block is-success is-medium is-fullwidth" >Signup</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }


}