import React from "react";
import ReactDOM from "react-dom";

import {
  Card,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Accordion
} from "react-bootstrap";
import Countdown from "react-countdown-now";

class Auction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now() + 50000000, // Date.now() should be fix for every product date retreav from database
      history: [
        {
          price: "20 dt",
          datetime: "10/02/2020 12:50:20",
          name: "el 3idoudi ben abdallah"
        },
        {
          price: "25 dt",
          datetime: "10/02/2020 12:50:40",
          name: "el hadei  bouchoucha"
        }
      ]
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <Card bg="light" className="auction">
          <Card.Body>
            <Card.Title className="text-center">
              <Card.Text>Value 800 dt</Card.Text>
            </Card.Title>
            <Card.Header className="text-center timer">
              <Countdown
                date={this.state.timer}
                onComplete={() => {
                  alert("done");
                }}
              />
            </Card.Header>
            <br />
            <Row>
              <Col className="text-left auctionPrice">
                <Card.Text>200dt</Card.Text>
              </Col>
              <Col className="text-right">
                <Card.Text>Name.M </Card.Text>
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Card.Text>
                  {" "}
                  <small className="text-muted"> 100 dt per person </small>
                </Card.Text>
              </Col>
              <small className="text-muted"> 1/06/2020 </small>
            </Row>

            <Row>
              <Col className="text-center">
                <Card.Text>
                  <small className="text-muted text-center">
                    {" "}
                    administrative fees 10 dt
                  </small>
                </Card.Text>
              </Col>
            </Row>

            <Row>
              <Col className="text-left">
                <Card.Text>Fast auction</Card.Text>
              </Col>
            </Row>

            <Row className="item-left">
              <Col md={2}>
                <Button variant="warning">
                  <Card.Text>1dt</Card.Text>
                </Button>{" "}
              </Col>
              <Col md={2}>
                <Button variant="warning">
                  <Card.Text>10dt</Card.Text>
                </Button>
              </Col>
              <Col md={2}>
                <Button variant="warning">
                  <Card.Text>50dt</Card.Text>
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <InputGroup>
                  <Form.Control
                    type="Number"
                    placeholder="0"
                    aria-describedby="dt"
                    min={40}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text id="dt">DT</InputGroup.Text>
                  </InputGroup.Append>
                  {/* <NumericInput */}
                </InputGroup>
              </Col>
              <Col>
                {" "}
                <Button variant="success">Auctioning</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Accordion defaultActiveKey="0" className="auctionHistory">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              History of Auction
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {this.state.history.map(auction => {
                  return (
                    <Row>
                      <Col className="historyPrice">{auction.price}</Col>
                      <Col>
                        <Row>{auction.name}</Row>
                        <small>
                          <Row>{auction.datetime}</Row>
                        </small>
                        <br />
                      </Col>
                    </Row>
                  );
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}
export default Auction;
