import React, {Component} from "react";
import axios from 'axios';
import {APIPaths} from "../../../paths";
import ItemCardComponent from "../ItemCard/ItemCard.component";
import {convertImageArrToObj} from "../../utils";

class MenuSection extends Component {
    constructor(props) {
        super(props);
        const {items, updateItem, orderItems, images} = this.props;
        if ("images" in this.props) {
            this.state = {
                images: this.props.images,
                items: items || [],
                currentValues: orderItems || {},
            };
        } else {
            this.state = {
                items: items || [],
                currentValues: orderItems || {},
            };
        } 
        this.updateItem = updateItem;
        // console.log({MenuSectionProps: this.props})
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    componentDidMount = () => {
        if (this.state.images === undefined) {
            // console.log("Axios call to get images")
            let newState = {...this.state};

            axios.get(APIPaths.images)
                .then(res => {
                    newState.images = convertImageArrToObj(res.data);
                    this.setState(newState)
                })
        }
    }

    render() {
        const {items, currentValues} = this.state;

        // sort items before mapping to ensure they go on the menu in order using the ordinal
        if ("images" in this.state) {
            // console.log("images is passed! ")
            // console.log(this.state)

            items.map(e => {
                console.log(e)
                e.img = this.state.images[e.imgID]
            })

            const itemsLoaded = items
                .sort((itemA, itemB) => itemA.ordinal - itemB.ordinal)
                .map((item) => 
                    <ItemCardComponent 
                        data={item} 
                        currentValues={currentValues[item.id]} 
                        itemUpdate={this.updateItem}
                        key={item.id}
                        images={this.state.images}
                        imageSrc={item.img}
                    />
                )

            return (
                <div>
                    {itemsLoaded}
                </div>
            );
        } else {
            // console.log("images is not passed")
            return (<div/>)
        }
    }
}

export default MenuSection;