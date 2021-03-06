import React, {Component} from 'react';
import { Carousel } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import "./Category.css";
import Header from "../Header/header";
import {
  Link,
} from "react-router-dom";
import Footer from '../Footer/footer';

export default class Category extends Component{
    constructor(props){
        super(props);
        this.state ={
            data:[],
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
        var id = this.props.match.params.id;
        axios({
          method: "GET",
          url:process.env.DOMAIN +"categories?id="+id
        }).then(function(data){
          that.setState({data: data.data[0].posts});
        })
      }
      getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
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
              <img src={value.Image.url} style={{height:"100%", width:"100%"}} alt="Không load được ảnh"/>
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
      var idUser = this.getCookie("token");
          return(
              <div>
                  <Header idUser = {idUser}/>
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
                  <div className="col-9 pt-3">
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
                  <div className="col-3 fixed pt-3">
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