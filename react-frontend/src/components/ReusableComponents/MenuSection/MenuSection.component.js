/**
 * file Name: MenuSection.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for displaying a menu section in the menu and admin functions
 */


import React, {Component} from "react";
import ItemCardComponent from "../ItemCard/ItemCard.component";

class MenuSection extends Component {
    constructor(props) {
        super(props);
        const {items, updateItem, orderItems} = this.props;
        this.state = {
            items: items || [],
            currentValues: orderItems || {},
        };
        this.updateItem = updateItem;
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        const {items, currentValues} = this.state;
        // sort items before mapping to ensure they go on the menu in order using the ordinal
        const itemsLoaded = (items || [])
            .sort((itemA, itemB) => itemA.ordinal - itemB.ordinal)
            .map((item) =>
                <ItemCardComponent data={item} currentValues={currentValues[item.id]} itemUpdate={this.updateItem}
                                   key={item.id}/>
            )
        return (
            <div>
                {itemsLoaded}
            </div>
        );
    }
}

export default MenuSection;
