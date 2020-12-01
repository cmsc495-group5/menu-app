import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Multiselect} from "multiselect-react-dropdown";
import {Col, Row} from "react-bootstrap";
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";

class CreateItem extends Component {

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
        axios.get('/options')
            .then(res => {
                this.setState({...this.state, optionItems: res.data});
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
            image,
            price,
            options,
            updated,
            optionItems,
        } = this.state;

        axios.post('/items', {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
        })
            .then((result) => {
                this.props.history.push("/admin/items")
            });
    }
    updateSelected = (selected) => {
        const newState = {...this.state, options: selected, loaded: this.state.loaded + 1};
        this.setState(newState);
    }

    formatOptions(optionsArray) {
        const formattedOptions = optionsArray.map(option => ({
            ...option,
            display: `${option.name} $${option.price ? option.price.toFixed(2) : 0.00}`
        }));
        return formattedOptions;
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
            active,
            updated
        } = this.state;
        const formattedOptions = this.formatOptions(optionItems)
        const selectedOptions = this.formatOptions(options);
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD ITEM
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to="../admin/items">Item List</Link></h4>

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
                                        <label htmlFor="price">price:</label>
                                        <input type="number" className="form-control" name="price" value={price}
                                               onChange={this.onChange} placeholder={0.00}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="options">options:</label>
                                        <Multiselect
                                            options={formattedOptions}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={selectedOptions}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                        />
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
            </div>
        );
    }
}

export default CreateItem;