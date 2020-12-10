import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import '../../SharedStyles/admin.css'
import {Col, Container, Row} from "react-bootstrap";
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import DisplayImage from '../ReusableComponents/DisplayImage/DisplayImage';
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {},
            images: {},
            optionItems: [],
            loaded: false,
        };
    }

    componentWillMount() {
        let newState = {...this.state}

        axios.get(interpolateWithId(APIPaths.items, this.props.match.params.id))
            .then(res => {
                newState.item = res.data; 
                newState.loaded = true;
            });

        axios.get(APIPaths.images)
            .then(res => {
                newState.images = this.convertImageArrToObj(res.data);
                newState.loaded = true;
                // console.log(newState)
                this.setImgDataToState(newState)
                console.log(newState)
                this.setState(newState)
            });
    }

    componentDidMount() {
        this.forceUpdate();
    }

    convertImageArrToObj(imageArr) {
        let out = {};

        imageArr.map((e,i) => {
            out[imageArr[i][1]] = imageArr[i][2];
        })

        return out;
    }

    setImgDataToState(ns) { if (ns.item.img.src == "") return ns.item.img.src = ns.images[ns.item.imgID] }

    delete(id) {
        axios.delete(interpolateWithId(APIPaths.items, id))
            .then((result) => {
                this.props.history.push(Paths.showAllItems)
            });
    }

    render() {
        if (!this.state.loaded) return <div/>

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
                                    <dt>Image:</dt>
                                    <dd><DisplayImage imgSrc={this.state.item.img.src || ''}/></dd>
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
                        <ReturnMenu/>
                    </div>
                </div>

            </Container>
        );
    }
}

export default ShowItem;