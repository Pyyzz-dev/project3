import React, { Component } from "react";
import axios from "axios";
import './Login.css';
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  handleSubmit(event) {
    const { username, password } = this.state;
    // console.log("Submited");
    // console.log("Username:" + username);
    // console.log("Password:" + password);
    axios.post(
      "http://localhost:2020/auth/local", {
      identifier: username,
      password: password
    }).then(data => {
      console.log(data);
      //if response have jwt => login success
      if (data.data.jwt) {
        console.log("You are logined");
        this.setCookie("token",data.data.user.id,0.5);
        //move to home page
        // console.log(data.data);
        window.location.href = "/Home/"+ this.getCookie("token");
        
      } else console.log("You are not logined");
    }).catch(error => {
      console.log("login error", error.data.data.message[0]);
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
          <span className="register_text">Don't have account?</span><Link to="/register">Register</Link>
        </form>
      </div>
    );
  }
}
