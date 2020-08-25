import React, {Component} from 'react';
import Content from "../Content/Content";
import Header from "../Header/header";
import Footer from "../Footer/footer"
import Paging from "../paging/pagingnation";


export default class Home extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Content/>
                {/* <Paging api ={"http://localhost:2020" + "/infinity-load?"} /> */}
                <Footer/>
            </div>
        )
    }
}