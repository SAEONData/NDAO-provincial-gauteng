import React from 'react'
import { Col, Row } from 'mdbreact';

//Images
import AME1 from '../../../../images/Other/AME1.png'

class AME_Info extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <Row style={{ marginBottom: 10, marginTop: 10, paddingTop: 12, borderTop: "1px solid gainsboro" }}>
          <Col md="6">
            <h3 style={{ marginTop: "10px" }}>
              <b>
                Climate Change Adaptation Monitoring and Evaluation
              </b>
            </h3>
            <p style={{ marginTop: "15px" }}>
              The monitoring and evaluation (M&amp;E) of adaptation responses is composed of building 
              blocks and key elements which have been unpacked further into desired adaptation outcomes 
              to identify specific aspects of climate resilience for direct monitoring and evaluation.
            </p>
            <p style={{ marginTop: "15px" }}>
              The desired adaptation outcomes describe, in a general sense, a desired state that will enhance
              South Africa’s transition towards climate resilience and fall into two distinct groups. Six of
              the nine desired adaptation outcomes (G1-G6) describe the ‘inputs’ (e.g. processes, resources
              and capacities) that need to be in place to enable effective climate change adaptation; and three
              desired adaptation outcomes (G7-G9) describe the key ‘impacts’ of adaptation interventions and
              associated measures (e.g. reductions in vulnerability of human- and natural-systems).
            </p>
          </Col>
          <Col md="6">
            <img
              src={AME1}
              style={{
                width: "100%",
                border: "1px solid gainsboro",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor: "white"
              }}
            />
          </Col>
        </Row>
      </>
    )
  }
}

export default AME_Info