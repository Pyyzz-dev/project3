import React, {Component} from 'react';
import { Carousel } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import "./Content.css";
import {
  Link,
} from "react-router-dom";
import Detail from '../Detail/Detail';
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
      console.log(that.state.data);
    })
  }
  // clickToShowInfo(id){
  //   axios({
  //     method:"GET",
  //     url:"http://localhost:2020/posts?id="+id
  //   }).then(function(data){
     
  //   })
  // }

  render(){
    const contentStyle = {
      color: '#fff',
      lineHeight: '230px',
      textAlign: 'center',
    };
    var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
          <tr>
            <th scope="row">{index+1}</th>
            <td><Link to={"/Detail/"+ value._id} id={"titlePost-"+value._id}>{value.Title}</Link></td>
          </tr>
      )
    ) : <p>Không có dữ liệu</p>
    return(
      <div className="Content">
        <div className="container-fluid sub-Content px-0">
          <div className="container advertisement px-0 d-flex align-items-center">
            <div className="sub-advertisement">
              <Carousel effect="fade">
                <div className="carousel">
                  <h3 style={contentStyle}>1</h3>
                </div>
                <div className="carousel">
                  <h3 style={contentStyle}>2</h3>
                </div>
                <div className="carousel">
                  <h3 style={contentStyle}>3</h3>
                </div>
                <div className="carousel">
                  <h3 style={contentStyle}>4</h3>
                </div>
              </Carousel>
            </div>
          </div>
          <div className="content">
            <div className="container sub-content d-flex px-0 pt-3">
              <div className="col-8 px-0">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data}
                  </tbody>
                </table>
              </div>
              <div className="col-4">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
