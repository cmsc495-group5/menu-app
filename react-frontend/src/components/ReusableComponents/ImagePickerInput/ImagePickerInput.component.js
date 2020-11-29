import React, { Component } from 'react'

export default class ImagePickerInput extends Component {
  constructor(props) {
      super(props);
      this.state = {}
    }
  
  handleChangeFile = f => {
    console.log("handChangeFile was ran")

    this.newState = {...this.state}

    let reader = new FileReader();
    
    reader.onloadend = this.handleFile
    reader.readAsDataURL(f)
    
    this.newState.size = f.size
    this.newState.name = f.name
    this.newState.type = f.type
    this.newState.date = f.lastModifiedDate

    this.setState(this.newState)

    console.log(this.newState)
  }

  handleFile = e => this.newState.src = e.target.result

  render() {
    return (
      <div>
        <h3>File upload</h3>
        <input 
          type="file" 
          onChange={(e) => this.handleChangeFile(e.target.files[0])}
          name="imgFileUpload"
        />
      </div>
    )
  }
}
