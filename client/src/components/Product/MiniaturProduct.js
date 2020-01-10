import React from "react";
import ReactDOM from "react-dom";

import { Card, Button, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown-now";

class MiniaturProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: new Date(this.props.product.initil_date).getTime() + 50000000 // Date.now() should be fix for every product date retreav from database
    };
  }
  componentDidMount() {
    console.log(new Date(this.props.product.initil_date).getTime())
  }
  render() {
    return (
      <div>
        <Card bg="light" className="mProduct">
          <Card.Img className='minImage' variant="top" src={this.props.product.image} />
          {/*dimension photo   288x176*/}
          <Card.Body>
            <Card.Title className='minTitle'>{this.props.product.name}</Card.Title>
            <Card.Text className="cardTextM">
              {this.props.product.descreption}
            </Card.Text>
            <Row>
              <Col xs={12} md={7} className="timer">
                {" "}
                <Countdown
                  date={this.state.timer}
                  onComplete={() => {
                    alert("done");
                  }}
                />
              </Col>
              {/* xs={6} */}
              <Col md={5} className="auctionPrice text-right">
                {this.props.product.last_auction_price}
              </Col>
            </Row>
            <Row>
              {/* md={{ span: 4, offset: 8 }} */}
              <Col className="price text-right" >
                {this.props.product.value}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default MiniaturProduct;

