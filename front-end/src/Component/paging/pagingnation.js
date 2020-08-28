import React, { Component } from 'react';
import axios from 'axios';
import "../Content/Content.css";
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import {
    Link,
} from "react-router-dom";
import { withRouter } from "react-router";
class Paging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            posts: [],
            canLoad: true,
            page: 0,
            prevY: 0
        };
    }
    getPosts = page => {
        var api = `${this.props.api}page=${this.state.page}&limit=2`
        this.setState({ loading: true });
        axios.get(
            api
        ).then(res => {
            this.setState({ posts: [...this.state.posts, ...res.data.data] });
            this.setState({ page: res.data.nextPage });
            this.setState({ canLoad: res.data.canLoad });
        });
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

   

    componentDidMount() {
      let that = this; 
      axios({
        method: "GET",
        url:"http://localhost:2020/posts"
      }).then(function(data){
        that.setState({data: data.data})
      })
        this.getPosts(this.state.page);
        var option = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            option
        );
        this.observer.observe(this.loadingRef);
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
    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        setTimeout(() => {
            if (this.state.canLoad && this.state.prevY > y)
                this.getPosts(this.state.page);
            this.setState({ prevY: y });
        }, 100);
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
    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        // const imgCSS = {
        //     display: "block",
        //     width: "100%"
        // }
        const loadingTextCSS = { display: this.state.canLoad ? "block" : "none" };
        const endingCSS = { display: this.state.canLoad ? "none" : "block" };

              const contentStyle = {
                textAlign: 'center',
                height:"245px",
                background: "radial-gradient(circle, rgba(0,0,0,0.30575980392156865) 0%, rgba(0,0,0,0.30575980392156865) 100%, rgba(255,255,255,1) 100%, rgba(255,0,9,1) 100%, rgba(254,4,4,1) 100%)"
              };
              var data = this.state.posts.length ? this.state.posts.map((value,index)=>
                (
                  <div key={index} className="container px-3 py-3 post d-flex" id="post">
                    <div className="post-avatar">
                      <img src={value.Image.url} style={{height:"100%", width:"100%"}} alt="Không load được ảnh"/>
                    </div>
                    <div className="post-body px-3 d-block">
                      <div className="post-title d-flex justify-content-start" id="post-title">
                        <h5 style={{fontFamily: "Helvetica, sans-serif"}}><Link to={"/Post/"+ value._id}>{value.Title}</Link></h5>
                      </div>
                      <div className="post-content d-flex justify-content-start">
                        <p style={{fontSize:"15px"}} className="font-italic font-weight-bold">{value.Content}</p>
                      </div>
                      <div className="post-upload-date px-1 d-flex justify-content-around" id="post-upload-date">
                        <div>
                          <p className="">Đã đăng vào {value.Upload_date}</p>
                        </div>
                        <div>
                          <p>Lượt like {this.getCookie("like")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : <p>Không có dữ liệu</p>
              return(
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
                                <div className="section">
                                  <div className="time-circle">
                                        <div className="sun"></div>
                                        <div className="moon">
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                        </div>
                                        <div className="stars">
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                              <div></div>
                                        </div>
                                        <div className="water"></div>
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
                  <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
                    <div style={{fontSize: "30px", fontFamily: "'Dancing Script', cursive", color:"black"}}><span style={loadingTextCSS}>Loading...</span></div>
                    <div style={{fontSize: "30px", fontFamily: "'Dancing Script', cursive", color:"black"}}><span style={endingCSS}>Hết bài rồi bạn ơi!</span></div>
                  </div>
                </div>

            
        );
    }
}
export default withRouter(Paging)