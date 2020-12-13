import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";
import './adminMenu.css'

class AdminMenuComponent extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="admin-nav-header">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Admin Menu
                    </h3>
                </div>
                <div className={"header-admin-menu"}>
                    <div><h4><Link to={"/"}>Home</Link></h4></div>
                    <div><h4><Link to={Paths.showAllMenus}>Menu Operations</Link></h4></div>
                    <div><h4><Link to={Paths.showAllSections}>Section Operations</Link></h4></div>
                    <div><h4><Link to={Paths.showAllItems}>Item Operations</Link></h4></div>
                    <div><h4><Link to={Paths.showAllOptions}>Item Options Operations</Link></h4></div>
                    <div><h4><Link to={Paths.showAllImages}>Image Operations</Link></h4></div>
                    <div><h4><Link to={Paths.qrCode}>Generate Table QrCodes</Link></h4></div>
                    <div><h4><Link to={Paths.demo}>Demo</Link></h4></div>
                </div>
            </div>
        );
    }
}

export default AdminMenuComponent;
