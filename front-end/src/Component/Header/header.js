import React, { Component } from "react";
import "./header.css";
import axios from 'axios';
import {
  Link,
} from "react-router-dom";

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state={
        data:[]
    }
}
  componentDidMount(){
    let that = this;
    axios({
        method:"GET",
        url:"http://localhost:2020/categories"
      }).then(function(data){
        that.setState({data: data.data})
        console.log(data.data);
      })
  }
  componentDidUpdate(){
    console.log(this.prevProps);
    // axios({
    //     method:"GET",
    //     url:"http://localhost:2020/categories?id="+id
    //   }).then(function(data){
    //     that.setState({data: data.data})
    //     console.log(data.data);
    //   })
  }
  render() {
    var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
      <Link to={"/Category/"+ value._id}>{value.Name}</Link>
      )
    ) : <p>Không có dữ liệu</p>
    return (
      <div className="header bg-dark">
        <div className="container header-menubar">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="navbar-brand">
              <div className="logo-header">

              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link ml-5 text-light dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Categories
                  </a>
                  <div className="dropdown">
                    <div className="dropdown-content">
                      {data}
                    </div>
                  </div>
                </li>
                
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </div> 
      </div>   
    );
  }
}
