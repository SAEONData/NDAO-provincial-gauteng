import React from 'react'
import { Col, Row, Container } from 'mdbreact';
import { DEAGreen, DEAGreenDark} from "../../config/colours.js"

//Images
import environmental_affairs_logo from '../../../images/environmental_affairs_logo.png'
import sa_flag from '../../../images/sa_flag.jpg'

class Header extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
      <>
        <Container>
          <Row className="align-items-center" style={{ marginBottom: "15px" }}>
            <Col md="3" className="d-none d-md-block">
              <img
                onClick={() => window.open("http://www.environment.gov.za/")}
                src={environmental_affairs_logo}
                style={{ width: "100%", marginTop: "2%", marginLeft: "-10px", cursor: "pointer" }}
                align="left"
              />
            </Col>
            <Col md="6">
              <h1 style={{ textAlign: "center", marginTop: "4%", letterSpacing: "2px", color: DEAGreenDark }}>
                <b>CCIS</b>
              </h1>
              <h5 style={{ textAlign: "center", letterSpacing: "2px", marginTop: "-8px", color: "dimgrey" }}>
                <b>Climate Change Information System</b>
              </h5>
            </Col>
            <Col md="3" className="d-none d-md-block">
              <img src={sa_flag} style={{ width: "40%", marginTop: "4%", marginRight: "0px" }} align="right" />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Header