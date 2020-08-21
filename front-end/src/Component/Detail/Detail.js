import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import axios from 'axios';
import "./Detail.css";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    Link,
  } from "react-router-dom";


export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let that = this;
        var id = this.props.match.params.id;
        axios({
            method:"GET",
            url:"http://localhost:2020/posts?id="+id
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
    render(){
      const contentStyle = {
        textAlign: 'center',
        height:"245px",
        background: "radial-gradient(circle, rgba(0,0,0,0.30575980392156865) 0%, rgba(0,0,0,0.30575980392156865) 100%, rgba(255,255,255,1) 100%, rgba(255,0,9,1) 100%, rgba(254,4,4,1) 100%)"
      };
        var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <div className="detail-Post-content d-block px-5">
          <div className="detail-Post-title d-block">
            <div className="d-flex justify-content-start">
              <p style={{fontSize:"35px", fontFamily:"Andale Mono, monospace"}} className="font-weight-bold">{value.Title}</p>
            </div>
            <div className="d-flex justify-content-start">
              <p className="">Đã đăng vào {value.Upload_date}</p>
            </div>
            <div className="d-flex justify-content-start px-3">
              <div className="px-3">
                <div className="facebook icon px-3" style={{color:"white"}}><i className="fab fa-facebook-f"></i> Facebook</div>
              </div>
              <div className="px-3">
                <div className="like icon px-3" style={{color:"white"}}><i className="far fa-thumbs-up"></i> Like</div>
              </div>
            </div>
          </div>
          <div className="detail-Post-subcontent d-flex pt-3">  
            <div className="clickcomment d-block px-3">
              <div className="py-3">
                <div className="like icon px-3" onClick={this.clickComment} style={{color:"white", cursor:"pointer"}}><i className="fas fa-comments"></i> Comment</div>
              </div>
              <div className="py-3">
                <div className="like icon px-3" style={{color:"white", cursor:"pointer"}}><i class="fas fa-backward"></i><Link to="/" style={{color:"white"}}> Back to Home</Link></div>
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
              <div className="col-4 fixed pt-3">
                <div className="image-fixed">

                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="modal" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenteredLabel">Comment</h5>
                          <button type="button" className="close" id="close1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={this.handleOnChange}
                        />
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" id="close2" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
      </div>
        )
    }
}