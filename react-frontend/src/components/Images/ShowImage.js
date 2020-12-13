import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './image.css'
import {Col, Row} from "react-bootstrap";
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import DisplayImage from "../ReusableComponents/DisplayImage/DisplayImage";

class ShowImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: {},
            loaded: false,
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.images, this.props.match.params.id))
            .then(res => {
                this.setState({...res.data, loaded: true});
            });
    }

    delete(id) {
        axios.delete(interpolateWithId(APIPaths.images, id))
            .then((result) => {
                this.props.history.push(Paths.showAllImages)
            });
    }

    render() {
        return (
            <div className="container">

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Image Details
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to={Paths.showAllImages}> Image List</Link></h4>
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{this.state.name}</dd>
                                    <dt>Image:</dt>
                                    <dd><DisplayImage key={this.state.loaded} imgSrc={this.state.image || ''}/></dd>
                                </dl>
                                <Link to={interpolateWithId(Paths.editImage, this.state.id)}
                                      className="btn btn-success">Edit</Link>&nbsp;
                                <button onClick={this.delete.bind(this, this.state.id)}
                                        className="btn btn-danger">Delete
                                </button>
                            </Col>
                        </Row>
                    </div>
                </div>


            </div>
        );
    }
}

export default ShowImage;
