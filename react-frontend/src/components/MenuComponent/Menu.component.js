import React, {Component} from 'react';
import './Menu.css'
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import MenuSection from "../ReusableComponents/MenuSection/MenuSection.component";
import MenuService from "../../Services/Menu.service";
import LandingMenu from "./LandingMenu/LandingMenu.component";

class MenuComponent extends Component {
    HOME = 'home';
    CHECKOUT = 'checkout';

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            menu: {},
            sections: [],
            loadedSections: {},
            loadedSection: null,
            currentTotal: 0
        }
        this.menuService = MenuService;
    }

    componentDidMount() {
        this.menuService.getMenu().then(menu => {
            const newState = {...this.state, menu};
            newState.sections = menu.sections || [];
            newState.loadedSection = null;
            this.setState(newState);
        });
    }

    onNavClick = (id) => {
        if (id === this.HOME) {
            const newState = {...this.state, menuOpen: false};
            newState.loadedSection = null;
            this.setState(newState);
            window.scrollTo(0, 0);
            return;
        }

        return this.menuService.getSection(id)
            .then(section => {
                const newState = {...this.state, loadedSection: section, menuOpen: false};
                this.setState(newState);
                window.scrollTo(0, 0);
            })
    }

    updateItem = (item) => {
        this.menuService.updateItem(item);
        const newState = {...this.state, total: this.menuService.getTotal()}
        this.setState(newState);
    }

    render() {
        const {menu, sections, loadedSection, total} = this.state;
        const sortedSections = sections
            .sort((sectionA, sectionB) => sectionA.ordinal - sectionB.ordinal);
        const sectionsMenuNav = sortedSections
            .map(section => (
                <Dropdown.Item
                    className='nav-menu-dropdown-option'
                    onClick={() => this.onNavClick(section.id)}
                    key={section.id}
                    id={section.id}>
                    {section.title}
                </Dropdown.Item>
            ));

        const section = loadedSection
            ? (<div><MenuSection
                items={loadedSection.items}
                key={loadedSection.id}
                updateItem={this.updateItem}
                orderItems={this.menuService.getOrderItems()}
            >
            </MenuSection></div>)
            : (<LandingMenu sections={sortedSections} navigateTo={this.onNavClick}
                            key={this.state.sections}></LandingMenu>)

        return (

            <div className='menu-container'>
                <Menu attached='top' className='menu-top-navbar'>
                    <Dropdown item icon='bars' simple className='menu-nav-button'>
                        <Dropdown.Menu>
                            {sectionsMenuNav}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu id={this.HOME} className='menu-header-title' onClick={() => this.onNavClick(this.HOME)}>
                        {loadedSection ? loadedSection.title : menu.title}
                    </Menu.Menu>
                </Menu>

                <div className='menu-panel-body'>
                    {section}
                    <div className='spacer'></div>
                </div>
                <div className='menu-footer'>
                    <Menu attached='bottom' className='menu-bottom-navbar'>
                        <Menu.Menu className='menu-footer-title' position='right'>Total ${total || 0}</Menu.Menu>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default MenuComponent;
