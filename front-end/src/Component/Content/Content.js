import React, {Component} from 'react';
import "./Content.css";

export default class Content extends Component {
  render(){
    return(
      <div className="Content">
        <div className="container-fluid sub-Content px-0">
          <div className="container advertisement px-0 d-flex align-items-center">
            <div className="sub-advertisement">

            </div>
          </div>
          <div className="content">
            <div className="container sub-content d-flex px-0 pt-3">
              <div className="col-8">

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
