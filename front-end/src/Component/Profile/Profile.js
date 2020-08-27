import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    let that = this;
    var id = this.props.match.params.id;
    axios({
      method: "GET",
      url: "http://localhost:2020/users?id=" + id,
    }).then(function (data) {
      that.setState({ data: data.data});
    });
  }

    render() {
      var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                  <img src={value.avatar.url} alt="Không load được ảnh" />
                <div className="file btn btn-lg btn-primary">
                  Thay đổi ảnh
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <p style={{fontFamily: "'Dancing Script', cursive", color:"white", fontSize:"50px"}}>{value.username}</p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" style={{color:"black"}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                      Thông tin
                    </a>
                  </li>
                  <li className="nav-item" style={{borderLeft:"2px solid black"}}>
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                      <Link to={"/Home/"+this.props.match.params.id} style={{color:"black"}}>Back to Home</Link>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-md-4">
              <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Chỉnh sửa thông tin"/>
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Username</label>
                    </div>
                    <div className="col-md-6">
                        <p>{value.username}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                        <p>{value.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                        <p>{value.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Liked</label>
                    </div>
                    <div className="col-md-6">
                      <p>{value.posts.length} bài</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Commented</label>
                    </div>
                    <div className="col-md-6">
                        <p>{value.posts.length} bài</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Posted</label>
                      </div>
                      <div className="col-md-6">
                        <p>{value.posts.length} bài</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    ) : <p>Không có dữ liệu</p>
      return (
        <div className="container emp-profile">
          {data}
        </div>

                );
              }
            }
