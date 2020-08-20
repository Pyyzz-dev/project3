import React , {Component} from "react" ;


export default class Footer extends Component {
    render(){
        return(
            <div className="main-footer bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <h4 className="text-light">Abc</h4>
                            <ul className="list-unstyled">
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <h4 className="text-light">Abc</h4>
                            <ul className="list-unstyled">
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <h4 className="text-light">Abc</h4>
                            <ul className="list-unstyled">
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <h4 className="text-light">Abc</h4>
                            <ul className="list-unstyled">
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                                <li className="text-light">xyz</li>
                            </ul>
                        </div>
                        {/* Footer-bottom */}
                        <div className="footer-bottom d-flex justify-content-center">
                            
                                <p className = "text-xs-center text-light">
                                    &copy;{new Date().getFullYear()} City Guide App - All Rights Reservered
                                </p>
                            
                            
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}