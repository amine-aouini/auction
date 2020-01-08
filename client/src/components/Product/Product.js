import React from 'react';



import { Row, Col, Carousel, Container } from 'react-bootstrap'

import Auction from './Auction';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: Date.now() + 50000000,// Date.now() should be fix for every product date retreav from database 
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <Row className='containerProduct'>

                <Col >
                    <div className='slides'>
                        <Carousel >
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="slide1.webp"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="slide2.webp"
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
                <Auction></Auction>

            </Row>
        )
    }
}
export default Product