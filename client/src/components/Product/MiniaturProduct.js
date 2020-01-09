import React from "react";
import ReactDOM from "react-dom";

import { Card, Button, Row, Col } from "react-bootstrap";
import Countdown from "react-countdown-now";

class MiniaturProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now() + 50000000 // Date.now() should be fix for every product date retreav from database
    };
  }

  render() {
    return (
      <div>
        <Card bg="light" className="mProduct">
          <Card.Img variant="top" src="1.jpg" />
          {/*dimension photo   288x176*/}
          <Card.Body>
            <Card.Title>Product Title</Card.Title>
            <Card.Text className="cardTextM">
              1 nuit 3★ pour 2 personnes avec petit déjeuner
              etlllllllhrrrrrrrrrrrrrrrr222222222222222222222222222222222222222222222
            </Card.Text>
            <Row>
              <Col xs={12} md={8} className="timer">
                {" "}
                <Countdown
                  date={this.state.timer}
                  onComplete={() => {
                    alert("done");
                  }}
                />
              </Col>
              <Col xs={6} md={4} className="auctionPrice">
                20Dt
              </Col>
            </Row>
            <Row>
              {" "}
              <Col className="price" md={{ span: 4, offset: 8 }}>
                120Dt
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default MiniaturProduct;
