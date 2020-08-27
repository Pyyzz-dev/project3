import React, { Component } from "react";
import axios from "axios";
import './Login.css';
import { Link } from "react-router-dom";
export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password, username, password_confirmation } = this.state;
    console.log(username + " - " + email + " - " + password);
    axios.post(
      "http://localhost:1337/auth/local/register",
      {
        username: username,
        email: email,
        password: password
      }).then(response => {
    
        //if response have jwt => login success
        if (response.data.jwt) {
          console.log("You are register");
          this.setCookie("token", response.data.jwt, 0.5);
          //move to home page
          window.location.href = "/";
        } 
      }).catch(error =>{
        alert("Error occurred"+ error.response.data.message[0].messages[0].message);
      })
    event.preventDefault();
  }

  render() {
    return (
      <div className="login_form">
        <div className="logo"></div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
          </label><br />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <label>
            Email:
          </label><br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <label>
            Password:
          </label><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <label>
            Re-Password:
          </label><br />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br />
          <button type="submit" className="btnLogin">Register</button>
          <span className="register_text">Already have account?</span><Link to="/login">Login</Link>
        </form>
      </div>
    );
  }
}
