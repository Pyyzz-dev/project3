import React, {Component} from 'react';
import Content from "../Content/Content";
import Header from "../Header/header";
import Footer from "../Footer/footer";


export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
        }
    }
    render(){
        var idUser = this.props.match.params.id;
        return(
            <div>
                <Header idUser={idUser}/>
                <Content/>
                <Footer/>
            </div>
        )
    }
}