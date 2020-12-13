/**
 * file Name: CreateImage.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for creating a new image entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {APIPaths, Paths} from "../../paths";
import DisplayImageComponent from "../ReusableComponents/DisplayImage/DisplayImage.component";


class CreateImageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
        };
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    /**
     * Submits image to the API, triggers a redirect to the image list
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            image,
        } = this.state;

        axios.post(APIPaths.images, {
            name,
            image,
        })
            .then((result) => {
                this.props.history.push(Paths.showAllImages);
            });
    }

    /**
     * Updates image data in state
     * @param imgData {string} - 64bit encoded image
     */
    updateImageData = (imgData) => {
        let newState = {...this.state};

        if (imgData != null) newState.image = imgData;

        this.setState(newState);
    }

    /**
     * Processes the first selected file to a 64 bit encoded image, triggers state update in callback
     * @param element {EventTarget & HTMLInputElement} - files selected
     */
    encodeImageFileAsURL = (element) => {
        const file = element.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.updateImageData(reader.result);
        }
        reader.readAsDataURL(file);
    }

    render() {
        const {
            name,
            image,
        } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD IMAGE
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllImages}>Images List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" value={name}
                                       onChange={this.onChange} placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Image:</label>
                                <input type="file"
                                       onChange={(value) => this.encodeImageFileAsURL(value.target)}
                                />
                            </div>
                            <DisplayImageComponent key={image} imgSrc={image || ''}/>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateImageComponent;
