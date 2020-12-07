import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";
<<<<<<< HEAD
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
=======
import {Container} from "react-bootstrap";
>>>>>>> 589b820bd9610ae9064f1fbf344704864c723510

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
                            {this.state.sections.map(item =>
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
                    <ReturnMenu/>
                </div>
            </Container>
        );
    }
}

export default ShowSections;