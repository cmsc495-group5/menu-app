import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import {Container} from "react-bootstrap";

class ShowOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        axios.get(APIPaths.options)
            .then(res => {
                this.setState({options: res.data});
            });
    }

    render() {
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            OPTIONS LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.createOption}>Add option</Link></h4>
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
                                    <td><Link
                                        to={interpolateWithId(Paths.showOption, option.id)}>
                                        {option.name || 'Undefined'}
                                    </Link></td>
                                    <td>{option.description || 'Undefined'}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ShowOptions;
