import React from 'react'
import { Col, Row } from 'mdbreact'
import { DEAGreenDark } from "../../../Config/colours.cfg"

class AME_Banner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div style={{
        color: "white",
        backgroundColor: DEAGreenDark,
        textAlign: "center",
        margin: "-15px",
        padding: "15px",
        borderRadius: "10px"
      }}>
        <Row>
          <Col md="12">
            <h1>
              Monitoring and Evaluation of Climate Change Adaptation
            </h1>
            <p>
              The Department of Environmental Affairs Climate Change Information System (CCIS) was designed to monitor
              and track South Africa’s progress on climate change, to that end, nine desired adaptation outcome
              goals were developed to establish progress across the country.
              <br />
              Where do you stand?
            </p>
            <a href="#/ame/contribute">
              <b><u>Submit your Contribution</u></b>
            </a>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AME_Banner