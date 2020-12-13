/**
 * file Name: ShowItem.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for viewing an item entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import '../../SharedStyles/admin.css'
import {Col, Container, Row} from "react-bootstrap";
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import DisplayImageComponent from "../ReusableComponents/DisplayImage/DisplayImage.component";
import {formatPrice} from "../utils";

class ShowItemComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            optionItems: [],
            loaded: false,
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.items, this.props.match.params.id))
            .then(res => {
                this.setState({
                    ...this.state,
                    item: {...res.data},
                    loaded: true
                });
            });
    }

    /**
     * Deletes the item entity
     * @param id {string} - id of the item
     */
    delete(id) {
        axios.delete(interpolateWithId(APIPaths.items, id))
            .then((result) => {
                this.props.history.push(Paths.showAllItems)
            });
    }

    render() {
        return (
            <Container className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ITEM DETAILS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllItems}> Item List</Link></h4>
                        <Row>
                            <Col xs={6}>
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
                                    <dt>Options:</dt>
                                    <dd>{this.state.item.options && this.state.item.options.length > 0 ?
                                        this.state.item.options.map(opt => (
                                            <div key={opt.id}><b>Name:</b> {opt.name}
                                                <b>Price:</b>{formatPrice(opt.price)}</div>)
                                        )
                                        : "None"}
                                    </dd>
                                    <dt>Image:</dt>
                                    <dd><DisplayImageComponent imgSrc={this.state.item?.image?.image}/></dd>
                                </dl>
                                <Link to={interpolateWithId(Paths.editItem, this.state.item.id)}
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


            </Container>
        );
    }
}

export default ShowItemComponent;
