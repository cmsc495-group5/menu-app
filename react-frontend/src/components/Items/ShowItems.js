import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import {Container} from "react-bootstrap";

class ShowItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get(APIPaths.items)
            .then(res => {
                this.setState({items: res.data});
            });
    }

    render() {
        return (
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            ITEMS LIST
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.createItem}>Add Item</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.items.map(item =>
                                <tr key={item.id}>
                                    <td><Link
                                        to={interpolateWithId(Paths.showItem, item.id)}>
                                        {item.name || 'undefined'}
                                    </Link>
                                    </td>
                                    <td>{item.description}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ShowItems;
