/**
 * file Name: QrCode.component.js
 * date: 12/13/2020
 * author: Group 5
 * purpose: Component for generating a QR code for display on a table
 */

import React, {Component} from "react";
import axios from "axios";
import {APIPaths} from "../../paths";
import {Container} from "react-bootstrap";
import './qrcode.css'

class QrCodeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qrCode: null,
            table: 1
        }
    }

    componentDidMount() {
    }

    /**
     * Gets the QR Code to display
     * @param e
     */
    getQrCode = (e) => {
        e.preventDefault();
        axios.post(APIPaths.qrCode,
            {
                // this is in admin so should be accurate if we are using the deployed location
                baseUrl: window.location.origin.toString(),
                tableId: encodeURIComponent(this.state.table),
            })
            .then(res => {
                this.setState({...this.state, qrCode: res.data});
            });
    }

    /**
     * Updates state with form changes
     * @param e (Event} - triggering element change event
     */
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({...state});
    }

    render() {
        return (
            <Container>
                <h1> Generate Table QR Code </h1>
                <form onSubmit={this.getQrCode}>
                    <div className="form-group">
                        <label htmlFor="table">Table:</label>
                        <input type="text" className="form-control" name="table"
                               onChange={this.onChange} placeholder="1"/>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
                {this.state.qrCode
                    ? (
                        <div className={"qr-container"}>

                            <div>
                                <h1>Table: {this.state.qrCode.tableId}</h1>
                            </div>
                            <div>
                                <img src={this.state.qrCode.image} alt="qrCode"></img>
                            </div>
                            <div>
                                <a href={this.state.qrCode.url}>{this.state.qrCode.url}</a>
                            </div>
                        </div>
                    )
                    : null}
            </Container>

        );
    }
}

export default QrCodeComponent;
