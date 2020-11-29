import React, {Component} from 'react';
import 'reactjs-popup/dist/index.css';
import './PopupTextField.css'
import {Icon, Popup} from 'semantic-ui-react'
import IconButton from "@material-ui/core/IconButton";

class PopupTextFieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            prepNotes: this.props.value,
            title: this.props.title,
        }

    }
    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleChange= (event) => {
        const newState = {...this.state, prepNotes: event.target.value}
        this.setState(newState)
        if(this.props.updateNote){
            this.props.updateNote(newState);
        } else {
            console.warn('updateNote is not defined')
        }
    }

    handleClear = () => {
        const newState = {...this.state, prepNotes: ""}
        this.setState(newState)
    }

    render() {
        const {prepNotes, title} = this.state;
        const iconColor = prepNotes ? 'orange' : 'grey';
       return (
           <Popup
               trigger={
                   <IconButton  onClick={() => this.setState({isOpen: !this.state.isOpen})} >
                       <Icon color={iconColor} name='edit' />
                   </IconButton>
               }
               on='click'
               open={this.state.isOpen}
               onOpen={this.handleOpen}
               position='bottom center'
               size='huge'
               wide='very'
           >

                   <div className='popup-container'>
                       <button className="close" onClick={this.handleClose} >
                           &times;
                       </button>
                       <div className='header'> {title}</div>
                       <div className='content'>
                           <textarea
                               className='popup-textarea'
                               name='textValue'
                               onChange={this.handleChange}
                               value={prepNotes}
                           />
                       </div>
                       <div className="actions">
                           <button className="button" onClick={this.handleClear}>Clear</button>
                           <button className="button" onClick={this.handleClose}>Close</button>
                       </div>
                   </div>

           </Popup>
       )
    };
}
export default PopupTextFieldComponent;