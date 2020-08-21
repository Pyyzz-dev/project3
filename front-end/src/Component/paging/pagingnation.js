import React , {Component} from 'react';

import axios from 'axios';

import { Pagination } from 'antd';

export default class Paging extends Component{
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
    
    componentDidMount(){
        let that = this; 
        console.log("jer")
        axios({
          method: "GET",
          url:"http://localhost:2020/posts"
        }).then(function(data){
            console.log(data, "a")
          that.setState({data: data.data});
        })
      }
    render(){
        return(
            <div>
                {console.log(this.state.data)}
                <Pagination defaultCurrent={1} total={50} />
            </div>
        );
    }

    
} 