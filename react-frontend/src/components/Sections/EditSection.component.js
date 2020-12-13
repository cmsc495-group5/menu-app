/**
 * file Name: EditSection.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for editing an section entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import {Multiselect} from "multiselect-react-dropdown";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import SectionCardComponent from "../ReusableComponents/SectionCard/SectionCard.component";
import SwapOrderComponent from "../ReusableComponents/SwapOrder/SwapOrder.component";
import {formatItemOptions, reorder} from "../utils";
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class EditSectionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            section: {
                title: '',
                description: '',
                internalDescription: '',
                image: null,
                items: [],
                updated: '',

            },
            optionItems: [],
            loaded: 0
        };
    }

    componentDidMount() {
        // get section to edit
        axios.get(interpolateWithId(APIPaths.sections, this.props.match.params.id))
            .then(res => {
                this.setState({...this.state, section: res.data, loaded: this.state.loaded + 1});
            });
        // get item options
        axios.get(APIPaths.items)
            .then(res => {
                this.setState({...this.state, optionItems: res.data});
            });
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state.section
        state[e.target.name] = e.target.value;
        this.setState({section: state, loaded: this.state.loaded + 1});
    }

    /**
     * Updates state with selected Items
     * @param selected {Object[]} - selected items
     */
    updateSelected = (selected) => {
        const newState = {
            ...this.state,
            section: {...this.state.section, items: selected},
            loaded: this.state.loaded + 1
        };
        this.setState(newState);
    }
    /**
     * Updates state with selected Items order
     * @param option {Object} Option
     * @param change {int} index
     */
    updateOrder = (option, change) => {
        const orderedOptions = reorder(option, change, this.state.section.items);
        this.setState({
            ...this.state,
            section: {...this.state.section, items: orderedOptions},
            loaded: this.state.loaded + 1
        });
    }


    /**
     * Submits section to the API, triggers a redirect to the section list
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            internalDescription,
            image,
            items,
        } = this.state.section;

        axios.put(interpolateWithId(APIPaths.sections, this.props.match.params.id), {
            title,
            description,
            internalDescription,
            image,
            items,
        })
            .then((result) => {
                this.props.history.push(interpolateWithId(Paths.showSection, this.props.match.params.id))
            });
    }
    /**
     * Triggers a redirect to the section view
     * @param e  (Event} - triggering element change event, cancel pressed
     */
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push(interpolateWithId(Paths.showSection, this.props.match.params.id))
    }

    render() {
        const formattedOptions = formatItemOptions(this.state.optionItems)
        const formattedSelections = formatItemOptions(this.state.section.items);
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Section
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllSections}> Section List</Link></h4>
                        <Row>
                            <Col xs={6}>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" className="form-control" name="title"
                                               value={this.state.section.title} onChange={this.onChange}
                                               placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" name="description"
                                               value={this.state.section.description} onChange={this.onChange}
                                               placeholder="Description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internalDescription">Internal Description:</label>
                                        <input type="text" className="form-control" name="internalDescription"
                                               value={this.state.section.internalDescription} onChange={this.onChange}
                                               placeholder="Internal Description"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="options">Items:</label>
                                        <Multiselect
                                            options={formattedOptions}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={formattedSelections}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                            key={this.state.optionItems}
                                            showCheckbox={true}
                                            closeOnSelect={false}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="swap">Position:</label>
                                        <SwapOrderComponent
                                            options={this.state.section.items}
                                            swapOptions={this.updateOrder}
                                            key={this.state.loaded}>
                                        </SwapOrderComponent>
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Update</button>
                                    <button onClick={this.onCancel} className="btn btn-secondary">cancel</button>

                                </form>
                            </Col>
                            <Col xs={6}>
                                <Row>
                                    <div className='preview-container'>
                                        <h4 className={'section-title'}>Section Menu Item</h4>
                                        <SectionCardComponent section={this.state.section}
                                                              key={this.state.loaded}></SectionCardComponent>
                                    </div>
                                </Row>
                                <Row>
                                    <h4 className={'section-title'}>Section</h4>
                                    <div className='preview-container'>
                                        <MenuSection items={this.state.section.items}
                                                     key={this.state.loaded}></MenuSection>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                    </div>
                </div>
            </Container>
        );
    }

}

export default EditSectionComponent;
