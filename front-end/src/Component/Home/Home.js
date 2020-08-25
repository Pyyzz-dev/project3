import React, {Component} from 'react';
import Content from "../Content/Content";
import Header from "../Header/header";
import Footer from "../Footer/footer"



export default class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Content/>
                
                <Footer/>
            </div>
        )
    }
}