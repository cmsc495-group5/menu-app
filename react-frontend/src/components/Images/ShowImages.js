import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowImages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        axios.get(APIPaths.images)
            .then(res => {
                this.setState({images: res.data});
            });
    }

    render() {
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
                            {this.state.images.map(image =>
                                <tr key={image.id}>
                                    <td><Link
                                        to={interpolateWithId(Paths.showImage, image.id)}>
                                        {image.name || 'Undefined'}
                                    </Link></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowImages;
