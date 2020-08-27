import React, { Component } from "react";
import "./header.css";
import axios from 'axios';
import {
  Link
} from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataUser: [],
      token: [],
      searchKey: "",
      searchResult: []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }



  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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
    var profile = document.getElementById("fix");
    var token = this.getCookie("token");
    if (token) {
      profile.style.display = "block";
      this.setState({ token: token });
    } else {
      profile.style.display = "none";
    }
    var idUser = this.props.idUser;
    axios({
      method: "GET",
      url: "http://localhost:2020/categories"
    }).then(function (data) {
      that.setState({ data: data.data })
    })
    axios({
      method: "GET",
      url: "http://localhost:2020/users?id=" + idUser,
    }).then(function (data) {
      that.setState({ dataUser: data.data });

    });
  }
  refresh() {
    window.location.reload();
  }
  clickProfile = () => {
    var idUser = this.props.idUser;
    window.location.href = "/Profile/" + idUser;
    return 0;
  }
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  deleteCookie = () => {
    this.setCookie("token", "", -1);
  }
  search = () => {
    let key = this.state.searchKey;
    console.log(this);
    axios.get(
      "http://localhost:2020/search?key="+key, {
      key: key
    }).then(data => {
      // console.log(key);
      // console.log(data);
      this.props.getDataFromChildren(data.data);
      this.setState({searchData:data.data});
    })
  }
backHome = () => {
  console.log("Back To Home");
  let key = this.state.searchKey;
  console.log(this);
  axios.get(
    "http://localhost:2020/search?key=", {
    key: key
  }).then(data => {
    // console.log(key);
    // console.log(data);
    this.props.getDataFromChildren(data.data);
  }).catch(err => {
    console.log("Error at Back Home");
  })
}
  render() {
    var data = this.state.data.length ? this.state.data.map((value, index) =>
      (
        <div className="content-mainPage h-100" onClick={this.refresh}>
          <Link to={"/Category/" + value._id} style={{ textDecoration: "none", fontSize: "20px", fontFamily: "'Dancing Script', cursive", color: "white" }}>{value.Name}</Link>
        </div>
      )
    ) : <p>Không có dữ liệu</p>
    var data1 = this.state.data.length ? this.state.data.map((value, index) =>
      (
        <option value={value.Name} />
      )
    ) : <p>Không có dữ liệu</p>
    var avatarUser = this.state.dataUser.length ? this.state.dataUser.map((value, index) =>
      (
        <img
          onClick={this.clickProfile}
          style={{ height: "100%", width: "100%", borderRadius: "40px" }}
          src={value.avatar.url} alt="image" />
      )
    ) : <p>Không có dữ liệu</p>
    var nameUser = this.state.dataUser.length ? this.state.dataUser.map((value, index) =>
      (
        <p>{value.username}</p>
      )
    ) : <p>Không có dữ liệu</p>
    return (
      <div className="projectPyyzz">
        <div className="header-projectPyyzz px-0">
          <div className="container-fluid h-100 w-100 px-0">
            <div className="container headerPart1 px-0 d-flex align-items-center">
              <div className="header-iconMain d-flex">
                <div className="header-iconMain-icon w-25 h-100 d-flex align-items-center">
                  <div className="logoOfP d-flex align-items-center">
                    <div className="logo-projectPyyzz" id="logo-projectPyyzz">
                      {
                        this.state.token.length ? avatarUser : <img style={{ height: "100%", width: "100%", borderRadius: "40px" }} src="https://imgix.ranker.com/user_node_img/50045/1000889229/original/1-photo-u1?w=650&q=50&fm=pjpg&fit=crop&crop=faces" alt />
                      }
                    </div>
                    <div className="text d-flex align-items-center px-2" id="text-projectPyyzz">
                      <div className="d-flex align-items-center" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "20px", color: "white" }}>
                        {
                          this.state.token.length ? nameUser : <p>Đang ở trang xem chùa</p>
                        }
                      </div>
                    </div>
                    <div className="sprite-sheet d-flex justify-content-center px-0">

                    </div>
                  </div>
                </div>
                <div className="header-iconMain-content w-50 h-100 d-flex align-items-center">
                  <div className="header-search w-100 h-50 d-flex justify-content-center">
                    <div className="header-search-sub d-flex align-items-center">
                      <div className="iconSearch d-flex align-items-center" onClick={this.search} style={{ cursor: "pointer" }}>
                        <i className="fas fa-search"></i>
                      </div>
                      <div className="inputSearch d-flex align-items-center">
                        <input list="browsers" name="searchKey" id="browser"
                          style={{ border: "0px", width: "100%", height: "100%" }} aria-autocomplete="list"
                          autocomplete="off" type="text"
                          value={this.state.searchKey}
                          onChange={this.handleChange}
                          placeholder="Nhập tên bài hát, ca sĩ hoặc mv... " />
                        <datalist className="optionsSearch" id="browsers">
                          <option value="All" />
                          {data1}
                        </datalist>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="header-iconMain-information w-25 h-100 d-flex justify-content-end align-items-center">
                  <div className="header-information-sub w-75 h-75 d-flex align-items-center justify-content-end">
                    <button type="button" className="add general ml-2">
                      <i style={{ fontSize: "20px" }} className="fas fa-user-plus"></i>
                    </button>
                    <button type="button" className="notification general ml-2">
                      <i style={{ fontSize: "20px" }} className="far fa-bell"></i>
                    </button>
                    <button type="button" id="fix" className="fix general ml-2">
                      <Link to={"/Profile/" + this.getCookie("token")} style={{ color: "black" }}><i style={{ fontSize: "20px" }} className="fas fa-user-shield"></i></Link>
                    </button>
                    <button type="button" className="account general ml-2">
                      {
                        this.state.token.length ? <Link to="/login" onClick={this.deleteCookie} style={{ color: "black" }}><i style={{ fontSize: "20px" }} className="fas fa-sign-in-alt"></i></Link> : <Link to="/login" style={{ color: "black" }}><i style={{ fontSize: "20px" }} className="fas fa-sign-in-alt"></i></Link>
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
                    this.state.token.length ? <Link to={"/Home/" + this.getCookie("token")} onClick={this.backHome} style={{ textDecoration: "none", fontSize: "20px", fontFamily: "'Dancing Script', cursive", color: "white" }}>Trang chủ</Link> : <Link to={"/"} style={{ textDecoration: "none", fontSize: "20px", fontFamily: "'Dancing Script', cursive", color: "white" }}>Trang chủ</Link>
                  }
                </div>
                {data}
                <div className="content-mainPage-Vip h-75 d-flex justify-content-center align-items-center"
                  style={{ borderRadius: "20px" }}>
                  <div
                    style={{ textDecoration: "none", fontSize: "20px", fontFamily: "'Dancing Script', cursive", color: "white" }}>VIP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
