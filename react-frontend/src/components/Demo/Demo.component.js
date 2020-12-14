/**
 * file Name: Demo.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Demo component for displaying a menu with mock data as an example
 */

import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import "./demo.css"
import {getMockMenu} from "./MockData";
import {Container} from "react-bootstrap";
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: getMockMenu(4)
        };

    }

    render() {
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

export default DemoComponent;
