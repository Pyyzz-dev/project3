import React, {Component} from 'react';
import { Carousel } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import "./Category.css";
// import Header from "../Header/header";
import {
  Link,
} from "react-router-dom";
import Footer from '../Footer/footer';

export default class Category extends Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
            dataUser:[],
            dataCategory:[],
            token:[]
        }
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
    componentDidMount(){
        let that = this; 
        var profile = document.getElementById("fix");
        var id = this.props.match.params.id;
        var idUser = this.getCookie("token");
        if(idUser){
          profile.style.display="block";
          this.setState({token: idUser});
        }else{
          profile.style.display="none";
        }
        axios({
          method: "GET",
          url:"http://localhost:2020/categories?id="+id
        }).then(function(data){
          that.setState({data: data.data[0].posts});
        })
        axios({
          method:"GET",
          url:"http://localhost:2020/categories"
        }).then(function(data){
          that.setState({dataCategory: data.data})
        })
        axios({
          method: "GET",
          url: "http://localhost:2020/users?id=" + idUser,
        }).then(function (data) {
          that.setState({ dataUser: data.data});
        });
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
      refresh() {
        window.location.reload();
      }
      render(){
        const contentStyle = {
            textAlign: 'center',
            height:"245px",
            background: "radial-gradient(circle, rgba(0,0,0,0.30575980392156865) 0%, rgba(0,0,0,0.30575980392156865) 100%, rgba(255,255,255,1) 100%, rgba(255,0,9,1) 100%, rgba(254,4,4,1) 100%)"
          };
        var data = this.state.data.length ? this.state.data.map((value,index)=>
        (
          <div className="container px-3 py-3 post d-flex" id="post">
            <div className="post-avatar">
              <img src={value.Image.url} style={{height:"100%", width:"100%"}}/>
            </div>
            <div className="post-body px-3 d-block">
              <div className="post-title" id="post-title">
                <h5 style={{fontFamily: "Helvetica, sans-serif"}}><Link to={"/Post/"+ value._id}>{value.Title}</Link></h5>
              </div>
              <div className="post-content">
                <h7 className="font-italic font-weight-bold">{value.Content}</h7>
              </div>
              <div className="post-upload-date px-1 d-flex justify-content-around" id="post-upload-date">
                <div>
                  <p className="">Đã đăng vào {value.Upload_date}</p>
                </div>
                <div>
                  <p>Lượt like {value.Like}</p>
                </div>
              </div>
            </div>
          </div>
        )
      ) : <p>Không có dữ liệu</p>
      var data1 = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <option value={value.Name}/>
      )
    ) : <p>Không có dữ liệu</p>
    var avatarUser = this.state.dataUser.length ? this.state.dataUser.map((value,index)=>
      (
        <img onClick={this.clickProfile} style={{height:"100%", width:"100%", borderRadius:"40px"}} src={value.avatar.url} alt />
      )
    ) : <p>Không có dữ liệu</p>
    var nameUser = this.state.dataUser.length ? this.state.dataUser.map((value,index)=>
      (
        <p>{value.username}</p>
      )
    ) : <p>Không có dữ liệu</p>
    var dataCategory = this.state.dataCategory.length ? this.state.dataCategory.map((value,index)=>
      (
        <div className="content-mainPage h-100" onClick={this.refresh}>
          <Link to={"/Category/"+value._id} style={{textDecoration:"none", fontSize:"20px", fontFamily: "'Dancing Script', cursive", color:"white"}}>{value.Name}</Link>
        </div>
      )
    ) : <p>Không có dữ liệu</p>
          return(
              <div>
                  <div className="projectPyyzz">
                    <div className="header-projectPyyzz px-0">
                      <div className="container-fluid h-100 w-100 px-0">
                        <div className="container headerPart1 px-0 d-flex align-items-center">
                          <div className="header-iconMain d-flex">
                            <div className="header-iconMain-icon w-25 h-100 d-flex align-items-center">
                              <div className="logoOfP d-flex align-items-center">
                                <div className="logo-projectPyyzz" id="logo-projectPyyzz">
                                  {avatarUser}
                                </div>
                                <div className="text d-flex align-items-center px-2" id="text-projectPyyzz">
                                  <div className="d-flex align-items-center" style={{fontFamily: "'Dancing Script', cursive", fontSize:"27px", color:"white"}}>{nameUser}</div>
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
                            <div className="header-iconMain-information w-25 h-100 d-flex justify-content-end align-items-center">
                              <div className="header-information-sub w-75 h-75 d-flex align-items-center justify-content-end">
                                <button type="button" className="add general ml-2">
                                    <i style={{fontSize: "20px"}} className="fas fa-user-plus"></i>
                                </button>
                                <button type="button" className="notification general ml-2">
                                    <i style={{fontSize: "20px"}} className="far fa-bell"></i>
                                </button>
                                <button type="button" id="fix" className="fix general ml-2">
                                  <Link to={"/Profile/"+this.getCookie("token")} style={{color:"black"}}><i style={{fontSize: "20px"}} className="fas fa-user-shield"></i></Link>
                                </button>
                                <button type="button" className="account general ml-2">
                                  {
                                    this.state.token.length ? <Link to="/login" onClick={this.deleteCookie} style={{color:"black"}}><i style={{fontSize: "20px"}} className="fas fa-sign-in-alt"></i></Link>  : <Link to="/login" style={{color:"black"}}><i style={{fontSize: "20px"}} className="fas fa-sign-in-alt"></i></Link>
                                  }
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="container headerPart2 d-flex align-items-center px-0">
                          <div className="headerPart2-link w-100 h-50 d-flex">
                            <div className="content-mainPage h-100">
                              {
                                this.state.token.length  ? <Link to={"/Home/"+this.getCookie("token")} style={{textDecoration:"none", fontSize:"20px", fontFamily: "'Dancing Script', cursive", color:"white"}}>Trang chủ</Link>  : <Link to={"/"} style={{textDecoration:"none", fontSize:"20px", fontFamily: "'Dancing Script', cursive", color:"white"}}>Trang chủ</Link>
                              }
                            </div>
                            {dataCategory}
                            <div className="content-mainPage-Vip h-75 d-flex justify-content-center align-items-center"
                              style={{borderRadius:"20px"}}>
                              <div style={{textDecoration:"none", fontSize:"20px", fontFamily: "'Dancing Script', cursive", color:"white"}}>VIP</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="Content">
            <div className="container-fluid sub-Content px-0">
              <div className="container advertisement px-0 d-flex align-items-center">
                <div className="sub-advertisement">
                  <Carousel effect="fade">
                    <div className="carousel1">
                      <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
                    </div>
                    <div className="carousel2">
                      <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
                    </div>
                    <div className="carousel3">
                      <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
                    </div>
                    <div className="carousel4">
                      <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
                    </div>
                  </Carousel>
                </div>
              </div>
              <div className="content">
                <div className="container sub-content d-flex px-0 pt-3">
                  <div className="col-8 pt-3">
                      <div className="content-effect">
                        <div id="fullpage">  
                          <div class="section">
                            <div class="time-circle">
                                  <div class="sun"></div>
                                  <div class="moon">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                  </div>
                                  <div class="stars">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                  </div>
                                  <div class="water"></div>
                            </div>
                              <div id="switch" onClick={this.clickSwitch}>
                                <div id="circle">
                            
                                </div>
                              </div>
                              {data}
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-4 fixed pt-3">
                    <div className="image-fixed">
    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
              </div>
            
          )
      }
}