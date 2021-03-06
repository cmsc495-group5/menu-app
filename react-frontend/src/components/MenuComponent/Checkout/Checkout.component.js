/**
 * file Name: Checkout.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for handling the checkout functions of the menu
 */

import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {formatPrice, getQueryVariable} from "../../utils";
import './checkout.css'
import {Paths} from "../../../paths";

class CheckoutComponent extends Component {
    constructor(props) {
        super(props);
        const {orderItems, total, isDemo, placeOrder} = props;
        this.state = {
            orderItems: orderItems || [],
            total: total || 0,
            table: getQueryVariable('table'), // get table from url
            isDemo: isDemo,
            placeOrder
        }
    }

    componentDidMount() {
    }

    /**
     * Generate option display elements for order item options
     * @param selectedOption {Object} - option of order item
     * @param count {int} - number of items
     * @returns {JSX.Element}
     */
    formatOptionForCheckout = (selectedOption, count) => {
        return (
            <Row key={selectedOption.id}>
                <Col xs={{span: 5}} className={'checkout-option'}> + {selectedOption.name}</Col>
                <Col xs={4}>{count} x {formatPrice(selectedOption.price)}</Col>
            </Row>
        )
    }

    /**
     * Submits order to the API, triggers a redirect to the complete order component
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.isDemo) {
            this.state.placeOrder(this.state.table).then(() => {
                this.props.history.push(Paths.orderComplete);
            }).catch((e) => {
                console.log(e);
                alert('error submitting order');
            });
        }
    }

    render() {
        // generate display elements for each order items
        const orderItems = (this.state.orderItems || []).map(item => {
            const {name, count, total, prepNotes, selectedOptions, price} = item;
            const selectedOptionsFormatted = (selectedOptions || []).map(option => this.formatOptionForCheckout(option, count));

            return (
                <Container key={item.id}>
                    <Row>
                        <Col xs={5} className={'checkout-item-name'}><b>{name}</b></Col>
                        <Col xs={4}>{count} x {formatPrice(price)}</Col>
                        <Col xs={3}>{formatPrice(total)}</Col>
                    </Row>

                    {(selectedOptions && selectedOptions.length > 0) ? selectedOptionsFormatted : null}

                    {prepNotes ? (<Row className='checkout-prep-notes'><Col xs={{span: 'auto', offset: 2}}>Notes
                        : {prepNotes}</Col> </Row>) : null}
                </Container>
            );
        })

        return (
            <Container className='checkout-container container'>
                <Row>
                    <Col
                        className='checkout-title'>
                        {`Your Order ${this.state.table ? `Table ${this.state.table}` : ''}:`}
                    </Col>
                </Row>
                <Row>
                    <Col className='checkout-order-items'>
                        {orderItems}
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span: 6, offset: 6}} className='checkout-order-total'>
                        <b>Total: {formatPrice(this.state.total)}</b>
                    </Col>
                </Row>
                <Row>
                    <Col className='checkout-order-submit'>
                        <Button
                            disabled={!(this.state.orderItems && this.state.orderItems.length > 0)}
                            onClick={this.onSubmit}
                        >
                            Submit Your Order
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CheckoutComponent;
