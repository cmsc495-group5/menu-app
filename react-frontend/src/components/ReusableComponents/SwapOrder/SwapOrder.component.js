import {Component} from "react";
import Row from "react-bootstrap/Row";
import {Col, Container} from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import {Icon} from "semantic-ui-react";
import './swap.css'

class SwapOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: props.options || [],
            swapOptions: props.swapOptions || ((item, positionChange) => console.log('item', item, 'change', positionChange)),
        }
    }

    render() {
        let position = 1;
        const options= this.state.options.map(option => {
            const lastRow = position === this.state.options.length;
            const firstRow = position === 1;
            const construct = (
                <Row key={option.id} className={'order-option'} >
                    <Col xs={8}><b>{option.name || option.title}</b> : <i>{option.internalDescription} </i></Col>
                    <Col xs={4} className={'order-buttons' + (lastRow ? 'swap-align-right' : '')}>
                       <IconButton
                           className={'up-swap-icon ' + (lastRow ? 'swap-hidden' :'')}
                           onClick={() =>this.state.swapOptions(option, +1)}>
                           <Icon name="angle down"></Icon>
                       </IconButton>
                       <IconButton
                           className={'down-swap-icon ' + (firstRow ? 'swap-hidden' :'')}
                           onClick={() => this.state.swapOptions(option, -1)}>
                           <Icon name="angle up"></Icon>
                       </IconButton>
                    </Col>
                </Row>
            )
            position = position +1;
            return construct;
        })

        return (<Container className={'swap-order-container'}>{options}</Container>);
    }
}

export default SwapOrderComponent;
