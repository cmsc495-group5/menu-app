/**
 * file Name: ShowSection.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for viewing an section entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import SectionCardComponent from "../ReusableComponents/SectionCard/SectionCard.component";
import '../../SharedStyles/admin.css'
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import {formatPrice} from "../utils";

class ShowSectionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            section: {items: []},
            loaded: false,
        };
    }

    componentDidMount() {
        // get section to view
        axios.get(interpolateWithId(APIPaths.sections, this.props.match.params.id))
            .then(res => {
                this.setState({...this.state, section: res.data, loaded: true});
            });
    }

    /**
     * Deletes the section entity
     * @param id {string} - id of the section
     */
    delete(id) {
        axios.delete(interpolateWithId(APIPaths.sections, id))
            .then((result) => {
                this.props.history.push(Paths.showAllSections)
            });
    }

    render() {
        const {
            id,
            items,
        } = this.state.section;
        const itemsFormatted = items && items.length
            ? items.map(item => {
                return (
                    <div key={item.id}>
                        <span className={'item-details item-name'}><b> Name:</b> {item.name}</span>
                        <span className={'item-details item-price'}><b> Price:</b> {formatPrice(item.price)}</span>
                    </div>)
            })
            : 'None'

        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            SECTION DETAILS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllSections}>Section List</Link></h4>
                        <Row>
                            <Col xs={6}>

                                <dl>
                                    <dt>Title:</dt>
                                    <dd>{this.state.section.title}</dd>
                                    <dt>Description:</dt>
                                    <dd>{this.state.section.description}</dd>
                                    <dt>Internal description:</dt>
                                    <dd>{this.state.section.internalDescription}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{this.state.section.updated}</dd>
                                    <dt>Items:</dt>
                                    <dd>{itemsFormatted}</dd>
                                </dl>
                                <Link to={interpolateWithId(Paths.editSection, id)}
                                      className="btn btn-success">Edit</Link>&nbsp;
                                <button onClick={this.delete.bind(this, id)}
                                        className="btn btn-danger">Delete
                                </button>
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
                    </div>

                </div>


            </Container>
        );
    }
}

export default ShowSectionComponent;
