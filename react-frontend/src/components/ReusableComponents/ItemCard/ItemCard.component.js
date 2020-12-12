import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {Multiselect} from 'multiselect-react-dropdown';
import {Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "./ItemCard.css"
import PopupTextFieldComponent from "../PopupTextfield/PopupTextField.component";
import {IconButton} from "@material-ui/core";
import {Form, Icon} from "semantic-ui-react";
import {formatOptions} from "../../utils";

class ItemCardComponent extends Component {
    constructor(props) {
        super(props);
        const {data, itemUpdate, currentValues} = props;
        const {count, prepNotes, selectedOptions} = currentValues || {};
        const {id, name, description, options, price, image} = data || {};
        const total = count && price && count * price;
        this.itemUpdate = itemUpdate ? itemUpdate : ((value) => console.warn('function not defined ', props, value));
        this.state = {
            id,
            name,
            description,
            count: count || 0,
            total: total || 0,
            prepNotes: prepNotes || '',
            options: options || [],
            image,
            price,
            selectedOptions: selectedOptions || []
        };
        this.open = false;
    }

    getPropsToSubmit = (state) => {
        const {id, prepNotes, count, price, selectedOptions, name} = state;
        let optionCost = 0;
        selectedOptions.forEach(option => {
            if (option && option.price) {
                optionCost = optionCost + option.price;
            }
        });
        return {
            id, prepNotes, count, name, price,
            selectedOptions: selectedOptions || [],
            total: (((price + optionCost) * 100) * count) / 100
        };
    }

    onChange = (event) => {
        // protects against deleting the value or manually entering greater than max values
        if (event.target && event.target.value === '') {
            event.target.value = 0;
        } else if (event.target && event.target.value > 99) {
            event.target.value = 99;
        } else {
            event.target.value = parseInt(event.target.value); // remove any prefixed 0
        }

        const newState = {...this.state, [event.target.name]: event.target.value};
        this.setState({...this.state, [event.target.name]: event.target.value});
        this.itemUpdate(this.getPropsToSubmit(newState));
    }
    increment = () => {
        const count = isNaN(this.state.count) || this.state.count === null ? 1 : parseInt(this.state.count) + 1;
        if (count <= 99) {
            const newState = {...this.state, count};
            this.setState(newState);
            this.itemUpdate(this.getPropsToSubmit(newState));
        }
    }

    decrement = () => {
        const count = (this.state.count - 1) >= 0 ? this.state.count - 1 : 0;
        const newState = {...this.state, count};
        this.setState(newState);
        this.itemUpdate(this.getPropsToSubmit(newState));
    }
    updateSelected = (selected) => {
        const newState = {...this.state, selectedOptions: selected};
        this.setState(newState);
        this.itemUpdate(
            this.state.count
                ? this.getPropsToSubmit(newState)
                : {id: newState.id, count: newState.count, prepNotes: newState.prepNotes}
        );
    }

    updateNote = (note) => {
        const newState = {...this.state, prepNotes: note.prepNotes};
        this.setState(newState);
        this.itemUpdate(this.getPropsToSubmit(newState));
    }

    render() {
        const {
            name,
            description,
            image, price,
            options, prepNotes, selectedOptions
        } = this.state;
        const formattedOptions = formatOptions(options);

        const imageElement = image
            ? (<Col xs={5}><Card.Img as={Image} fluid={true} src={image} className='item-image'/></Col>)
            : null;

        return (
            <div className='container item-card-container'>
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>

                        <Row>
                            <Col xs={image ? 7 : 12}>
                                {description}
                            </Col>
                            {imageElement}
                        </Row>
                        <Row className='card-input-row'>
                            <div className='card-price'>Price: ${price ? price.toFixed(2) : 0.00}</div>
                            <PopupTextFieldComponent
                                title={`Preparation notes for ${name}`}
                                updateNote={this.updateNote}
                                value={prepNotes}
                            ></PopupTextFieldComponent>

                            <div className='count-input-container'>
                                <IconButton className={'decrement-button'} onClick={this.decrement}><Icon
                                    name="caret down"/></IconButton>
                                <Form>
                                    <input
                                        className={'count-field'}
                                        type='number'
                                        name='count'
                                        placeholder={0}
                                        max={99}
                                        min={0}
                                        onChange={this.onChange}
                                        value={this.state.count}
                                    />
                                </Form>
                                <IconButton className={'increment-button'} onClick={this.increment}><Icon
                                    name='caret up'/></IconButton>
                            </div>
                        </Row>
                        {/* this will conditionally show options selector*/}
                        {options && options.length > 0 ? (
                            <Row>
                                <Col>
                                    <Card.Subtitle>Options</Card.Subtitle>
                                    <Multiselect
                                        options={formattedOptions}
                                        displayValue={'display'}
                                        emptyRecordMessage={'select options'}
                                        selectedValues={selectedOptions}
                                        onSelect={this.updateSelected}
                                        onRemove={this.updateSelected}
                                        showCheckbox={true}
                                        closeOnSelect={false}
                                    >
                                    </Multiselect>
                                </Col>
                            </Row>
                        ) : null}
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default ItemCardComponent;
