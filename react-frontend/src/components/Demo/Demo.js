import React, {Component} from "react";
import ItemCardComponent from "../ReusableComponents/ItemCard/ItemCard.component";
import Row from "react-bootstrap/Row";
import "./Demo.css"
import {getMockItem, getMockOption} from "./MockData";
import {Container} from "react-bootstrap";

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
        // hardcoded image will cause linting errors
        // noinspection SpellCheckingInspection


        this.items = [
            getMockItem(1),
            {
                ...getMockItem(3),
                options: [
                    getMockOption(1),
                    getMockOption(2),
                    getMockOption(3)
                ]
            },
            getMockItem(2),
            getMockItem(4),
        ]
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    // we can use a service that can keep track of this and maintain its own state between
    // sections for the demo I'm just sticking it into state to display on the dom
    itemUpdate = (itemUpdate) => {
        const state = {...this.state}
        state.items[itemUpdate.id] = {...itemUpdate};
        this.setState(state);
    }

    render() {
        // we can sort items before mapping to ensure they go on the menu in order using the ordinal
        const items = this.items
            .map((item) =>
                <ItemCardComponent data={item} itemUpdate={this.itemUpdate} key={item.id}/>
            )
        return (
            <Container>
                <Row>
                    <div className="demoHeightLimit">
                        {items}
                    </div>
                    Items from state: {JSON.stringify(this.state.items)}
                </Row>
            </Container>
        );
    }
}

export default Demo;
