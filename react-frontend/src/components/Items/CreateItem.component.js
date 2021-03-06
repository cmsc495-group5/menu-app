/**
 * file Name: CreateItem.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for creating a new item entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Multiselect} from "multiselect-react-dropdown";
import {Button, Col, Container, Row} from "react-bootstrap";
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import SwapOrderComponent from "../ReusableComponents/SwapOrder/SwapOrder.component";
import {formatOptions, reorder} from "../utils";
import {APIPaths, Paths} from "../../paths";
import DisplayImageComponent from "../ReusableComponents/DisplayImage/DisplayImage.component";

class CreateItemComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            internalDescription: '',
            image: null,
            price: 0,
            options: [],
            optionItems: [],
            updated: '',
            loaded: 0,
        };
    }

    componentDidMount() {
        // get item options
        axios.get(APIPaths.options)
            .then(res => {
                this.setState({...this.state, optionItems: res.data});
            });
        // get image options
        axios.get(APIPaths.images)
            .then(res => {
                this.setState({...this.state, imageOptions: res.data});
            });
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
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

    /**
     * Submits item to the API, triggers a redirect to the item list
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
        } = this.state;

        axios.post(APIPaths.items, {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
        })
            .then((result) => {
                this.props.history.push(Paths.showAllItems)
            });
    }

    /**
     * Updates state with selected Options
     * @param selected {Object[]} - selected options
     */
    updateSelected = (selected) => {
        const newState = {...this.state, options: selected, loaded: this.state.loaded + 1};
        this.setState(newState);
    }
    /**
     * Updates state with selected Options order
     * @param option {Object} Option
     * @param change {int} index
     */
    updateOptionOrder = (option, change) => {
        let reordered = reorder(option, change, this.state.options)
        this.setState({...this.state, options: reordered, loaded: this.state.loaded + 1});
    }
    /**
     * Updates state with selected Image
     * @param selections {Object[]} - single selected image
     */
    updateImage = (selections) => {
        if (selections && selections.length) {
            this.setState({...this.state, image: selections[0], loaded: this.state.loaded + 1});
        } else {
            this.setState({...this.state, image: null, loaded: this.state.loaded + 1});
        }
    }

    render() {
        const {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
            optionItems,
        } = this.state;
        const formattedOptions = formatOptions(optionItems)
        const selectedOptions = formatOptions(options);
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
                                        <input type="number" step="0.01" className="form-control" name="price"
                                               value={price}
                                               onChange={this.onChange} placeholder={0.00}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="images">Image:</label>
                                        <Multiselect key={this.state.image}
                                                     options={this.state.imageOptions}
                                                     singleSelect={true}
                                                     displayValue={'name'}
                                                     emptyRecordMessage={'select Image'}
                                                     onSelect={this.updateImage}
                                                     onRemove={this.updateImage}
                                                     closeOnSelect={true}
                                                     hidePlacehoder={false}
                                        /><Button onClick={this.updateImage}>Remove</Button>
                                    </div>
                                    <DisplayImageComponent key={image} imgSrc={image?.image || ''}/>
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
                                            swapOptions={this.updateOptionOrder}
                                            key={this.state.loaded}>
                                        </SwapOrderComponent>
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
                    </div>
                </div>
            </Container>
        );
    }
}

export default CreateItemComponent;
