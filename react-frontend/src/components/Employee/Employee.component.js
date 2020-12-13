/**
 * file Name: Employee.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for Employee view for processing orders
 */

import React, {Component} from "react";
import {Button, Card, Col, Container} from "react-bootstrap";
import axios from "axios";
import {APIPaths, interpolateWithId} from "../../paths";
import Row from "react-bootstrap/Row";
import './employee.css';
import 'semantic-ui-css/semantic.min.css'
import {Confirm, Icon} from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";

/**
 * Order statuses
 * @type {{Complete: string, Preparing: string, Pending: string, Filled: string}}
 */
export const STATUS = {
    Pending: 'pending',
    Preparing: 'preparing',
    Filled: 'filled',
    Complete: 'complete',
}
/**
 * Polling interval for the employee section
 * @type {number}
 */
const pollInterval = 30 * 1000; // 30 seconds;

/**
 * Component that manages orders for employees
 */
class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pending: [],
            preparing: [],
            filled: [],
            updated: 0,
            lastUpdated: null,
            open: {}
        }
    }

    componentDidMount() {
        // set up polling
        const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
        const poll = (promiseFn, time) => promiseFn().then(
            sleep(time).then(() => poll(promiseFn, time)));

        poll(this.getUpdatedOrders, pollInterval);
    }

    /**
     * gets active orders from the api and updates state
     * @returns {Promise<void>}
     */
    getUpdatedOrders = () => {
        return axios.get(APIPaths.activeOrders)
            .then(res => {
                if (Array.isArray(res && res.data)) {
                    const pending = res.data.filter(order => order.status === STATUS.Pending).sort((a, b) => new Date(a.placed) - new Date(b.placed));
                    const preparing = res.data.filter(order => order.status === STATUS.Preparing).sort((a, b) => new Date(a.placed) - new Date(b.placed));
                    const filled = res.data.filter(order => order.status === STATUS.Filled).sort((a, b) => new Date(a.placed) - new Date(b.placed));
                    this.setState({
                        ...this.state,
                        pending,
                        preparing,
                        filled,
                        updated: this.state.updated + 1,
                        lastUpdated: new Date()
                    });
                }
            });
    }

    /**
     * Makes an api call to update an orders status then triggers a UI update with new data.
     * @param orderId {string} - order id
     * @param status {string} - status to update to
     */
    updateOrder = (orderId, status) => {
        axios.put(interpolateWithId(APIPaths.orders, orderId), {status})
            .then(() =>
                this.getUpdatedOrders()
            );
    }

    /**
     * Sets order status to completed and sets canceled property, then makes an api call to make the update
     * @param orderId {string} - order id
     */
    cancelOrder = (orderId) => {
        axios.put(interpolateWithId(APIPaths.orders, orderId), {status: STATUS.Complete, canceled: true})
            .then(() =>
                this.getUpdatedOrders()
            );
    }

    /**
     * Opens a confirmation model before canceling the order
     * @param orderId {string} - order id
     */
    openConfirmation = (orderId) => {
        const newState = {...this.state, open: {...this.state.open, [orderId]: true}}
        this.setState(newState);
    }

    /**
     * Updates the state to close the modal
     * @param orderId {string} - order id
     */
    handleCancel = (orderId) => {
        this.setState({...this.state, open: {...this.state.open, [orderId]: false}})
    }
    /**
     * Triggers the call to update the order and updates the state to close the modal
     * @param orderId {string} - order id
     */
    handleConfirm = (orderId) => {
        this.setState({...this.state, open: {...this.state.open, [orderId]: false}});
        this.cancelOrder(orderId)
    }

    /**
     * Generates html element (Button an modal) for canceling orders
     * @param items {JSX.Element[]} - array of orderItems
     * @param id {string} - id of order
     * @returns {JSX.Element}
     */
    getCancelButton(items, id) {
        return (
            <div><IconButton
                variant="warning"
                className='employee-right delete-button'
                onClick={() => this.openConfirmation(id)}>
                <Icon color='orange' name='exclamation triangle'/>
            </IconButton>
                <Confirm size={"small"}
                         header={"Are you sure you want to cancel this order?"}
                         content={items}
                         open={this.state.open[id]}
                         onCancel={() => this.handleCancel(id)}
                         onConfirm={() => this.handleConfirm(id)}/>
            </div>);
    }

    /**
     * Generates html elements for the pending orders column
     * @param orders {Object[]} - array of orders
     * @returns {JSX.Element[]} - html formatted cards for the orders in the pending column
     */
    formatPendingOrders = (orders) => {
        let count = 0;
        const formattedOrders = (orders || []).map(order => {
            const {id, placed, orderItems, table} = order;
            const items = this.formatItems(orderItems);
            count++;
            return (
                <Card key={id} className='employee-card'>
                    <Card.Header>
                        <h4>
                            <div className='employee-card-header'>
                                <span>Order: {count}</span> <span>Table: {table}</span>
                            </div>
                        </h4>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            {this.getCancelButton(items, id)}
                            <div><h5>Order time: {new Date(placed).toLocaleTimeString()}</h5></div>
                        </div>
                        Items:
                        {items}
                    </Card.Body>
                    <Card.Footer><Button block variant="success"
                                         onClick={() => this.updateOrder(id, STATUS.Preparing)}>to
                        Preparing</Button></Card.Footer>
                </Card>)
        })
        return formattedOrders;
    }

    /**
     * Generates html elements for the preparing orders column
     * @param orders {Object[]} - array of orders
     * @returns {JSX.Element[]} - html formatted cards for the orders in the preparing column
     */
    formatPreparingOrders = (orders) => {
        let count = 0;

        const formattedOrders = (orders || []).map(order => {
            const {id, placed, table, orderItems} = order;
            const items = this.formatItemsWithNotes(orderItems);
            count++;

            return (<Card key={id} className='employee-card'>
                <Card.Header>
                    <h4>
                        <div className='employee-card-header'>
                            <span>Order: {count}</span>
                            <span>Order time: {new Date(placed).toLocaleTimeString()}</span>
                            <span>Table: {table}</span>
                        </div>
                    </h4>
                </Card.Header>
                <Card.Body>
                    {this.getCancelButton(items, id)}
                    Items:
                    {items}
                </Card.Body>
                <Card.Footer>
                    <Button variant="danger" className="employee-order-button"
                            onClick={() => this.updateOrder(id, STATUS.Pending)}>to Pending</Button>
                    <Button variant="success" className="employee-order-button employee-right"
                            onClick={() => this.updateOrder(id, STATUS.Filled)}>to Filled</Button>
                </Card.Footer>
            </Card>)
        })
        return formattedOrders;
    }

    /**
     * Generates html elements for the filled orders column
     * @param orders {Object[]}
     * @returns {JSX.Element[]} - html formatted cards for the orders in the filled column
     */
    formatFilledOrders = (orders) => {
        let count = 0;
        const formattedOrders = (orders || []).map(order => {
            const {id, placed, table, orderItems} = order;
            const items = this.formatItems(orderItems);
            count++;

            return (<Card key={id} className='employee-card'>
                <Card.Header>
                    <h4>
                        <div className='employee-card-header'>
                            <span>Order: {count}</span>

                        </div>
                    </h4>
                </Card.Header>
                <Card.Body>
                    {this.getCancelButton(items, id)}
                    <div>Order time: {new Date(placed).toLocaleTimeString()}</div>
                    <div>Table: {table}</div>
                </Card.Body>
                <Card.Footer>
                    <Button block variant="danger" onClick={() => this.updateOrder(id, STATUS.Preparing)}>to
                        Preparing</Button>
                    <Button block variant="success" onClick={() => this.updateOrder(id, STATUS.Complete)}>to
                        Served</Button>
                </Card.Footer>
            </Card>)
        });
        return formattedOrders;
    }

    /**
     * Formats items for display in the order cards
     * @param orderItems {Object[]} - array of orderItems
     * @returns {JSX.Element[]} - formatted order items
     */
    formatItems(orderItems) {
        return (orderItems || []).map(item => {
            return (<Row key={item.itemId}>
                <Col xs={9}>{item.itemName}:</Col> <Col xs={3}>
                {item.count}</Col></Row>)
        });
    }

    /**
     * Formats order items for the preparing column
     * @param orderItems {Object[]}
     * @returns {JSX.Element[]} - formatted items for the preparing column
     */
    formatItemsWithNotes(orderItems) {
        return (orderItems || []).map(item => {
            const {options, prepNotes} = item;
            let optionsConcat = "";
            if (options && options.length) {
                for (let i = 0; i < options.length; i++) {
                    optionsConcat = `${optionsConcat} +${options[i]} `;
                }

            }

            return (<Row key={item.itemId}>
                <Col xs={2}>{item.itemName}:</Col>
                <Col xs={2}>{item.count}</Col>
                <Col xs={8}>
                    <div>
                        {optionsConcat}</div>
                    {prepNotes ? (<div>Note: {prepNotes}</div>) : null}</Col>
            </Row>)
        });
    }

    render() {
        const {pending, preparing, filled, updated} = this.state;
        const formattedPending = this.formatPendingOrders(pending);
        const formatPreparing = this.formatPreparingOrders(preparing);
        const formatFilled = this.formatFilledOrders(filled);
        return (
            <div className='employee-page'>
                <Container className={'employee-container'} key={updated}>
                    <Row className={'employee-row'}>
                        <Col xs={3}>
                            <div className='employee-column-content'>
                                <h2>Pending</h2>
                                <div className='employee-column'>
                                    {formattedPending}</div>
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className='employee-column-content'>
                                <h2>Preparing</h2>
                                <div className='employee-column'>
                                    {formatPreparing}
                                </div>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div className='employee-column-content'>
                                <h2>Filled</h2>
                                <div className='employee-column'>
                                    {formatFilled}
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container></div>
        );
    }
}

export default EmployeeComponent;
