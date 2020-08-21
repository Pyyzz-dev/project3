import React, { Component } from "react";
import "./header.css";
import axios from 'axios';
import {
  Link,
  Redirect 
} from "react-router-dom";

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state={
        data:[],
    }
}

refresh() {
  window.location.reload();
}
  componentDidMount(){
    let that = this;
    axios({
        method:"GET",
        url:"http://localhost:2020/categories"
      }).then(function(data){
        that.setState({data: data.data})
      })
  }
  render() {
    var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <div className="content-mainPage h-100" onClick={this.refresh}>
          <Link to={"/Category/"+value._id} style={{color:"white", textDecoration:"none", fontSize:"20px", fontFamily:"'Dancing Script', cursive;"}}>{value.Name}</Link>
        </div>
      )
    ) : <p>Không có dữ liệu</p>
    var data1 = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <option value={value.Name}/>
      )
    ) : <p>Không có dữ liệu</p>
    return (
      <div className="projectPyyzz">
        <div className="header-projectPyyzz px-0">
            <div className="container-fluid h-100 w-100 px-0">
                <div className="container headerPart1 px-0 d-flex align-items-center">
                    <div className="header-iconMain d-flex">
                        <div className="header-iconMain-icon w-25 h-100 d-flex align-items-center">
                            <div className="logoOfP d-flex align-items-center">
                                <div className="logo">

                                </div>
                                <div className="text d-flex align-items-center px-2">
                                    <h4 style={{fontFamily: "'Dancing Script', cursive", color:"white"}}>N.D.Phong</h4>
                                </div>
                                <div className="sprite-sheet d-flex justify-content-center px-0">

                                </div>
                            </div>
                        </div>
                        <div className="header-iconMain-content w-50 h-100 d-flex align-items-center">
                            <div className="header-search w-100 h-50 d-flex justify-content-center">
                                <div className="header-search-sub d-flex align-items-center">
                                    <div className="iconSearch d-flex align-items-center" onClick={this.refresh} style={{cursor: "pointer"}}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <div className="inputSearch d-flex align-items-center">
                                        <input list="browsers" name="browser" id="browser"
                                          style={{border:"0px", width:"100%", height:"100%"}} aria-autocomplete="list"
                                            autocomplete="off" type="text"
                                            placeholder="Nhập tên bài hát, ca sĩ hoặc mv... "/>
                                        <datalist className="optionsSearch" id="browsers">
                                          <option value="All"/>
                                          {data1}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="header-iconMain-information w-25 h-100 d-flex justify-content-end align-items-center">
                            <div className="header-information-sub w-75 h-75 d-flex align-items-center justify-content-end">
                                <button type="button" className="add general ml-2">
                                    <i style={{fontSize: "20px"}} className="fas fa-user-plus"></i>
                                </button>
                                <button type="button" className="notification general ml-2">
                                    <i style={{fontSize: "20px"}} className="far fa-bell"></i>
                                </button>
                                <button type="button" className="fix general ml-2">
                                    <i style={{fontSize: "20px"}} className="fas fa-wrench"></i>
                                </button>
                                <button type="button" className="account general ml-2">
                                    <i style={{fontSize: "20px"}} className="fas fa-sign-in-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container headerPart2 d-flex align-items-center px-0">
                    <div className="headerPart2-link w-100 h-50 d-flex">
                        <div className="content-mainPage h-100">
                          <Link to={"/"} style={{color:"white", textDecoration:"none", fontSize:"20px", fontFamily:"'Dancing Script', cursive;"}}>Trang chủ</Link>
                        </div>
                        {data}
                        <div className="content-mainPage-Vip h-75 d-flex justify-content-center align-items-center"
                           style={{borderRadius:"20px"}}>
                            <div
                                style={{color:"rgb(86, 120, 224)", textDecoration:"none", fontSize:"20px", fontFamily:"'Dancing Script', cursive;"}}>VIP</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
 
    );
  }
}
