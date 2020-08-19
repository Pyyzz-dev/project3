import React, {Component} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import "./Detail.css";
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
            console.log(data.data);
          })
      }
    
    render(){
        var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <tr>
            <th scope="row">{index+1}</th>
            <td id={"titlePost-"+value._id}>{value.Title}</td>
            <td>{value.Upload_date}</td>
            <td>{value.comments[0].Content}</td>
          </tr>
      )
    ) : <p>Không có dữ liệu</p>
        return(
            
            <div>
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Update_Date</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data}
                  </tbody>
                </table>
            </div>
        )
    }
}