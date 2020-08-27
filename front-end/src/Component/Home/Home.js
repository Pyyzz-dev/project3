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
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
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
    render(){
        var idUser = this.getCookie("token");
        return(
            <div>
                <Header idUser ={idUser}/>
                <Content idUser ={idUser}/>
                <Footer/>
            </div>
        )
    }
}