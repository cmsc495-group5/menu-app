import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowSections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };
    }

    componentDidMount() {
        axios.get(APIPaths.sections)
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
                        <h4><Link to={Paths.createSection}>Add Section</Link></h4>
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
                                        to={interpolateWithId(Paths.showAllSections, item.id)}>
                                        {item.title || 'undefined'}
                                    </Link>
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
