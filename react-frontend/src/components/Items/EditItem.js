import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, Col, Container, Row} from "react-bootstrap";
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import '../../SharedStyles/admin.css'
import {Multiselect} from "multiselect-react-dropdown";
import SwapOrderComponent from "../ReusableComponents/SwapOrder/SwapOrder.component";
import {formatOptions, reorder} from "../utils";
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import DisplayImage from "../ReusableComponents/DisplayImage/DisplayImage";

class EditItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: {
                id: '',
                name: '',
                description: '',
                internalDescription: '',
                image: null,
                price: 0,
                updated: '',
                options: [],

            },
            optionItems: [],
            loaded: 0
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.items, this.props.match.params.id))
            .then(res => {
                this.setState({...this.state, item: res.data, loaded: this.state.loaded + 1});
            });
        axios.get(APIPaths.options)
            .then(res => {
                this.setState({...this.state, optionItems: res.data, loaded: this.state.loaded + 1});
            });
        axios.get(APIPaths.images)
            .then(res => {
                this.setState({...this.state, imageOptions: res.data, loaded: this.state.loaded + 1});
            });
    }

    onChange = (e) => {
        const state = this.state.item
        if (e.target.name === 'price') {
            if (!isNaN(e.target.value)) {
                state[e.target.name] = parseFloat(e.target.value);
            }
        } else {
            state[e.target.name] = e.target.value;
        }

        this.setState({item: state, loaded: this.state.loaded + 1});
    }

    updateSelected = (selected) => {
        const newState = {...this.state, item: {...this.state.item, options: selected}, loaded: this.state.loaded + 1};
        this.setState(newState);
    }

    updateOrder = (option, change) => {
        let reordered = reorder(option, change, this.state.item.options)
        this.setState({...this.state, item: {...this.state.item, options: reordered}, loaded: this.state.loaded + 1});
    }

    updateImage = (selections) => {
        if (selections && selections.length) {
            this.setState({
                ...this.state,
                item: {...this.state.item, image: selections[0]},
                loaded: this.state.loaded + 1
            });
        } else {
            this.setState({...this.state, item: {...this.state.item, image: null}, loaded: this.state.loaded + 1});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
            updated
        } = this.state.item;

        axios.put(interpolateWithId(APIPaths.items, this.props.match.params.id), {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
            updated
        })
            .then((result) => {
                this.props.history.push(interpolateWithId(Paths.showItem, this.props.match.params.id));
            });
    }
    onCancel =(e) => {
        e.preventDefault();
        this.props.history.push(interpolateWithId(Paths.showItem, this.props.match.params.id));
    }

    render() {
        const formattedOptions = formatOptions(this.state.optionItems);
        const formattedSelectedOptions = formatOptions(this.state.item.options);
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT ITEM
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllItems}> Item List</Link></h4>
                        <Row>
                            <Col xs={6}>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" name="name"
                                               value={this.state.item.name} onChange={this.onChange}
                                               placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" name="description"
                                               value={this.state.item.description} onChange={this.onChange}
                                               placeholder="Description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internalDescription">Internal Description:</label>
                                        <input type="text" className="form-control" name="internalDescription"
                                               value={this.state.item.internalDescription} onChange={this.onChange}
                                               placeholder="Internal Description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">price:</label>
                                        <input type="number" step="0.01" className="form-control" name="price"
                                               value={this.state.item.price} onChange={this.onChange}
                                               placeholder={0.00}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="images">Image:</label>
                                        <Multiselect key={this.state.item?.image}
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
                                    <DisplayImage key={this.state.item?.image}
                                                  imgSrc={this.state.item?.image?.image || ''}/>
                                    <div className="form-group">
                                        <label htmlFor="options">options:</label>
                                        <Multiselect
                                            options={formattedOptions}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={formattedSelectedOptions}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                            key={this.state.optionItems}
                                            showCheckbox={true}
                                            closeOnSelect={false}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="swap">Position:</label>
                                        <SwapOrderComponent
                                            options={this.state.item.options}
                                            swapOptions={this.updateOrder}
                                            key={this.state.loaded}>
                                        </SwapOrderComponent>
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Update</button>
                                    <button onClick={this.onCancel} className="btn btn-secondary">cancel</button>

                                </form>
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container'>
                                    <ItemCardComponent data={this.state.item} itemUpdate={() => {
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

export default EditItem;
