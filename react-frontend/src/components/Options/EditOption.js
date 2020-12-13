import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import './options.css'
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class EditOption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionItem: {
                id: '',
                name: '',
                description: '',
                internalDescription: '',
                image: null,
                price: 0,
                updated: '',
                options: [],
            },
            loaded: 0
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.options , this.props.match.params.id))
            .then(res => {
                this.setState({optionItem: res.data, loaded: this.state.loaded + 1});
            });
    }

    onChange = (e) => {
        const state = this.state.optionItem;
        if (e.target.name === 'price') {
            if (!isNaN(e.target.value)) {
                state[e.target.name] = parseFloat(e.target.value);
            }
        } else {
            state[e.target.name] = e.target.value;
        }

        this.setState({optionItem: state, loaded: this.state.loaded + 1});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
            updated
        } = this.state.optionItem;

        axios.put(interpolateWithId(APIPaths.options , this.props.match.params.id), {
            name,
            description,
            internalDescription,
            image,
            price,
            options,
            updated
        })
            .then((result) => {
                this.props.history.push(interpolateWithId(Paths.showOption , this.props.match.params.id));
            });
    }

    onCancel =(e) => {
        e.preventDefault();
        this.props.history.push(interpolateWithId(Paths.showOption , this.props.match.params.id))
    }

    render() {
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Option
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllOptions}> Option List</Link></h4>
                        <Row>
                            <Col xs={6}>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" name="name"
                                               value={this.state.optionItem.name} onChange={this.onChange}
                                               placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description:</label>
                                        <input type="text" className="form-control" name="description"
                                               value={this.state.optionItem.description} onChange={this.onChange}
                                               placeholder="Description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="internalDescription">Internal Description:</label>
                                        <input type="text" className="form-control" name="internalDescription"
                                               value={this.state.optionItem.internalDescription}
                                               onChange={this.onChange} placeholder="Internal Description"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price">price:</label>
                                        <input type="number" step="0.01" className="form-control" name="price"
                                               value={this.state.optionItem.price} onChange={this.onChange}
                                               placeholder={0.00}/>
                                    </div>

                                    <button type="submit" className="btn btn-secondary">Update</button>
                                    <button onClick={this.onCancel} className="btn btn-secondary">cancel</button>
                                </form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default EditOption;
