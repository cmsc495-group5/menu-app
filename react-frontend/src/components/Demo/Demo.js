import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import "./Demo.css"
import {getMockMenu} from "./MockData";
import {Container} from "react-bootstrap";
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: getMockMenu(4)
        };

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
        return (
            <Container>
                <Row className="demo-row">
                    <div className="demoHeightLimit">
                        <MenuComponent
                            key={this.state.loaded}
                            menuService={new MenuService({menu: this.state.menu, demo: true})}>
                        </MenuComponent>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default Demo;
