import React from 'react'
import { Col, Row } from 'mdbreact';

//Images
import AME1 from '../../../../images/AME1.png'

class AME_Info extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <Row>
          <Col md="12">
            <h3>
              <b>
                Climate Change Adaptation Monitoring and Evaluation
              </b>
            </h3>
            <p>
              The monitoring and evaluation (M&amp;E) of adaptation responses is composed of building blocks and key
              elements of monitoring and evaluating climate resilience. The key elements have been unpacked further
              into desired adaptation outcomes for monitoring and climate resilience to complement the building
              blocks and key elements for monitoring and evaluating climate resilience.
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12" style={{ textAlign: "center" }}>
            <img src={AME1} style={{ width: "70%" }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col md="12">
            <p>
              The desired adaptation outcomes describe, in a general sense, a desired state that will enhance
              South Africa’s transition towards climate resilience and fall into two distinct groups. Six of
              the nine desired adaptation outcomes (G1-G6) describe the ‘inputs’ (e.g. processes, resources
              and capacities) that need to be in place to enable effective climate change adaptation; and three
              desired adaptation outcomes (G7-G9) describe the key ‘impacts’ of adaptation interventions and
              associated measures (e.g. reductions in vulnerability of human- and natural-systems).
            </p>
          </Col>
        </Row>
      </>
    )
  }
}

export default AME_Info