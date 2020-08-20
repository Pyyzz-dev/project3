import React, { Component } from "react";
import axios from "axios";
import '../../CSS/Login.css';
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

   handleSubmit(event) {
    const { username, password } = this.state;
    console.log("Submited");
    console.log("Username:" + username);
    console.log("Password:" + password);
    axios.post(
        "http://localhost:1337/auth/local", {
        identifier: username,
        password: password
      }).then(response => {
        console.log(response);
        if (response.data.jwt) {
         console.log("You are logined");
         window.location.href="/content";
        }else console.log("You are not logined");
      }).catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="login_form">
        <div className="logo"></div>
        <form onSubmit={this.handleSubmit} >
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
          <button type="submit" className="btnLogin">Login</button>
          <span className="register_text">Don't have account?</span><a href="/register">Register</a>
        </form>
      </div>
    );
  }
}
