import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {sections:[]},
            loaded: 0
        };
    }

    componentDidMount() {
        axios.get(interpolateWithId(APIPaths.menus, this.props.match.params.id))
            .then(res => {
                this.setState({menu: res.data, loaded: this.state.loaded +1});
            });
    }

    delete(id) {
        axios.delete(interpolateWithId(APIPaths.menus, id))
            .then((result) => {
                this.props.history.push(Paths.showAllMenus)
            });
    }

    render() {
        const sections = this.state.menu.sections.map(section => {
            return (<div>
                Title: <b>{section.title}</b> <i>{section.internalDescription}</i>
            </div>)
        })
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Menu Details
                        </h3>
                    </div>
                    <div className="panel-body">
                        <Row>
                            <Col xs={6}>
                        <h4><Link to={Paths.showAllMenus}> Menu List</Link></h4>
                        <dl>
                            <dt>Title:</dt>
                            <dd>{this.state.menu.title}</dd>
                            <dt>Description:</dt>
                            <dd>{this.state.menu.description}</dd>
                            <dt>Internal description:</dt>
                            <dd>{this.state.menu.internalDescription}</dd>
                            <dt>Updated:</dt>
                            <dd>{this.state.menu.updated}</dd>
                            <dt>Sections:</dt>
                            <dd>{sections}</dd>
                            <dt>Active:</dt>
                            <dd>{this.state.menu.active ? 'true ' : 'false '}
                            {this.state.menu.active ? "(Active menu cannot be deleted)" : ""}
                            </dd>
                        </dl>
                        <Link
                            to={interpolateWithId(Paths.editMenu, this.state.menu.id)}
                            className="btn btn-success">
                            Edit
                        </Link>&nbsp;
                        <button
                            disabled={this.state.menu.active}
                            onClick={this.delete.bind(this, this.state.menu.id)}
                            className="btn btn-danger">
                            Delete
                        </button>
                    </Col>
                    <Col xs={6}>
                        <div className='preview-container-menu'>
                            <MenuComponent
                                key={this.state.loaded}
                                menuService={new MenuService({menu: this.state.menu, demo:true})}>
                            </MenuComponent>
                        </div>
                    </Col>
                </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowMenu;
