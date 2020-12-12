import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Paths} from "./paths";

class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Menu
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.menu}>
                            Full Menu
                        </Link></h4>
                        <h4><Link to={Paths.admin}>
                            Admin
                        </Link></h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
