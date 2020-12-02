import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ShowSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };
    }

    componentDidMount() {
        axios.get('/sections')
            .then(res => {
                this.setState({sections: res.data});
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            SECTION LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="../../admin/createSection">Add Section</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.sections.map(item =>
                                <tr key={item.id}>
                                    <td><Link
                                        to={`/admin/showSection/${item.id || 'undefined'}`}>{item.title || 'undefined'}</Link>
                                    </td>
                                    <td>{item.description}</td>
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

export default ShowSections;
