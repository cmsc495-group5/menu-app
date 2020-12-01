import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ShowMenus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: []
        };
    }

    componentDidMount() {
        axios.get('/menus')
            .then(res => {
                this.setState({menus: res.data});
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            MENUS LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="../../admin/createMenu">Add Menu</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.menus.map(c =>
                                <tr key={c.id}>
                                    <td><Link to={`/admin/showMenu/${c.id}`}>{c.title || 'Undefined'}</Link></td>
                                    <td>{c.description || 'Undefined'}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowMenus;
