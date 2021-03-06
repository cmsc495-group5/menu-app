/**
 * file Name: Menu.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for displaying the menu and managing state for the order
 */

import React, {Component} from 'react';
import './Menu.css'
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import MenuService from "../../Services/Menu.service";
import LandingMenu from "./LandingMenu/LandingMenu.component";
import CheckoutComponent from "./Checkout/Checkout.component";

class MenuComponent extends Component {
    // not programmatically generated sections
    HOME = 'home';
    CHECKOUT = 'checkout';

    constructor(props) {
        super(props);
        this.state = {
            menu: {description: ''},
            sections: [],
            loadedSections: {},
            loadedSection: this.HOME,
            currentTotal: 0
        }
        if (props.menuService) { // this is for overriding the service for demo and admin functions
            this.menuService = props.menuService;
        } else {
            this.menuService = new MenuService();
        }
    }

    componentDidMount() {
        // call the service to get the active menu
        this.menuService.getMenu().then(menu => {
            const newState = {...this.state, menu};
            newState.sections = menu.sections || [];
            this.setState(newState);
        });
    }

    /**
     * Changes loaded sections of the menu
     * @param id {string} - section id
     * @returns {Promise<void>} - allows async loading
     */
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

    /**
     * Updates the item in the menu service
     * @param item {Object} - order item to update
     */
    updateItem = (item) => {
        this.menuService.updateItem(item);
        const newState = {...this.state, total: this.menuService.getTotal()}
        this.setState(newState);
    }

    /**
     * Determines what section to load and returns the element for display
     * @param loadedSection
     * @param sortedSections
     * @returns {JSX.Element}
     */
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
    /**
     * Updates the menu title
     * @param loadedSection {string| {title: string}} - section to load
     * @returns {string} - section title
     */
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
    /**
     * generate dropdown option for hamburger menu
     * @param section {Object} - section object
     * @returns {JSX.Element} - dropdown option
     */
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
        const sortedSections = (sections || [])
            .sort((sectionA, sectionB) => sectionA.ordinal - sectionB.ordinal);
        const sectionsMenuNav = [
            (this.getSectionDropdownItem({id: this.HOME, title: 'Home'})),
            ...sortedSections.map(this.getSectionDropdownItem),
            (this.getSectionDropdownItem({id: this.CHECKOUT, title: 'Checkout'}))
        ];

        const section = this.sectionToLoad(loadedSection, sortedSections);
        return (

            <div className='menu-container'>
                <Menu attached='top' className='menu-top-navbar'>
                    <Dropdown item icon='bars' simple className='menu-nav-button'>
                        <Dropdown.Menu>
                            {sectionsMenuNav}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu id={this.HOME} className='menu-header-title' onClick={() => this.onNavClick(this.HOME)}>
                        {this.getTitleContents(loadedSection)}
                    </Menu.Menu>
                </Menu>

                <div className='menu-panel-body'>
                    {section}
                    <div className='spacer'></div>
                </div>
                {
                    loadedSection !== this.CHECKOUT
                        ? (
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

export default MenuComponent;
