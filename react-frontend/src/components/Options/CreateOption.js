import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CreateOption extends Component {

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

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {
            name,
            description,
            internalDescription,
            image,
            price,
            updated
        } = this.state;

        axios.post('/options', {
            name,
            description,
            internalDescription,
            image,
            price,
        })
            .then((result) => {
                this.props.history.push("/admin/options")
            });
    }

    render() {
        const {
            name,
            description,
            internalDescription,
            image,
            price,
            active,
            updated
        } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ADD Option
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="../admin/options">Option List</Link></h4>
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
                                <label htmlFor="price">price:</label>
                                <input type="number" className="form-control" name="price" value={price}
                                       onChange={this.onChange} placeholder={0.00}/>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateOption;