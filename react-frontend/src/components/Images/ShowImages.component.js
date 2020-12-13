/**
 * file Name: ShowImagesComponent.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for viewing a list of image entities
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowImagesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        // get all images
        axios.get(APIPaths.images)
            .then(res => {
                this.setState({images: res.data});
            });
    }

    render() {
        const imageRows = (this.state.images || []).map(image =>
            (image && image.id) ? (
                <tr key={image.id}>
                    <td><Link
                        to={interpolateWithId(Paths.showImage, image.id)}>
                        {image.name || 'Undefined'}
                    </Link></td>
                </tr>) : null
        );
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            IMAGES LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.createImage}>Add image</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {imageRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowImagesComponent;
