import React, { Component } from 'react';
import axios from 'axios';
import "../Content/Content.css";
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import {
    Link
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

    getPosts = page => {
        var api = `${this.props.api}page=${this.state.page}&limit=3`
        this.setState({ loading: true });
        axios.get(
            api
        ).then(res => {
            console.log(res.data.data);
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
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
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

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        setTimeout(() => {
            if (this.state.canLoad && this.state.prevY > y)
                this.getPosts(this.state.page);
            this.setState({ prevY: y });
        }, 500);
    }
    render() {

        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        const imgCSS = {
            display: "block",
            width: "100%"
        }
        const loadingTextCSS = { display: this.state.canLoad ? "block" : "none" };
        const endingCSS = { display: this.state.canLoad ? "none" : "block" };

        
            const contentStyle = {
                textAlign: 'center',
                height:"245px",
                background: "radial-gradient(circle, rgba(0,0,0,0.30575980392156865) 0%, rgba(0,0,0,0.30575980392156865) 100%, rgba(255,255,255,1) 100%, rgba(255,0,9,1) 100%, rgba(254,4,4,1) 100%)"
              };
              var data = this.state.posts.length ? this.state.posts.map((value,index)=>
                (
                  <div className="container px-3 py-3 post d-flex" id="post">
                    <div className="post-avatar">
                      <img src={value.Image.url} style={{height:"100%", width:"100%"}}/>
                    </div>
                    <div className="post-body px-3 d-block">
                      <div className="post-title" id="post-title">
                        <h5 style={{fontFamily: "Helvetica, sans-serif"}}><Link to={"/Detail/"+ value._id}>{value.Title}</Link></h5>
                      </div>
                      <div className="post-content">
                        <h7 className="font-italic font-weight-bold">{value.Content}</h7>
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
                  <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS} >Loading...</span>
                    <span style={endingCSS}>Hết bài rồi bạn ơi!</span>
                </div>
                </div>
            // <div className="post-container">
            //     <div>
            //         {this.state.posts.map((post, i) => (
            //             <div className='m-post' key={i}>
            //                 <Link to={`/posts-detail/${post._id}`}>
            //                     <div>
            //                         <div>
            //                             {post.image ? <Image src={"http://localhost:2020" + post.image.url} fluid></Image> : 'khong co'}
            //                         </div>
            //                         <div>
            //                             <h4 className="m-post__title font-weight-bold my-2">{post.title}</h4>
            //                             <div >{post.description}</div>
            //                             <div style={{ color: "red", fontSize: ".8rem" }}>
            //                                 <span>{moment(post.updatedAt).format('LLLL')}</span>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </Link>
            //             </div>
            //         ))}
            //     </div>
                // <div
                //     ref={loadingRef => (this.loadingRef = loadingRef)}
                //     style={loadingCSS}
                // >
                //     <span style={loadingTextCSS} >Loading...</span>
                //     <span style={endingCSS}>Hết bài rồi bạn ơi!</span>
                // </div>
            // </div>
        );
    }
}
export default withRouter(Paging)