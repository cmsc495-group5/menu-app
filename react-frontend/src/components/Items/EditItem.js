import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import './items.css'
import {Multiselect} from "multiselect-react-dropdown";

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
        axios.get('/items/' + this.props.match.params.id)
            .then(res => {
                this.setState({...this.state, item: res.data, loaded: this.state.loaded + 1});
            });
        axios.get('/options')
            .then(res => {
                this.setState({...this.state, optionItems: res.data});
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

        axios.put('/items/' + this.props.match.params.id, {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
            updated
        })
            .then((result) => {
                this.props.history.push("/admin/showItem/" + this.props.match.params.id)
            });
    }


    formatOptions(optionsArray) {
        const formattedOptions = optionsArray.map(option => ({
            ...option,
            display: `${option.name} $${option.price ? option.price.toFixed(2) : 0.00}`
        }));
        return formattedOptions;
    }

    render() {
        const formattedOptions = this.formatOptions(this.state.optionItems);
        const formattedSelectedOptions = this.formatOptions(this.state.item.options);
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Item
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to={`/admin/showItem/${this.state.item.id}`}><span
                                    className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Item List</Link>
                                </h4>
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
                                        <input type="number" className="form-control" name="price"
                                               value={this.state.item.price} onChange={this.onChange}
                                               placeholder={0.00}/>
                                    </div>
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
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Update</button>
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
            </div>
        );
    }

}

export default EditItem;