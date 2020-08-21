import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    let that = this;
    var id = this.props.match.params.id;
    axios({
      method: "GET",
      url: "http://localhost:2020/users?id=" + id,
    }).then(function (data) {
      that.setState({ data: data.data[0] });
      console.log(data.data[0]);
    });
  }
    render() {
      return (
        <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                  <img src={this.state.data.avatar ? "http://localhost:2020" + this.state.data.avatar.url : null} alt />
                <div className="file btn btn-lg btn-primary">
                  Thay đổi ảnh
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                  <h5>{this.state.data.username}</h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                      Thông tin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Chỉnh sửa thông tin"/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Tên đăng nhập</label>
                    </div>
                    <div className="col-md-6">
                        <p>{this.state.data.username}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                        <p>{this.state.data.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Số điện thoại</label>
                    </div>
                    <div className="col-md-6">
                        <p>{this.state.data.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Đã like </label>
                    </div>
                    <div className="col-md-6">
                      <p>3 bài </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Đã comment </label>
                    </div>
                    <div className="col-md-6">
                        <p>5 bài </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Đã đăng </label>
                      </div>
                      <div className="col-md-6">
                        <p>{this.state.data.posts} bài</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </form>
  </div>

                );
              }
            }
