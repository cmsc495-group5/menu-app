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