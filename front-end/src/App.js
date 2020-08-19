import React, {Component} from 'react';
import Content from "./Component/Content/Content";
import Detail from "./Component/Detail/Detail";
import Home from "./Component/Home/Home";
import './App.css';
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
          </Switch>
        </div>   
      </Router>
    )
  }
}

export default App;
