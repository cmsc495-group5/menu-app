import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {APIPaths, Paths} from "../../paths";
import DisplayImage from "../ReusableComponents/DisplayImage/DisplayImage";


class CreateImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

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

    updateImageData = (imgData) => {
        let newState = {...this.state};

        if (imgData != null) newState.image = imgData;

        this.setState(newState);
    }

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
                            <DisplayImage key={this.state.image} imgSrc={this.state.image || ''}/>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateImage;