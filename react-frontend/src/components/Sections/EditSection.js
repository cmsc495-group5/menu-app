import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import {Multiselect} from "multiselect-react-dropdown";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import {formatItemOptions} from "./section.util";
import SectionCardComponent from "../ReusableComponents/SectionCard/SectionCard.component";

class EditSection extends Component {

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
        axios.get('/sections/' + this.props.match.params.id)
            .then(res => {
                this.setState({...this.state, section: res.data, loaded: this.state.loaded + 1});
            });
        axios.get('/items')
            .then(res => {
                this.setState({...this.state, optionItems: res.data});
            });
    }

    onChange = (e) => {
        const state = this.state.section
        state[e.target.name] = e.target.value;
        this.setState({section: state, loaded: this.state.loaded + 1});
    }

    updateSelected = (selected) => {
        const newState = {
            ...this.state,
            section: {...this.state.section, items: selected},
            loaded: this.state.loaded + 1
        };
        this.setState(newState);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            internalDescription,
            image,
            items,
        } = this.state.section;

        axios.put('/sections/' + this.props.match.params.id, {
            title,
            description,
            internalDescription,
            image,
            items,
        })
            .then((result) => {
                this.props.history.push("/admin/showSection/" + this.props.match.params.id)
            });
    }

    render() {
        const formattedOptions = formatItemOptions(this.state.optionItems)
        const formattedSelections = formatItemOptions(this.state.section.items)
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Section
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to={`/admin/sections/${this.state.section.id}`}><span
                                    className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Section
                                    List</Link>
                                </h4>
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
                                        <label htmlFor="options">options:</label>
                                        <Multiselect
                                            options={formattedOptions}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={formattedSelections}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                            key={this.state.optionItems}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Update</button>
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
                    </div>
                </div>
            </div>
        );
    }

}

export default EditSection;