import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {
                title: '',
                description: '',
                internalDescription: '',
                imageId: null,
                sections: [],
                active: '',
                updated: ''
            }
        };
    }

    componentDidMount() {
        axios.get('/menus/'+this.props.match.params.id)
            .then(res => {
                this.setState({ menu: res.data });
                console.log(this.state.menu);
            });
    }

    onChange = (e) => {
        const state = this.state.menu
        state[e.target.name] = e.target.value;
        this.setState({menu:state});
    }

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
            updated } = this.state.menu;

        axios.put('/menus/'+this.props.match.params.id, {
            id,
            title,
            description,
            internalDescription,
            imageId,
            sections,
        })
            .then((result) => {
                this.props.history.push("/admin/showMenu/"+this.props.match.params.id)
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT Menu
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/admin/showMenu/${this.state.menu.id}`}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Menu List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" name="title" value={this.state.menu.title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input type="text" className="form-control" name="description" value={this.state.menu.description} onChange={this.onChange} placeholder="Description" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="internalDescription">Internal Description:</label>
                                <input type="text" className="form-control" name="internalDescription" value={this.state.menu.internalDescription} onChange={this.onChange} placeholder="Internal Description" />
                            </div>

                            <button type="submit" className="btn btn-secondary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditMenu;