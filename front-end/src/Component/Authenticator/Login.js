import React, { Component } from "react";
import axios from "axios";
import '../../CSS/Login.css';
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
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
    axios
      .post(
        "http://localhost:3000/login",
        {
          user: {
            username: username,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div class="login_form">
        <div class="logo"></div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username: 
          </label><br/>
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
          </label><br/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <button type="submit" class="btnLogin">Login</button>
          <span class="register_text">Don't have account?</span><a href="https://google.com/">Register</a>
        </form>
      </div>
    );
  }
}
