import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Multiselect} from "multiselect-react-dropdown";
import {Col, Row} from "react-bootstrap";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import {formatItemOptions} from "./section.util";
import SectionCardComponent from "../ReusableComponents/SectionCard/SectionCard.component";
import '../../SharedStyles/admin.css'

class CreateSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            internalDescription: '',
            image: null,
            items: [],
            optionItems: [],
            updated: '',
            loaded: 0,
        };
    }

    componentDidMount() {
        axios.get('/items')
            .then(res => {
                this.setState({...this.state, optionItems: res.data});
            });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({...state, loaded: state.loaded + 1});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            internalDescription,
            image,
            items,
        } = this.state;

        axios.post('/sections', {
            title,
            description,
            internalDescription,
            image,
            items
        })
            .then((result) => {
                this.props.history.push("/admin/sections")
            });
    }
    updateSelected = (selected) => {
        const newState = {...this.state, items: selected, loaded: this.state.loaded + 1};
        this.setState(newState);
    }

    render() {
        const {
            name,
            description,
            internalDescription,
            image,
            options,
            optionItems,
        } = this.state;
        const formattedOptions = formatItemOptions(optionItems)

        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD SECTION
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                                <h4><Link to="../admin/sections">Section List</Link></h4>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" className="form-control" name="title" value={name}
                                               onChange={this.onChange} placeholder="title"/>
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
                                    <div className="form-group">
                                        <label htmlFor="options">Items:</label>
                                        <Multiselect
                                            options={formattedOptions}
                                            displayValue={'display'}
                                            emptyRecordMessage={'select options'}
                                            selectedValues={options}
                                            onSelect={this.updateSelected}
                                            onRemove={this.updateSelected}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-secondary">Submit</button>
                                </form>
                            </Col>
                            <Col xs={6}>
                                <Row>
                                    <div className='preview-container'>
                                        <h4 className={'section-title'}>Section Menu Item</h4>
                                        <SectionCardComponent section={this.state}
                                                              key={this.state.loaded}></SectionCardComponent>
                                    </div>
                                </Row>
                                <Row>
                                    <h4 className={'section-title'}>Section</h4>
                                    <div className='preview-container'>
                                        <MenuSection items={this.state.items} key={this.state.loaded}></MenuSection>
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

export default CreateSection;