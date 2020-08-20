import React, {Component} from 'react';

import Content from "./Component/Content/Content";
import Header from "./Component/Header/header";
import Footer from "./Component/Footer/footer"
import './App.css';

class App extends Component {
 render(){
   return(
     <div className="App">
      
      <Header/>
      
     
      <Content/>

      <Footer/>
     </div>
      
   )
 }
}

export default App;
