import React, {Component} from "react";
import {Button, Card, Col, Container} from "react-bootstrap";
import axios from "axios";
import {APIPaths, interpolateWithId} from "../../paths";
import Row from "react-bootstrap/Row";
import './employee.css';
import 'semantic-ui-css/semantic.min.css'
import {Confirm, Icon} from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";

export const STATUS = {
    Pending: 'pending',
    Preparing: 'preparing',
    Filled: 'filled',
    Complete: 'complete',
}

const pollInterval = 30 * 1000; // 30 seconds;

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
        var sleep = (time) => new Promise(resolve => setTimeout(resolve, time))
        var poll = (promiseFn, time) => promiseFn().then(
            sleep(time).then(() => poll(promiseFn, time)))

        poll(this.getUpdatedOrders, pollInterval);
    }

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

    updateOrder = (orderId, status) => {
        axios.put(interpolateWithId(APIPaths.orders, orderId), {status})
            .then(() =>
                this.getUpdatedOrders()
            );
    }

    cancelOrder = (orderId) => {
        axios.put(interpolateWithId(APIPaths.orders, orderId), {status: STATUS.Complete, canceled: true})
            .then(() =>
                this.getUpdatedOrders()
            );
    }

    openConfirmation = (orderId) => {
        const newState = {...this.state, open: {...this.state.open, [orderId]: true}}
        this.setState(newState);
    }

    handleCancel = (orderId) => {
        this.setState({...this.state, open: {...this.state.open, [orderId]: false}})
    }

    handleConfirm = (orderId) => {
        this.setState({...this.state, open: {...this.state.open, [orderId]: false}});
        this.cancelOrder(orderId)
    }


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

    formatItems(orderItems) {
        return (orderItems || []).map(item => {
            return (<Row key={item.itemId}>
                <Col xs={9}>{item.itemName}:</Col> <Col xs={3}>
                {item.count}</Col></Row>)
        });
    }

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
