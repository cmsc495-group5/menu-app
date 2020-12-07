import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
<<<<<<< HEAD
import DisplayImage from '../ReusableComponents/DisplayImage/DisplayImage';
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import {Col, Row} from "react-bootstrap";
=======
import {Col, Container, Row} from "react-bootstrap";
>>>>>>> 589b820bd9610ae9064f1fbf344704864c723510
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";
import {APIPaths, interpolateWithId, Paths} from "../../paths";

class ShowMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {
                img: { src: null },
                sections:[]
            },
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
            <Container className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            MENU DETAILS
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={Paths.showAllMenus}> Menu List</Link></h4>
                        <Row>
                            <Col xs={6}>
<<<<<<< HEAD
                                <h4><Link to={Paths.showAllMenus}> Menu List</Link></h4>
=======
>>>>>>> 589b820bd9610ae9064f1fbf344704864c723510
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
<<<<<<< HEAD
                                    {this.state.menu.active ? "(Active menu cannot be deleted)" : ""}
                                    </dd>
                                </dl>
                                <DisplayImage imgSrc={this.state.menu.img && this.state.menu.img.src || ''}/>
                                <br/>
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
=======
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
>>>>>>> 589b820bd9610ae9064f1fbf344704864c723510
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container-menu'>
                                    <MenuComponent
                                        key={this.state.loaded}
<<<<<<< HEAD
                                        menuService={new MenuService({menu: this.state.menu, demo:true})}>
=======
                                        menuService={new MenuService({menu: this.state.menu, demo: true})}>
>>>>>>> 589b820bd9610ae9064f1fbf344704864c723510
                                    </MenuComponent>
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

export default ShowMenu;
