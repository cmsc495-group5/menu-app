import React from 'react'

export default function DisplayImage(props) {
  // console.log(props);
  if (props.imgSrc) {
    return (
      <div>
        <img src={props.imgSrc} alt="menu picture" style={{maxWidth: "300px"}}/>
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
