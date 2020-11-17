import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {}
        };
    }

    componentDidMount() {
        axios.get('/menus/'+this.props.match.params.id)
            .then(res => {
                this.setState({ menu: res.data });
                console.log(this.state.menu);
            });
    }

    delete(id){
        console.log(id);
        axios.delete('/menus/'+id)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Menu Details
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/admin/menus"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Menu List</Link></h4>
                        <dl>
                            <dt>Title:</dt>
                            <dd>{this.state.menu.title}</dd>
                            <dt>Description:</dt>
                            <dd>{this.state.menu.description}</dd>
                            <dt>Internal description:</dt>
                            <dd>{this.state.menu.internalDescription}</dd>
                        </dl>
                        <Link to={`/admin/editMenu/${this.state.menu.id}`} className="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.menu.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowMenu;