import React, {Component} from 'react';
import { Carousel } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import "./Content.css";
import Paging from "../paging/pagingnation";
import {
  Link,
} from "react-router-dom";
// import Detail from '../Detail/Detail';
export default class Content extends Component {

  

  constructor(props){
    super(props);
    this.state = {
      data : [],
      displayNone: "none",
    }
  }
  componentDidMount(){
    let that = this; 
    axios({
      method: "GET",
      url:"http://localhost:2020/posts"
    }).then(function(data){
      that.setState({data: data.data})
    })
  }

  clickSwitch = () =>{
    var fullpage = document.getElementById("fullpage");
    var switchpage = document.getElementById("switch");
    if(fullpage.classList.contains("night")){
      fullpage.classList.remove("night");
      switchpage.classList.remove("switched");
    }else{
      fullpage.classList.add("night");
      switchpage.classList.add("switched");
    }
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

  render(){
    
    return(
      <div>
        <Paging api ={"http://localhost:2020" + "/infinity-load?"} idUser = {this.props.idUser} />
      </div>
      
    )
  }
}
