/**
 * file Name: EditImage.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for editing an image entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import './image.css'
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import DisplayImageComponent from "../ReusableComponents/DisplayImage/DisplayImage.component";

class EditImageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: {},
            loaded: 0
        };
    }

    componentDidMount() {
        // get images for dropdown
        axios.get(interpolateWithId(APIPaths.images, this.props.match.params.id))
            .then(res => {
                this.setState({image: res.data, loaded: this.state.loaded + 1});
            });
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = {...this.state.image};
        state[e.target.name] = e.target.value;
        this.setState({image: state, loaded: this.state.loaded + 1});
    }

    /**
     * Updates image data in state
     * @param imgData {string} - 64bit encoded image
     */
    updateImageData = (imgData) => {
        let newState = {...this.state, image: {...this.state.image, image: imgData}, loaded: this.state.loaded + 1};
        this.setState(newState);
    }

    /**
     * Processes the first selected file to a 64 bit encoded image, triggers state update in callback
     * @param element {EventTarget & HTMLInputElement} - files selected
     */
    encodeImageFileAsURL = async (element) => {
        const file = element.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.updateImageData(reader.result);
        }
        reader.readAsDataURL(file);
    }

    /**
     * Submits image to the API, triggers a redirect to the image view
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            image,
        } = this.state.image;

        axios.put(interpolateWithId(APIPaths.images, this.props.match.params.id), {
            name,
            image,
        })
            .then((result) => {
                this.props.history.push(interpolateWithId(Paths.showImage, this.props.match.params.id));
            });
    }

    /**
     * Triggers a redirect to the image view
     * @param e  (Event} - triggering element change event, cancel pressed
     */
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push(interpolateWithId(Paths.showImage, this.props.match.params.id))
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Image
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to={Paths.showAllImages}> Image List</Link></h4>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" name="name"
                                               value={this.state.image.name} onChange={this.onChange}
                                               placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="file"
                                               onChange={(value) => this.encodeImageFileAsURL(value.target)}
                                        />
                                    </div>
                                    <DisplayImageComponent key={this.state.loaded}
                                                           imgSrc={this.state.image && this.state.image.image ? this.state.image.image : ''}/>

                                    <button type="submit" className="btn btn-secondary">Update</button>
                                    <button onClick={this.onCancel} className="btn btn-secondary">cancel</button>
                                </form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditImageComponent;
