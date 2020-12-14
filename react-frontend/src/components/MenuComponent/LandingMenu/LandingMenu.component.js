/**
 * file Name: LandingMenu.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for displaying menu information and sections, landing page for the menu
 */

import React, {Component} from "react";
import './LandingMenu.css'
import SectionCardComponent from "../../ReusableComponents/SectionCard/SectionCard.component";

class LandingMenu extends Component {
    constructor(props) {
        super(props);
        const {sections, navigateTo, description} = props;
        this.state = {
            sections: sections || [],
            navigateTo: navigateTo || ((id) => console.log('navigate to not implemented ', id)),
            description: description || '',
        }
    }

    render() {
        const {sections, navigateTo} = this.state;
        const sectionsOptions = sections.length ? sections.map(section => {
            return (
                <SectionCardComponent section={section} navigateTo={navigateTo} key={section.id}></SectionCardComponent>
            );
        }) : null;
        return (
            <div>

                <div className='menu-header-menu'> Menu</div>
                <div className="menu-description">{this.state.description}</div>
                <div className={'main-menu-container'}>
                    {sectionsOptions}
                </div>
            </div>

        )
    }

    componentDidMount() {

    }
}

export default LandingMenu;
