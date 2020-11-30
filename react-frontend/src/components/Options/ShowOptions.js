import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ShowOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        axios.get('/options')
            .then(res => {
                this.setState({options: res.data});
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            options LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="../../admin/createOption">Add option</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.options.map(option =>
                                <tr key={option.id}>
                                    <td><Link to={`/admin/showOption/${option.id}`}>{option.name || 'Undefined'}</Link>
                                    </td>
                                    <td>{option.description || 'Undefined'}</td>
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

export default ShowOptions;
