import React, {Component} from "react";
import './LandingMenu.css'
import Card from "react-bootstrap/Card";
import {Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";

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
        const sectionsOptions = sections.length ?  sections.map(section => {
            const { id, image, title, description } = section;
            const imageElement = image
                ? (<Col xs={5}><Card.Img as={Image} fluid={true} src={image} className='item-image'/></Col>)
                : null;
            return (
                <Card className={'main-menu-options'} onClick={() => navigateTo(id)} key={id} id={id}>
                    <Card.Title className='section-title'>{title}</Card.Title>
                    <Row>
                        <Col xs={image ? 7 : 12}>
                            {description}
                        </Col>
                        { imageElement }
                    </Row>
                </Card>
            );
        }) : null;
        return(
            <div>
                <div className='menu-header-menu'> Menu </div>
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
