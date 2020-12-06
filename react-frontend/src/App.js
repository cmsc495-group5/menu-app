import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import ReturnMenu from './components/ReusableComponents/ReturnMenu/ReturnMenu'

class App extends Component {

    componentDidMount() {
    }

    render() {
        const style = {
            display: "flex",
            flexDirection: "column",
            paddingTop: "2rem"
        }

        const linkStyle = {
            marginBottom: "2rem"
        }

        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Menu
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4 style={style}>
                            <Link to="/admin/menus/" style={linkStyle}>Menus</Link>
                            <Link to="/admin/sections/" style={linkStyle}>Sections</Link>
                            <Link to="/admin/items/" style={linkStyle}>Items</Link>
                            <Link to="/admin/options/" style={linkStyle}>Options</Link>
                            <Link to="/menu" style={linkStyle}>Full Menu</Link>
                            <Link to="/admin/demo/" style={linkStyle}>Demo</Link>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
