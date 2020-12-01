import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CreateMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            internalDescription: '',
            imageId: null,
            sections: [],
            active: '',
            updated: '',
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            title,
            description,
            internalDescription,
            imageId,
            sections,
            active,
            updated
        } = this.state;

        axios.post('/menus', {
            title,
            description,
            internalDescription,
            imageId,
            sections,
        })
            .then((result) => {
                this.props.history.push("/admin/menus")
            });
    }

    render() {
        const {
            title,
            description,
            internalDescription,
            imageId,
            sections,
            active,
            updated
        } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD MENU
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="../admin/menus">Menu List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" name="title" value={title}
                                       onChange={this.onChange} placeholder="Title"/>
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
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMenu;