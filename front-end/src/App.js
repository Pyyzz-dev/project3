import React, {Component} from 'react';
import Login from "./Component/Authenticator/Login";
import Register from "./Component/Authenticator/Registration";
import './CSS/App.css';

class App extends Component {
  render(){
    return(
      <div>
 <Login/>
      <Register/>
      </div>
     
    )
  }
}

export default App;
