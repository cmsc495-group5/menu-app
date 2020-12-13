/**
 * file Name: DisplayImage.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for displaying images
 */

import React from 'react'

export default function DisplayImageComponent(props) {

    if (props.imgSrc) {
        return (
            <div>
                <img src={props.imgSrc} alt="menu" style={{maxWidth: "300px"}}/>
            </div>
        )
    } else {
        return (
            <div>
                <em>No image provided.</em>
            </div>
        )
    }
}
