import React, {Component} from 'react';
import Login from "./Component/Authenticator/Login";
import Register from "./Component/Authenticator/Registration";
import './CSS/App.css';
import Content from "./Component/Content/Content";
import Detail from "./Component/Detail/Detail";
import Home from "./Component/Home/Home";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render(){
    return(

      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/Content" component={Content}/>
            <Route path="/Detail/:id" component={Detail}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </div>   
      </Router>
    )
  }
}

export default App;
