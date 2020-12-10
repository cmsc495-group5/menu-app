import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Multiselect} from "multiselect-react-dropdown";
import {Col, Container, Row} from "react-bootstrap";
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import ImagePickerInp from '../ReusableComponents/ImagePickerInput/ImagePickerInp';
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import SwapOrderComponent from "../ReusableComponents/SwapOrder/SwapOrder.component";
import {formatOptions, formatImages, reorder} from "../utils";
import {APIPaths, Paths} from "../../paths";
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';

class CreateItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            internalDescription: '',
            price: 0,
            options: [],
            optionItems: [],
            images: [],
            imageListForDropdown: [],
            imgID: "",
            updated: '',
            loaded: 0,
            img: {
                src: ""
            },
            ordinal: null,
        };
    }

    componentDidMount() {
        let newState = {...this.state}

        axios.get(APIPaths.options)
            .then(res => {
                newState.optionItems = res.data;
            });

        axios.get(APIPaths.images)
            .then(res => {
                newState.images = res.data;
                res.data.map((e) => { this.state.imageListForDropdown.push(e[0]) })
                this.setState(newState)
            });
    }

    onChange = (e) => {
        const state = this.state
        if (e.target.name === 'price') {
            if (!isNaN(e.target.value)) {
                state[e.target.name] = parseFloat(e.target.value);
            }
        } else {
            state[e.target.name] = e.target.value;
        }
        this.setState({...state, loaded: state.loaded + 1});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            internalDescription,
            price,
            options,
            updated,
            optionItems,
            img,
            imgID,
            ordinal
        } = this.state;

        axios.post(APIPaths.items, {
            name,
            description,
            internalDescription,
            price,
            options,
            img,
            imgID,
            ordinal,
        })
            .then((result) => {
                this.props.history.push(Paths.showAllItems)
            });
    }

    updateSelected = (selected) => {
        const newState = {...this.state, options: selected, loaded: this.state.loaded + 1};
        this.setState(newState);
    }

    updateOrder = (option, change) => {
        let reordered = reorder(option, change, this.state.options)
        this.setState({...this.state, options: reordered, loaded: this.state.loaded + 1});
    }

    updateImageData = (imgData, fromDropdown) => {
        let newState = this.state
        
        if (fromDropdown) {
            this.state.images.map(e => {
                if (e[0] == imgData.value) newState.imgID = e[1];
            })
        } else {
            if (imgData != null) newState.img = imgData;
        }
        
        console.log(newState)
        this.setState(newState);
    }

    render() {
        const {
            name,
            description,
            internalDescription,
            image,
            images,
            price,
            options,
            optionItems,
        } = this.state;

        const formattedOptions = formatOptions(optionItems)
        const selectedOptions = formatOptions(options);
        // const imageOptions = formatImages(images)
        
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD ITEM
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllItems}>Item List</Link></h4>
                        <Row>
                            <Col xs={6}>


                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" name="name" value={name}
                                            onChange={this.onChange} placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" name="description"
                                            value={description}
                                            onChange={this.onChange} placeholder="description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internalDescription">Internal Description:</label>
                                        <input type="text" className="form-control" name="internalDescription"
                                            value={internalDescription} onChange={this.onChange}
                                            placeholder="internalDescription"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className="form-control" name="price" value={price}
                                            onChange={this.onChange} placeholder={0.00}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="options">Options:</label>
                                        <Multiselect
                                            options={formattedOptions}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={selectedOptions}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                            showCheckbox={true}
                                            closeOnSelect={false}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="swap">Position:</label>
                                        <SwapOrderComponent
                                            options={this.state.options}
                                            swapOptions={this.updateOrder}
                                            key={this.state.loaded}>
                                        </SwapOrderComponent>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Item Image:</label>
                                        <ImagePickerInp
                                            onChange={(value) => this.updateImageData(value, false)}
                                        />
                                        <br/>
                                        { 
                                            (this.state.images.length != 0) ? 
                                                <Dropdown 
                                                    options={this.state.imageListForDropdown} 
                                                    onChange={(value) => this.updateImageData(value, true)} 
                                                    value={null} 
                                                    placeholder="Select a previously uploaded image" 
                                                />
                                                : ":("
                                        }
                                        <br/>
                                    </div>

                                    <button type="submit" className="btn btn-secondary">Submit</button>
                                </form>
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container'>
                                    <ItemCardComponent data={this.state} itemUpdate={() => {
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

export default CreateItem;
