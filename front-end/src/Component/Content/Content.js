import React, {Component} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import "./Content.css";
import Paging from "../paging/pagingnation";
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
        <Paging api ={"http://localhost:2020" + "/infinity-load"} idUser = {this.props.idUser} />
      </div>
      // <div className="Content">
      //   <div className="container-fluid sub-Content px-0">
      //     <div className="container advertisement px-0 d-flex align-items-center">
      //       <div className="sub-advertisement">
      //         <Carousel effect="fade">
      //           <div className="carousel1">
      //             <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
      //           </div>
      //           <div className="carousel2">
      //             <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
      //           </div>
      //           <div className="carousel3">
      //             <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
      //           </div>
      //           <div className="carousel4">
      //             <div style={contentStyle}><h1 style={{color:"white"}}>𝓦𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓸 𝓸𝓾𝓻 𝓹𝓻𝓸𝓳𝓮𝓬𝓽</h1></div>
      //           </div>
      //         </Carousel>
      //       </div>
      //     </div>
      //     <div className="content">
      //       <div className="container sub-content d-flex px-0 pt-3">
      //         <div className="col-8 pt-3">
      //             <div className="content-effect">
      //               <div id="fullpage">  
      //                 <div class="section">
      //                   <div class="time-circle">
      //                         <div class="sun"></div>
      //                         <div class="moon">
      //                               <div></div>
      //                               <div></div>
      //                               <div></div>
      //                         </div>
      //                         <div class="stars">
      //                               <div></div>
      //                               <div></div>
      //                               <div></div>
      //                               <div></div>
      //                               <div></div>
      //                               <div></div>
      //                               <div></div>
      //                         </div>
      //                         <div class="water"></div>
      //                   </div>
      //                     <div id="switch" onClick={this.clickSwitch}>
      //                       <div id="circle">
                        
      //                       </div>
      //                     </div>
      //                     {data}
      //                   </div>
      //                 </div>
      //             </div>
      //         </div>
      //         <div className="col-4 fixed pt-3">
      //           <div className="image-fixed">

      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }
}
