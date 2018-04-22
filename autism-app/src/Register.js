import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


export default class Register extends Component {

//this.props.type

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
                        <input class="input is-medium" type="email" placeholder="Your Email" ref="email"></input>
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
                      <input type="radio" name="answer"></input>
                       &nbsp;&nbsp;Student
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label class="radio">
                      <input type="radio" name="answer"></input>
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