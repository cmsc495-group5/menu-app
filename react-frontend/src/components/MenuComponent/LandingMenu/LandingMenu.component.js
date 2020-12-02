import React, {Component} from "react";
import './LandingMenu.css'
import SectionCardComponent from "../../ReusableComponents/SectionCard/SectionCard.component";

class LandingMenu extends Component {
    constructor(props) {
        super(props);
        const {sections, navigateTo} = props;
        this.state = {
            sections: sections || [],
            navigateTo: navigateTo || ((id) => console.log('navigate to not implemented ', id))
        }
    }

    render() {
        const {sections, navigateTo} = this.state;
        const sectionsOptions = sections.length ? sections.map(section => {
            return (
                <SectionCardComponent section={section} navigateTo={this.state.navigateTo}></SectionCardComponent>
            );
        }) : null;
        return (
            <div>
                <div className='menu-header-menu'> Menu</div>
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
