import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import {Multiselect} from 'multiselect-react-dropdown';
import {Button, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import "./ItemCard.css"

class ItemCard extends Component {
    constructor(props) {
        super(props);
        const {data, itemUpdate} = props;
        const {id, name, description, count, options, prepNotes, price, image, selectedOptions} = data || {};
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
    }

    getPropsToSubmit = (state) => {
        const {id, prepNotes, count, price, selectedOptions} = state;
        let optionCost = 0;
        selectedOptions.forEach(option => {
            if (option && option.price) {
                optionCost = optionCost + option.price;
            }
        });
        return {
            id, prepNotes, count,
            selectedOptions: count ? selectedOptions : [],
            total: (((price + optionCost) * 100) * count) / 100
        };
    }

    onChange = (event) => {
        console.log(event);
        const newState = {...this.state, [event.target.name]: event.target.value};
        this.setState({...this.state, [event.target.name]: event.target.value});
        this.itemUpdate(this.getPropsToSubmit(newState));
    }
    increment = () => {
        const count = this.state.count + 1;
        const newState = {...this.state, count};
        this.setState(newState);
        this.itemUpdate(this.getPropsToSubmit(newState));
    }

    decrement = () => {
        const count = (this.state.count - 1) >= 0 ? this.state.count - 1 : 0;
        const newState = {...this.state, count};
        this.setState(newState);
        this.itemUpdate(this.getPropsToSubmit(newState));
    }
    updateSelected = (selected) => {
        console.log(selected)
        const newState = {...this.state, selectedOptions: selected};
        this.setState(newState);
        this.itemUpdate(this.state.count ? this.getPropsToSubmit(newState) : {id: newState.id, count: newState.count});
    }

    render() {
        const {
            name,
            description,
            image, price,
            options
        } = this.state;
        const formattedOptions = options.map(option => ({
            ...option,
            display: `${option.name} $${option.price.toFixed(2)}`
        }));
        return (
            <div className="container">
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>

                        <Row>
                            <Col xs={7}>
                                {description}
                            </Col>
                            <Col xs={5}>
                                <Card.Img as={Image} fluid={true} src={image} className='item-image'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5}>
                                <div>Price: {price.toFixed(2)}</div>
                            </Col>
                            <Col xs={7}>
                                <ButtonToolbar aria-label="Toolbar with Button groups">
                                    <Button variant="secondary"></Button>
                                    <Button variant="danger" onClick={this.decrement}>-</Button>
                                    <form>
                                        <input
                                            className={'count-field'}
                                            type="number"
                                            name="count"
                                            placeholder="0"
                                            onChange={this.onChange}
                                            value={this.state.count}
                                        />
                                    </form>
                                    <Button variant="success" onClick={this.increment}>+</Button>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <Row>
                            {options && options.length > 0 ? (
                                <Multiselect
                                    options={formattedOptions}
                                    displayValue={"display"}
                                    emptyRecordMessage={"select options"}
                                    onSelect={this.updateSelected}
                                    onRemove={this.updateSelected}
                                >
                                </Multiselect>
                            ) : null}

                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default ItemCard;