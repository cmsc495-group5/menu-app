import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './options.css'
import {Col, Row} from "react-bootstrap";
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionItem: {},
            loaded: false,
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.options , this.props.match.params.id))
            .then(res => {
                this.setState({optionItem: res.data, loaded: true});
            });
    }

    delete(id) {
        axios.delete(interpolateWithId(APIPaths.options , id))
            .then((result) => {
                this.props.history.push(Paths.showAllOptions)
            });
    }

    render() {
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Option Details
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to={Paths.showAllOptions}> Option List</Link></h4>
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{this.state.optionItem.name}</dd>
                                    <dt>Description:</dt>
                                    <dd>{this.state.optionItem.description}</dd>
                                    <dt>Internal description:</dt>
                                    <dd>{this.state.optionItem.internalDescription}</dd>
                                    <dt>Price:</dt>
                                    <dd>{this.state.optionItem.price}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{this.state.optionItem.updated}</dd>
                                    <dt>Image:</dt>
                                    <dd>{this.state.optionItem.image}</dd>
                                </dl>
                                <Link to={interpolateWithId(Paths.editOption, this.state.optionItem.id)}
                                      className="btn btn-success">Edit</Link>&nbsp;
                                <button onClick={this.delete.bind(this, this.state.optionItem.id)}
                                        className="btn btn-danger">Delete
                                </button>
                            </Col>
                        </Row>
                        <ReturnMenu/>
                    </div>

                </div>


            </div>
        );
    }
}

export default ShowOption;
