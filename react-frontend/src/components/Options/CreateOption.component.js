/**
 * file Name: CreateOption.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for creating a new option entity
 */

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {APIPaths, Paths} from "../../paths";
import {Container} from "react-bootstrap";

class CreateOptionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            internalDescription: '',
            image: null,
            price: 0,
            updated: '',
        };
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    /**
     * Submits option to the API, triggers a redirect to the option list
     * @param e  (Event} - triggering element change event, summit pressed
     */
    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            internalDescription,
            image,
            price,
        } = this.state;

        axios.post(APIPaths.options, {
            name,
            description,
            internalDescription,
            image,
            price,
        })
            .then((result) => {
                this.props.history.push(Paths.showAllOptions);
            });
    }

    render() {
        const {
            name,
            description,
            internalDescription,
            price,
            updated
        } = this.state;
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD Option
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllOptions}>Option List</Link></h4>
                        <div>updated: {updated}</div>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" name="name" value={name}
                                       onChange={this.onChange} placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="form-control" name="description" value={description}
                                       onChange={this.onChange} placeholder="description"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="internalDescription">Internal Description:</label>
                                <input type="text" className="form-control" name="internalDescription"
                                       value={internalDescription} onChange={this.onChange}
                                       placeholder="internalDescription"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price:</label>
                                <input type="number" step="0.01" className="form-control" name="price" value={price}
                                       onChange={this.onChange} placeholder={0.00}/>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </Container>
        );
    }
}

export default CreateOptionComponent;
