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
import ImagePickerInp from '../ReusableComponents/ImagePickerInput/ImagePickerInp';
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import Dropdown from 'react-dropdown';

class CreateMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            internalDescription: '',
            sections: [],
            active: false,
            updated: '',
            images: [],
            imageListForDropdown: [],
            imgID: "0",
            img: {
                src: ""
            },
            optionSections: [],
            loaded: 0,
        };
    }

    componentDidMount() {
        let newState = {...this.state}

        axios.get(APIPaths.sections)
            .then(res => {
                newState.optionSections = res.data;
            });

        axios.get(APIPaths.images)
            .then(res => {
                newState.images = res.data;
                res.data.map(e => this.state.imageListForDropdown.push(e[0]))
                this.setState(newState)
            })
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        state.loaded = state.loaded+1;
        this.setState(state);
    }

    updateSelected = (selected) => {
        const newState = {...this.state, sections: selected, loaded: this.state.loaded + 1};
        this.setState(newState);
    }
    updateOrder = (option, change) => {
        let reordered = reorder(option, change, this.state.sections)
        this.setState({...this.state, sections: reordered, loaded: this.state.loaded +1});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            internalDescription,
            sections,
            active,
            img,
            imgID,
        } = this.state;

        axios.post(APIPaths.menus, {
            title,
            description,
            internalDescription,
            sections,
            img,
            imgID,
            active
        })
            .then((result) => {
                this.props.history.push(Paths.showAllMenus)
            });
    }

    updateImageData = (imgData, fromDropdown) => {
        let newState = this.state
        if (fromDropdown) {
            this.state.images.map(e => {
                if (e[0] === imgData.value) newState.imgID = e[1];
            })
        } else {
            newState.imgID = "1";
            if (imgData != null) newState.img = imgData;
        }
        
        console.log(newState)
        this.setState(newState);
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
                                    <Checkbox
                                        id='active'
                                        toggle
                                        name='active'
                                        onChange={(e, d) => this.onChange({ target: {...d, value:d.checked}})}
                                        checked={active}
                                        key={active}
                                    >
                                    </Checkbox>
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
                                        options={this.state.sections}
                                        swapOptions={this.updateOrder}
                                        key={this.state.loaded}>
                                    </SwapOrderComponent>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="menuImage">Menu Image:</label>
                                    <ImagePickerInp onChange={(value) => this.updateImageData(value, false)} />
                                    <br/>
                                    { 
                                        (this.state.images.length !== 0) ? 
                                            <Dropdown 
                                                options={this.state.imageListForDropdown} 
                                                onChange={(value) => this.updateImageData(value, true)} 
                                                value={null} 
                                                placeholder="Select a previously uploaded image" 
                                            />
                                            : ""
                                    }
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
                    <ReturnMenu/>
                </div>
            </Container>
        );
    }
}

export default CreateMenu;
