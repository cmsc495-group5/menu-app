import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import React, {Component} from "react";

class SectionCardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            section: props.section || {},
            navigateTo: props.navigateTo || (() => {
            })
        };
    }

    render() {
        const {id, image, title, description} = this.state.section;
        const imageElement = image
            ? (<Col xs={5}><Card.Img as={Image} fluid={true} src={image?.image} className='item-image'/></Col>)
            : null;
        return (
            <Card className={'main-menu-options'} onClick={() => this.state.navigateTo(id)} key={id} id={id}>
                <Card.Title className='section-title'>{title}</Card.Title>
                <Row>
                    <Col xs={image ? 7 : 12}>
                        {description}
                    </Col>
                    {imageElement}
                </Row>
            </Card>
        );
    }
}

export default SectionCardComponent;