/**
 * file Name: ShowSections.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for viewing a list of section entities
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import {Container} from "react-bootstrap";

class ShowSectionsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };
    }

    componentDidMount() {
        // get all the sections
        axios.get(APIPaths.sections)
            .then(res => {
                this.setState({sections: res.data});
            });
    }

    render() {
        return (
            <Container className="container">
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
                            {(this.state.sections || []).map(item =>
                                <tr key={item.id}>
                                    <td><Link
                                        to={interpolateWithId(Paths.showSection, item.id)}>
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
            </Container>
        );
    }
}

export default ShowSectionsComponent;
