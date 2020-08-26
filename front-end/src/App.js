import React, {Component} from 'react';
import Login from "./Component/Authenticator/Login";
import Register from "./Component/Authenticator/Registration";
import Content from "./Component/Content/Content";
import Post from "./Component/Post/Post";
import Home from "./Component/Home/Home";
import Profile from "./Component/Profile/Profile";
import Category from "./Component/Category/Category";
import DetailComment from './Component/DetailComment/DetailComment';

// import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {

  

  render(){
    return(

      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/Home/:id" component={Home}/>
            <Route path="/Content" component={Content}/>
            
            <Route path="/Profile/:id" component={Profile}/>
            <Route path="/Post/:id" component={Post}/>
            <Route path="/Category/:id" component={Category}/>
            <Route path="/DetailComment/:id" component={DetailComment}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>   
      </Router>
    )
  }
}

export default App;
