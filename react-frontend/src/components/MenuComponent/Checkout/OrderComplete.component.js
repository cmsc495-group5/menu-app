/**
 * file Name: OrderComplete.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for displaying order complete message
 */

import {Component} from "react";
import './checkout.css'

class OrderCompleteComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='order-complete'>
                <h3>Thank you for your order</h3>
            </div>
        )
    }
}

export default OrderCompleteComponent;
