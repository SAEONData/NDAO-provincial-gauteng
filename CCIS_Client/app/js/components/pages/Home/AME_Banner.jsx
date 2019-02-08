import React from 'react'
import { Col, Row } from 'mdbreact'
import { DEAGreenDark, Red, Amber, Green } from "../../../config/colours.js"

class AME_Banner extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <Row>
          <Col md="6" style={{ marginBottom: 5 }}>
            <div style={{
              color: "white",
              backgroundColor: DEAGreenDark,
              textAlign: "center",
              //margin: "-15px",
              padding: "15px",
              borderRadius: "10px"
            }}>
              <h3>
                Monitoring and Evaluation of Climate Change Adaptation
              </h3>
              <div style={{ height: 5 }} />
              <p>
                The Department of Environmental Affairs Climate Change Information System (CCIS) was designed to monitor
                and track South Africa’s progress on climate change, to that end, nine desired adaptation outcome
                goals were developed to establish progress across the country.
              <br />
                Where do you stand?
              </p>
              {/* <div style={{ height: 5 }} /> */}
              <a href="#/ame/contribute">
                <b><u>Submit your Contribution</u></b>
              </a>
            </div>
          </Col>
          <Col md="6" style={{ paddingTop: 15 }}>      
              <h3>
                <b style={{ marginRight: "15px" }}>Climate Change Adaptation Status Across South Africa</b>
              </h3>
              <p style={{ marginBottom: "0px", fontSize: 15 }}>
                A simple pragmatic approach has been developed to monitor and evaluate the progress being made
                in achieving individual desired adaptation outcomes using traffic light colours as a scoring
                system to summarise progress.
              </p>
              <div style={{ height: 10 }} />
              <p style={{ marginBottom: "0px", fontSize: 15 }}>
                <b style={{ color: Red }}>RED</b> indicates that no or only preliminary work has begun towards a goal,
                <br />
                <b style={{ color: Amber }}>AMBER</b> indicates that significant progress is being made towards a goal, and
                <br />
                <b style={{ color: Green }}>GREEN</b> indicates that work on a goal is in an ideal state.
              </p>
          </Col>
        </Row>
      </>
    )
  }
}

export default AME_Banner