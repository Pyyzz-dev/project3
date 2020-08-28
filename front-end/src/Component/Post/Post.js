import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import axios from 'axios';
import "./Post.css";
import {
    Link,
  } from "react-router-dom";


export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            dataComment:[],
            inputCommet:[],
            countLike: this.getCookie("like")
        }
    }
    componentDidMount(){
        let that = this;
        var id = this.props.match.params.id;
        axios({
            method:"GET",
            url:process.env.DOMAIN +" posts/"+id+"/comment"
          }).then(function(data){
            that.setState({data: data.data.data, dataComment: data.data.data[0].comments})
            // console.log(data.data.data[0].comments[0].user.username);
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
    clickComment = () =>{
      var modal = document.getElementById("exampleModalScrollable");
      modal.style.display = "block";
      var close1 = document.getElementById("close1");
      var close2 = document.getElementById("close2");
      close1.onclick = function(){
        modal.style.display = "none"
      }
      close2.onclick = function(){
        modal.style.display = "none"
      }
    }
    handleOnChange = (e, editor) =>{
      console.log(editor.getData());
    }
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    clickLike = () =>{
      this.setCookie("like", this.state.countLike, 0.5)
      var countLike = parseInt(this.getCookie("like"));
      var like = document.getElementById("like");
      if(like.textContent === "Like"){
        like.textContent = "Liked"
        this.setState({countLike: countLike - 1});
        this.setCookie("like", this.state.countLike, 0.5);
      }else{
        like.textContent = "Like"
        this.setState({countLike: countLike + 1});
        this.setCookie("like", this.state.countLike, 0.5);
      }
    }
    handleChange = event => {
      this.setState({ name: event.target.value });
    }
    handleSubmit = event => {
      event.preventDefault();
      var modal = document.getElementById("exampleModalScrollable");
      var inputComment = document.getElementById("modal-comment").value;
      var idUser = this.getCookie("token");
      var idPost = this.props.match.params.id;
      axios({
        method:"POST",
        url:process.env.DOMAIN +" "+idPost+"/comment",
        data: {
          Content: inputComment,
          user: idUser
        }
      }).then(data=>{
        if(data){
          modal.style.display = "none";
          window.location.reload();
        }
      })
    }

    render(){
      const contentStyle = {
        textAlign: 'center',
        height:"245px",
        background: "radial-gradient(circle, rgba(0,0,0,0.30575980392156865) 0%, rgba(0,0,0,0.30575980392156865) 100%, rgba(255,255,255,1) 100%, rgba(255,0,9,1) 100%, rgba(254,4,4,1) 100%)"
      };
        var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <div key={index} className="detail-Post-content d-block px-5">
          <div className="detail-Post-title d-block">
            <div className="d-flex justify-content-start">
              <p style={{fontSize:"35px", fontFamily:"Andale Mono, monospace"}} className="font-weight-bold">{value.Title}</p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="">Đã đăng vào {value.Upload_date}</p>
            </div>
            <div className="d-flex justify-content-start px-3">
              <div className="px-3">
                <button className="facebook icon px-3" style={{color:"white"}}><i className="fab fa-facebook-f"></i> Facebook</button>
              </div>
              <div className="px-3">
                <button className="like icon px-3" onClick={this.clickLike} id="like" style={{color:"white"}}> Like </button>
              </div>
              <div className="px-3">
                <div className="like icon px-3" style={{color:"white"}}><i className="far fa-thumbs-up"></i> {parseInt(this.getCookie("like"))} lượt Like </div>
              </div>
            </div>
            
          </div>
          <div className="detail-Post-subcontent d-flex pt-3">  
            <div className="clickcomment d-block px-3">
              <div className="py-3" id="comment-user">
                <div className="like icon px-3" onClick={this.clickComment} style={{color:"white", cursor:"pointer"}}><i className="fas fa-comments"></i> Comment</div>
              </div>
              <div className="py-3">
                <div className="like icon px-3" style={{color:"white", cursor:"pointer"}}><i className="fas fa-backward"></i>
                {
                  this.getCookie("token")? <Link to={"/Home/"+this.getCookie("token")} style={{color:"white"}}> Back to Home</Link> : <Link to="/" style={{color:"white"}}> Back to Home</Link>
                }
                </div>
              </div>
            </div>
            <div className="px-3">
              <div>{value.Content}</div>
            </div>
          </div>
          <div>

          </div>
          
        </div>
           
      )
    ) : <p>Không có dữ liệu</p>
    // var dataUserAvatar = this.state.dataComment.length ? this.state.dataComment.map((value,index)=>
    //   (
        
    //   )
    // ) : <p>Không có dữ liệu</p>
    // var dataUserInfo = this.state.dataComment.length ? this.state.dataComment.map((value,index)=>
    // (
    //   <div key={index} className="info-user-comment px-1" style={{fontFamily: "'Dancing Script', cursive", color:"#4167b2", fontSize:"25px"}}>
    //     {value.user.username}
    //   </div>
    // )
    // ) : <p>Không có dữ liệu</p>

    var dataComment = this.state.dataComment.length ? this.state.dataComment.map((value,index)=>
      (
        <div key={index} className="title-comment px-0">
          <div className="title-comment-sub" id="fullpage">
              <div className="section title-and-content-comment d-flex">
                  <div className="col-2 h-100 avatar-author-comment px-0 d-flex justify-content-center">
                    <div key={index} className="avatar-user-comment">
                      <img src={value.user.avatar.url} style={{height:"100%", width:"100%", borderRadius:"35px"}} alt="Không load được ảnh"/>
                    </div>
                  </div>
                  <div className="col-10 content-post-comment px-0 d-block" style={{color:"white"}}>
                      <div className="px-5 py-1">
                        <div className="d-flex">
                          <div key={index} className="info-user-comment px-1" style={{fontFamily: "'Dancing Script', cursive", color:"#4167b2", fontSize:"25px"}}>
                            {value.user.username}
                          </div>
                          <div className="px-5 d-flex align-items-center" style={{fontSize:"12px"}}>
                            Update at: {value.Upload_date}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-start px-5">
                        {/* <ReactMarkdown source={value.Content}/> */}
                        {value.Content}
                      </div>
                      <div>

                      </div>
                  </div>
                </div>
              </div>
            </div>
      )
    ) : <p>Không có dữ liệu</p>
    
        return(
          <div className="Content">
            {/* {dataUserComment} */}
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
                            <div className="space" style={{height:"30px", backgroundColor:"white"}}>

                            </div>
                            <div className="comments d-block px-5">
                              <div className="count-comments" style={{height:"30px"}}>
                                <div className="count-comments-sub h-100">
                                    <p>Đã có {this.state.dataComment.length} bình luận</p>
                                  </div>
                              </div>
                              {dataComment}
                            </div>
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
          
          <div className="modal" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalCenteredLabel">Comment</h5>
                            <button type="button" className="close" id="close1" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                          <div className="modal-body">
                            {/* <CKEditor
                              editor={ClassicEditor}
                              onChange={this.handleOnChange}
                            /> */}
                            <input id="modal-comment" style={{height:"50px", width:"100%"}} onChange={this.handleChange} className="px-5" type="text" placeholder="Mời nhập comment"/>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id="close2" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                          </div>
                        </form>
                        
                      </div>
                    </div>
                  </div>
      </div>
        )
    }
}