/**
 * file Name: ShowMenu.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for viewing an menu entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DisplayImageComponent from '../ReusableComponents/DisplayImage/DisplayImage.component';
import {Col, Container, Row} from "react-bootstrap";
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowMenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {
                img: {src: null},
                sections: []
            },
            loaded: 0
        };
    }

    componentDidMount() {
        // get menu to view
        axios.get(interpolateWithId(APIPaths.menus, this.props.match.params.id))
            .then(res => {
                this.setState({menu: res.data, loaded: this.state.loaded + 1});
            });
    }

    /**
     * Deletes the menu entity
     * @param id {string} - id of the menu
     */
    delete(id) {
        axios.delete(interpolateWithId(APIPaths.menus, id))
            .then((result) => {
                this.props.history.push(Paths.showAllMenus)
            });
    }

    render() {
        const sections = (this.state.menu.sections || []).map(section => {
            return (<div key={section.id}>
                Title: <b>{section.title}</b> <i>{section.internalDescription}</i>
            </div>)
        })
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            MENU DETAILS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllMenus}> Menu List</Link></h4>
                        <Row>
                            <Col xs={6}>
                                <dl>
                                    <dt>Title:</dt>
                                    <dd>{this.state.menu.title}</dd>
                                    <dt>Description:</dt>
                                    <dd>{this.state.menu.description}</dd>
                                    <dt>Internal description:</dt>
                                    <dd>{this.state.menu.internalDescription}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{this.state.menu.updated}</dd>
                                    <dt>Sections:</dt>
                                    <dd>{sections}</dd>
                                    <dt>Active:</dt>
                                    <dd>{this.state.menu.active ? 'true ' : 'false '}
                                        {this.state.menu.active ? "(Active menu cannot be deleted)" : ""}
                                    </dd>
                                </dl>
                                <DisplayImageComponent
                                    imgSrc={this.state.menu.img && this.state.menu.img.src ? this.state.menu.img.src : ''}/>
                                <br/>
                                <Link
                                    to={interpolateWithId(Paths.editMenu, this.state.menu.id)}
                                    className="btn btn-success">
                                    Edit
                                </Link>&nbsp;
                                <button
                                    disabled={this.state.menu.active}
                                    onClick={this.delete.bind(this, this.state.menu.id)}
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container-menu'>
                                    <MenuComponent
                                        key={this.state.loaded}
                                        menuService={new MenuService({menu: this.state.menu, demo: true})}>
                                    </MenuComponent>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ShowMenuComponent;
