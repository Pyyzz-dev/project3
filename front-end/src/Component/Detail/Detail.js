import React, {Component} from 'react';
import 'antd/dist/antd.css';
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
        var data = this.state.data.length ? this.state.data.map((value,index)=>
      (
        <tr>
            <th scope="row">{index+1}</th>
            <td id={"titlePost-"+value._id}>{value.Title}</td>
            <td>{value.Upload_date}</td>
            <td><Link to={"/DetailComment/"+ value._id} id={"comment-"+value._id}>{value.comments.length}</Link></td>
          </tr>
      )
    ) : <p>Không có dữ liệu</p>
        return(
            
            <div>
                <div className="detail-Post">
                  <div className="container">
                    <div className="detail-Post-content d-block">
                      <div className="">
                        {data}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn btn-outline-info" onClick={this.clickComment}>Comment</div>
                <div class="modal" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenteredLabel">Comment</h5>
                          <button type="button" class="close" id="close1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={this.handleOnChange}
                        />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="close2" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}