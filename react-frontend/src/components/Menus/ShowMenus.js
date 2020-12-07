import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import './menus.css'
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import {Container} from "react-bootstrap";

class ShowMenus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: []
        };
    }

    componentDidMount() {
        axios.get(APIPaths.menus)
            .then(res => {
                this.setState({menus: res.data});
            });
    }

    render() {
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            MENUS LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.createMenu}>Add Menu</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Active</th>
                                <th>Updated</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.menus.sort((a, b) => b.active -a.active).map(c =>
                                <tr key={c.id} className={c.active ? 'table-highlight-green' :''}>
                                    <td><Link
                                        to={interpolateWithId(Paths.showMenu,c.id)}>
                                        {c.title || 'Undefined'}
                                    </Link></td>
                                    <td>{c.internalDescription || 'Undefined'}</td>
                                    <td>{c.active ? 'true' : 'false'}</td>
                                    <td>{c.updated}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <ReturnMenu/>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ShowMenus;
