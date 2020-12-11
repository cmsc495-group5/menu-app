import React, {Component} from 'react';
import axios from 'axios';
import './Menu.css'
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import MenuService from "../../Services/Menu.service";
import LandingMenu from "./LandingMenu/LandingMenu.component";
import CheckoutComponent from "./Checkout/Checkout.component";
import {APIPaths, interpolateWithId} from "../../paths";
import {setImgDataToState, convertImageArrToObj} from "../utils";

class MenuComponent extends Component {
    HOME = 'home';
    CHECKOUT = 'checkout';

    constructor(props) {
        super(props);
        this.state = {
            menu: {description: ''},
            sections: [],
            loadedSections: {},
            loadedSection: this.HOME,
            currentTotal: 0,
            images: {},
            menuImage: props.menuImg || '',
            loaded: false
        }
        if (props.menuService) {
            this.menuService = props.menuService;
        } else {
            this.menuService = new MenuService();
        }
    }

    componentDidMount() {
        let newState = {...this.state}

        if (this.props.menuImg !== null) {
            newState.menuImage = this.props.menuImg;
        }
        
        // Setting up component if you are looking at full menu (From the main menu)
        const addr = window.location.href
        if (addr.substring(addr.length - 5) === "/menu") {           
            let activeMenu = "";
            axios.get(APIPaths.activeMenu)
                .then(res => {
                    activeMenu = res.data.id
                    axios.get(interpolateWithId(APIPaths.menus, activeMenu))
                        .then(res => {
                            console.log(newState)
                            console.log(res.data)
                            newState.loaded = true;
                        })        
                })

            axios.get(APIPaths.images)
                .then(res => {
                    newState.images = convertImageArrToObj(res.data);
                    
                    if (newState.imgID) newState.menuImage = newState.images[newState.imgID]

                    this.setState(newState)
                })
        }
        
        this.menuService.getMenu().then(menu => {
            newState = menu;
            newState.sections = menu.sections || [];
            newState.loaded = true;
            this.setState(newState);
        });
    }

    onNavClick = (id) => {
        if (id === this.HOME) {
            const newState = {...this.state, loadedSection: this.HOME};
            this.setState(newState);
            window.scrollTo(0, 0);
            return;
        }
        if (id === this.CHECKOUT) {
            const newState = {...this.state, loadedSection: this.CHECKOUT};
            this.setState(newState);
            window.scrollTo(0, 0);
            return;
        }

        return this.menuService.getSection(id)
            .then(section => {
                const newState = {...this.state, loadedSection: section};
                this.setState(newState);
                window.scrollTo(0, 0);
            })
    }

    updateItem = (item) => {
        this.menuService.updateItem(item);
        const newState = {...this.state, total: this.menuService.getTotal()}
        this.setState(newState);
    }

    sectionToLoad = (loadedSection, sortedSections) => {
        switch (loadedSection) {
            case this.HOME :
                return (<LandingMenu sections={sortedSections} description={this.state.menu.description}
                                     navigateTo={this.onNavClick}
                                     key={this.state.sections}></LandingMenu>);
            case this.CHECKOUT :
                return (<CheckoutComponent {...this.props} isDemo={this.menuService.getIsDemo()}
                                           placeOrder={this.menuService.placeOrder}
                                           orderItems={this.menuService.getOrderItemsAsArray()}
                                           total={this.menuService.getTotal()}></CheckoutComponent>);
            default:
                return (<div><MenuSection
                    items={loadedSection.items}
                    key={loadedSection.id}
                    updateItem={this.updateItem}
                    orderItems={this.menuService.getOrderItems()}
                >
                </MenuSection></div>);
        }
    }
    getTitleContents = (loadedSection) => {
        switch (loadedSection) {
            case this.HOME :
                return this.state.menu.title;
            case this.CHECKOUT :
                return 'Checkout';
            default:
                return loadedSection.title;
        }
    }
    getSectionDropdownItem = (section) => {
        return (
            <Dropdown.Item
                className='nav-menu-dropdown-option'
                onClick={() => this.onNavClick(section.id)}
                key={section.id}
                id={section.id}>
                {section.title}
            </Dropdown.Item>
        )
    }

    render() {
        
        const {sections, loadedSection, total} = this.state;
        const sortedSections = sections
        .sort((sectionA, sectionB) => sectionA.ordinal - sectionB.ordinal);
        const sectionsMenuNav = [
            (this.getSectionDropdownItem({id: this.HOME, title: 'Home'})),
            ...sortedSections.map(this.getSectionDropdownItem),
            (this.getSectionDropdownItem({id: this.CHECKOUT, title: 'Checkout'}))
        ];
        
        const section = this.sectionToLoad(loadedSection, sortedSections);
        
        if (!this.state.loaded) {
            return (
                <div/>
            )
        } else {
            return (
                <div className='menu-container'>
                    <Menu attached='top' className='menu-top-navbar'>
                        <Dropdown item icon='bars' simple className='menu-nav-button'>
                            <Dropdown.Menu>
                                {sectionsMenuNav}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Menu id={this.HOME} className='menu-header-title' onClick={() => this.onNavClick(this.HOME)}>
                            {this.state.menuImage ?  <img src={this.state.menuImage} style={{"height" : "25px", "marginRight": "7px"}} alt="menu logo"></img> : ''}
                            {this.getTitleContents(loadedSection) || this.state.title}
                        </Menu.Menu>
                    </Menu>
    
                    <div className='menu-panel-body'>
                        {section}
                        <div className='spacer'></div>
                    </div>
                    {
                        loadedSection !== this.CHECKOUT ? 
                            (
                                <div className='menu-footer'>
                                    <Menu attached='bottom' className='menu-bottom-navbar'>
                                        <Menu.Menu
                                            className='menu-footer-title'
                                            position='right'
                                            onClick={() => this.onNavClick(this.CHECKOUT)}>
                                            Total ${total || 0}
                                        </Menu.Menu>
                                    </Menu>
                                </div>
                            )
                        : null
                    }
                </div>
            );
        }
    }
}

export default MenuComponent;
