/**
 * file Name: CreateMenu.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for creating a new menu entity
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
import {Checkbox} from "semantic-ui-react";
import {APIPaths, Paths} from "../../paths";

class CreateMenuComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            internalDescription: '',
            imageId: null,
            sections: [],
            active: false,
            updated: '',
            optionSections: [],
            loaded: 0,
        };
    }

    componentDidMount() {
        // get section options
        axios.get(APIPaths.sections)
            .then(res => {
                this.setState({...this.state, optionSections: res.data});
            });
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        state.loaded = state.loaded + 1;
        this.setState(state);
    }
    /**
     * Updates state with selected Sections
     * @param selected {Object[]} - selected sections
     */
    updateSelected = (selected) => {
        const newState = {...this.state, sections: selected, loaded: this.state.loaded + 1};
        this.setState(newState);
    }

    /**
     * Updates state with selected Sections order
     * @param option {Object} Option
     * @param change {int} index
     */
    updateSectionOrder = (option, change) => {
        let reordered = reorder(option, change, this.state.sections)
        this.setState({...this.state, sections: reordered, loaded: this.state.loaded + 1});
    }

    /**
     * Submits menu to the API, triggers a redirect to the menu list
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            internalDescription,
            imageId,
            sections,
            active
        } = this.state;

        axios.post(APIPaths.menus, {
            title,
            description,
            internalDescription,
            imageId,
            sections,
            active
        })
            .then((result) => {
                this.props.history.push(Paths.showAllMenus)
            });
    }

    render() {
        const {
            title,
            description,
            internalDescription,
            sections,
            active,
            optionSections
        } = this.state;
        const formattedSections = formatSection(optionSections);
        const selectedSections = formatSection(sections);
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">ADD MENU</h3>
                    </div>

                    <div className="panel-body">
                        <h4><Link to={Paths.showAllMenus}>Menu List</Link></h4>
                        <Row>
                            <Col xs={6}>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" className="form-control" name="title" value={title}
                                               onChange={this.onChange} placeholder="Title"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" name="description"
                                               value={description}
                                               onChange={this.onChange} placeholder="description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internalDescription">Internal Description:</label>
                                        <input type="text" className="form-control" name="internalDescription"
                                               value={internalDescription} onChange={this.onChange}
                                               placeholder="internalDescription"/>
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="active">Active:</label>
                                        <div>
                                            <Checkbox
                                                id='active'
                                                toggle
                                                name='active'
                                                onChange={(e, d) => this.onChange({target: {...d, value: d.checked}})}
                                                checked={active}
                                                key={active}
                                            >
                                            </Checkbox>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="options">Sections:</label>
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
                                            options={this.state.sections}
                                            swapOptions={this.updateSectionOrder}
                                            key={this.state.loaded}>
                                        </SwapOrderComponent>
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Submit</button>
                                </form>
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container-menu'>
                                    <MenuComponent key={this.state.loaded} menuService={new MenuService({
                                        menu: this.state,
                                        demo: true
                                    })}></MenuComponent>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default CreateMenuComponent;
