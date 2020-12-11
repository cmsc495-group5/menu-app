import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DisplayImage from '../ReusableComponents/DisplayImage/DisplayImage';
import ReturnMenu from '../ReusableComponents/ReturnMenu/ReturnMenu';
import {Col, Container, Row} from "react-bootstrap";
import MenuComponent from "../MenuComponent/Menu.component";
import MenuService from "../../Services/Menu.service";
import {APIPaths, interpolateWithId, Paths} from "../../paths";
import {setImgDataToState, convertImageArrToObj} from "../utils";

class ShowMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: {},
            menu: {
                id: "",
                img: { src: null },
                sections:[]
            },
            loaded: false
        };
    }

    componentDidMount() {
        let newState = {...this.state}
        
        newState.menu.id = window.location.href.split("/")[window.location.href.split("/").length - 1];

        axios.get(APIPaths.sections)
            .then(res => {
                newState.optionSections = res.data;
            });

        axios.get(APIPaths.images)
            .then(res => {
                newState.images = convertImageArrToObj(res.data);
                setImgDataToState(newState, true);
                this.setState(newState)
            })

        axios.get(interpolateWithId(APIPaths.menus, newState.menu.id))
            .then(res => {
                newState.menu = res.data
                newState.loaded = true;
                this.setState(newState);
            })
    }

    delete(id) {
        axios.delete(interpolateWithId(APIPaths.menus, id))
            .then((result) => {
                this.props.history.push(Paths.showAllMenus)
            });
    }

    render() {
        if (!this.state.loaded) return <div/>
      
        const sections = this.state.menu.sections.map(section => {
            return (<div>
                Title: <b>{section.title}</b> <i>{section.internalDescription}</i>
            </div>)
        })    
        // console.log({ShowMenuState: this.state})
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
                                <DisplayImage imgSrc={this.state.menu.img.src || ''}/>
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
                            </Col>
                            <Col xs={6}>
                                <div className='preview-container-menu'>
                                    <MenuComponent
                                        key={this.state.loaded}
                                        menuService={new MenuService({menu: this.state.menu, demo: true})}
                                        menuImg={this.state.menu.img.src || ''}
                                        images={this.state.images}
                                        >
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
