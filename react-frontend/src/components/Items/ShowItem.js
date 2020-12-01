import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import '../../SharedStyles/admin.css'
import {Col, Row} from "react-bootstrap";

class ShowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            optionItems: [],
            loaded: false,
        };
    }

    componentDidMount() {
        axios.get('/items/' + this.props.match.params.id)
            .then(res => {
                this.setState({...this.state, item: res.data, loaded: true});
            });
    }

    delete(id) {
        axios.delete('/items/' + id)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Item Details
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to="/admin/items"><span className="glyphicon glyphicon-th-list"
                                                                  aria-hidden="true"></span> Item List</Link></h4>
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{this.state.item.name}</dd>
                                    <dt>Description:</dt>
                                    <dd>{this.state.item.description}</dd>
                                    <dt>Internal description:</dt>
                                    <dd>{this.state.item.internalDescription}</dd>
                                    <dt>Price:</dt>
                                    <dd>{this.state.item.price}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{this.state.item.updated}</dd>
                                    <dt>Image:</dt>
                                    <dd>{this.state.item.image}</dd>
                                </dl>
                                <Link to={`/admin/editItem/${this.state.item.id}`}
                                      className="btn btn-success">Edit</Link>&nbsp;
                                <button onClick={this.delete.bind(this, this.state.item.id)}
                                        className="btn btn-danger">Delete
                                </button>
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container'>
                                    <ItemCardComponent data={this.state.item} itemUpdate={() => {
                                    }} key={this.state.loaded}></ItemCardComponent>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>


            </div>
        );
    }
}

export default ShowItem;
