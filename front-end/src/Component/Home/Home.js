import React, { Component } from 'react';
import Content from "../Content/Content";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import axios from 'axios';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchData: []
    }
    this.getDataFromChildren = this.getDataFromChildren.bind(this)

  }
  
componentDidMount(){
  console.log("Search Data Default:" +this.state.searchData);
  let that = this;
  axios.get("http://localhost:2020/search?key="
  ).then(data =>{
    console.log("Search Data Default:" + data.data);
    that.setState({searchData:data.data});
  }).catch(err =>{
    console.log("Set Data Defaul Error");
    console.log(err);
  })
}

  getDataFromChildren(data){
    this.setState({searchData:data});
  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
  render() {
    var idUser = this.getCookie("token");
    {console.log(this.state.searchData, "serac")}
    return (
      <div>
        <Header  getDataFromChildren={this.getDataFromChildren}/>
        <Content  searchData={this.state.searchData}/>
        <Footer />
      </div>
    )
  }
}