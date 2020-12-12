import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import './image.css'
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import DisplayImage from "../ReusableComponents/DisplayImage/DisplayImage";

class EditImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: {
                id: null,
                name: null,
                image: null,
            },
            loaded: 0
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.images, this.props.match.params.id))
            .then(res => {
                this.setState({image: res.data, loaded: this.state.loaded + 1});
            });
    }

    onChange = (e) => {
        const state = this.state.image;
        state[e.target.name] = e.target.value;
        this.setState({image: state, loaded: this.state.loaded + 1});
    }


    updateImageData = (imgData) => {
        let newState = {...this.state};

        if (imgData != null) newState.image = imgData;

        this.setState(newState);
    }

    encodeImageFileAsURL = (element) => {
        const file = element.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log('RESULT', reader.result)
            this.updateImageData(reader.result);
        }
        reader.readAsDataURL(file);
    }

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
                                <h4><Link to={Paths.showAllOptions}> Image List</Link></h4>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" name="name"
                                               value={this.state.image?.name} onChange={this.onChange}
                                               placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="file"
                                               onChange={(value) => this.encodeImageFileAsURL(value.target)}
                                        />
                                    </div>
                                    <DisplayImage key={this.state.image} imgSrc={this.state.image?.image || ''}/>

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

export default EditImage;