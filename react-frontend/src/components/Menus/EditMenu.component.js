/**
 * file Name: EditMenu.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for editing an menu entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Multiselect} from "multiselect-react-dropdown";
import SwapOrderComponent from "../ReusableComponents/SwapOrder/SwapOrder.component";
import {formatSection, reorder} from "../utils";
import {Col, Container, Row} from "react-bootstrap";
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";
import "./menus.css"
import {Checkbox} from "semantic-ui-react";
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class EditMenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {
                title: '',
                description: '',
                internalDescription: '',
                imageId: null,
                sections: [],
                active: false,
                updated: ''
            },
            sectionOptions: [],
            initialActive: false,
            loaded: 0,
        };
    }

    componentDidMount() {
        // get menu to edit
        axios.get(interpolateWithId(APIPaths.menus, this.props.match.params.id))
            .then(res => {
                this.setState({menu: res.data, initialActive: res.data.active, loaded: this.state.loaded + 1});
            });
        // get section options
        axios.get(APIPaths.sections)
            .then(res => {
                this.setState({...this.state, sectionOptions: res.data, loaded: this.state.loaded + 1});
            });
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state.menu
        state[e.target.name] = e.target.value;
        this.setState({menu: state, loaded: this.state.loaded + 1});
    }

    /**
     * Updates state with selected Sections
     * @param selected {Object[]} - selected sections
     */
    updateSelected = (selected) => {
        const newState = {
            ...this.state,
            menu: {
                ...this.state.menu,
                sections: selected
            },
            loaded: this.state.loaded + 1
        };
        this.setState(newState);
    }

    /**
     * Updates state with selected Section order
     * @param option {Object} Option
     * @param change {int} index
     */
    updateSectionOrder = (option, change) => {
        let reordered = reorder(option, change, this.state.menu.sections)
        this.setState({
            ...this.state,
            menu: {
                ...this.state.menu,
                sections: reordered
            },
            loaded: this.state.loaded + 1
        });
    }

    /**
     * Submits menu to the API, triggers a redirect to the menu view
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            id,
            title,
            description,
            internalDescription,
            imageId,
            sections,
            active,
        } = this.state.menu;

        axios.put(interpolateWithId(APIPaths.menus, this.props.match.params.id), {
            id,
            title,
            description,
            internalDescription,
            imageId,
            sections,
            active
        })
            .then((result) => {
                this.props.history.push(interpolateWithId(Paths.showMenu, this.props.match.params.id))
            });
    }

    /**
     * Triggers a redirect to the menu view
     * @param e  (Event} - triggering element change event, cancel pressed
     */
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push(interpolateWithId(Paths.showMenu, this.props.match.params.id))
    }

    render() {
        const formattedSections = formatSection(this.state.sectionOptions);
        const selectedSections = formatSection(this.state.menu.sections);

        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Menu
                        </h3>
                    </div>

                    <div className="panel-body">
                        <h4><Link to={interpolateWithId(Paths.showAllMenus, this.props.match.params.id)}>
                            Menu List
                        </Link></h4>
                        <Row>
                            <Col xs={6}>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" className="form-control" name="title"
                                               value={this.state.menu.title}
                                               onChange={this.onChange} placeholder="Title"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" name="description"
                                               value={this.state.menu.description} onChange={this.onChange}
                                               placeholder="Description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internalDescription">Internal Description:</label>
                                        <input type="text" className="form-control" name="internalDescription"
                                               value={this.state.menu.internalDescription} onChange={this.onChange}
                                               placeholder="Internal Description"/>
                                    </div>
                                    <div className="form-group ">
                                        <label
                                            htmlFor="active">Active: {this.state.initialActive ? '(to disable this menu activate another menu)' : ''}</label>
                                        <div>
                                            <Checkbox
                                                id='active'
                                                toggle
                                                name='active'
                                                onChange={(e, d) => this.onChange({target: {...d, value: d.checked}})}
                                                checked={this.state.menu.active}
                                                disabled={this.state.initialActive}
                                                key={this.state.menu.active}
                                            >
                                            </Checkbox>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="options">options:</label>
                                        <Multiselect
                                            options={formattedSections}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={selectedSections}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                            showCheckbox={true}
                                            closeOnSelect={false}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="swap">Position:</label>
                                        <SwapOrderComponent
                                            options={this.state.menu.sections}
                                            swapOptions={this.updateSectionOrder}
                                            key={this.state.loaded}>
                                        </SwapOrderComponent>
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Update</button>
                                    <button onClick={this.onCancel} className="btn btn-secondary">cancel</button>
                                </form>
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

export default EditMenuComponent;
